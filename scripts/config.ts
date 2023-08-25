import dotenv from "dotenv";
dotenv.config();

export const rpcUrl = process.env.ALTO_RPC_URL || "";
export const entryPoint = process.env.ALTO_ENTRY_POINT || "";
export const sender = "0x4EbAD030B02fbb255c293275e9095a07f34B9e3D";
export const nonce = "0x0";
export const signature = process.env.ALTO_SIGNATURE || "";
