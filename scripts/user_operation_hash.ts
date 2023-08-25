import fs from "fs";
import path from "path";
import { sender, entryPoint, rpcUrl, nonce } from "./config";

import {
  Client,
  UserOperationBuilder,
  UserOperationMiddlewareCtx,
} from "userop";

async function main() {
  try {
    console.log("starting to get userOps hash...");
    const client = await Client.init(rpcUrl, { entryPoint });

    const builder = new UserOperationBuilder().useDefaults({
      sender,
      nonce,
    });
    // let userOp = await builder.buildOp(entryPoint, Number(client.chainId));
    const userOp = await client.buildUserOperation(builder);

    const middleware = new UserOperationMiddlewareCtx(
      userOp,
      entryPoint,
      client.chainId
    );
    const userOpHash = middleware.getUserOpHash();
    console.log({ userOpHash });

    // write the userOpHash into a json file
    const pathToFile = path.join(__dirname, "userOpHash.json");
    fs.writeFileSync(pathToFile, JSON.stringify({ userOpHash }));
  } catch (err) {
    console.log(err);
  } finally {
    console.log("finished...");
  }
}

main();
