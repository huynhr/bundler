import { IRpcEndpoint } from "./rpcHandler"
import { IBundlerArgs } from "@alto/config"
import { JSONRPCResponse, bundlerRequestSchema, jsonRpcSchema } from "@alto/types"
import { RpcError, ValidationErrors } from "@alto/types"
import { Logger, Metrics } from "@alto/utils"
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { toHex } from "viem"
import { fromZodError } from "zod-validation-error"
import { Registry } from "prom-client"

// jsonBigIntOverride.ts
const originalJsonStringify = JSON.stringify

JSON.stringify = function (
    value: any,
    replacer?: ((this: any, key: string, value: any) => any) | (string | number)[] | null,
    space?: string | number
): string {
    const bigintReplacer = (_key: string, value: any): any => {
        if (typeof value === "bigint") {
            return toHex(value)
        }
        return value
    }

    const wrapperReplacer = (key: string, value: any): any => {
        if (typeof replacer === "function") {
            // rome-ignore lint: no other way to do this
            value = replacer(key, value)
        } else if (Array.isArray(replacer)) {
            if (!replacer.includes(key)) {
                return
            }
        }
        return bigintReplacer(key, value)
    }

    return originalJsonStringify(value, wrapperReplacer, space)
}

export class Server {
    private fastify: FastifyInstance
    private rpcEndpoint: IRpcEndpoint
    private bundlerArgs: IBundlerArgs
    private registry: Registry
    private metrics: Metrics

    constructor(
        rpcEndpoint: IRpcEndpoint,
        bundlerArgs: IBundlerArgs,
        logger: Logger,
        registry: Registry,
        metrics: Metrics
    ) {
        this.fastify = Fastify({
            logger,
            requestTimeout: bundlerArgs.requestTimeout
        })

        this.fastify.register(require("fastify-cors"), {
            origin: "*",
            methods: ["POST", "GET", "OPTIONS"]
        })

        this.fastify.post("/rpc", this.rpc.bind(this))
        this.fastify.post("/", this.rpc.bind(this))
        this.fastify.get("/health", this.healthCheck.bind(this))
        this.fastify.get("/metrics", this.serveMetrics.bind(this))

        this.rpcEndpoint = rpcEndpoint
        this.bundlerArgs = bundlerArgs
        this.registry = registry
        this.metrics = metrics
    }

    public async start(): Promise<void> {
        this.fastify.listen({ port: this.bundlerArgs.port, host: "0.0.0.0" })
    }

    public async stop(): Promise<void> {
        await this.fastify.close()
    }

    public async healthCheck(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
        await reply.status(200).send("OK")
    }

    public async rpc(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const requestInfo: {
            receivedAt: number
            method: string | null
            statusCode: number | null
        } = {
            receivedAt: Date.now(),
            method: null,
            statusCode: null
        }

        try {
            const contentTypeHeader = request.headers["content-type"]
            if (contentTypeHeader !== "application/json") {
                throw new RpcError(
                    "invalid content-type, content-type must be application/json",
                    ValidationErrors.InvalidFields
                )
            }
            this.fastify.log.debug(request.body, "received request")
            //const jsonRpcResponse = await this.innerRpc(request.body)

            const jsonRpcParsing = jsonRpcSchema.safeParse(request.body)
            if (!jsonRpcParsing.success) {
                const validationError = fromZodError(jsonRpcParsing.error)
                throw new RpcError(
                    `invalid JSON-RPC request ${validationError.message}`,
                    ValidationErrors.InvalidFields
                )
            }

            const jsonRpcRequest = jsonRpcParsing.data

            const bundlerRequestParsing = bundlerRequestSchema.safeParse(jsonRpcRequest)
            if (!bundlerRequestParsing.success) {
                const validationError = fromZodError(bundlerRequestParsing.error)
                throw new RpcError(validationError.message, ValidationErrors.InvalidFields)
            }

            const bundlerRequest = bundlerRequestParsing.data
            this.fastify.log.info(
                { data: JSON.stringify(bundlerRequest, null) },
                `received request ${bundlerRequest.method}`
            )
            try {
                const result = await this.rpcEndpoint.handleMethod(bundlerRequest)
                const jsonRpcResponse: JSONRPCResponse = {
                    jsonrpc: "2.0",
                    id: jsonRpcRequest.id,
                    result: result.result
                }

                await reply.status(200).send(jsonRpcResponse)
                requestInfo.statusCode = 200
                requestInfo.method = bundlerRequest.method
                this.fastify.log.info(jsonRpcResponse, "sent reply")
            } catch (e: unknown) {
                requestInfo.method = bundlerRequest.method
                throw e
            }
        } catch (err) {
            if (err instanceof RpcError) {
                const rpcError = {
                    message: err.message,
                    data: err.data,
                    code: err.code
                }
                await reply.status(400).send(rpcError)
                requestInfo.statusCode = 400
                this.fastify.log.info(rpcError, "error reply")
            } else {
                if (err instanceof Error) {
                    await reply.status(500).send(err.message)
                    requestInfo.statusCode = 500
                    this.fastify.log.error(err, "error reply (non-rpc)")
                } else {
                    await reply.status(500).send("Unknown error")
                    requestInfo.statusCode = 500
                    this.fastify.log.info(reply.raw, "error reply (non-rpc)")
                }
            }
        }

        this.metrics.httpRequestDuration.metric
            .labels({
                chainId: this.metrics.httpRequestDuration.chainId,
                network: this.metrics.httpRequestDuration.network,
                status_code: requestInfo.statusCode.toString(),
                method: requestInfo.method ?? "unknown"
            })
            .observe((Date.now() - requestInfo.receivedAt) / 1000)
    }

    public async serveMetrics(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        reply.headers({ "Content-Type": this.registry.contentType })
        const metrics = await this.registry.metrics()
        await reply.send(metrics)
    }
}
