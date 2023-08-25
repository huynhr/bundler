import dotenv from "dotenv";
dotenv.config();
import { Client, UserOperationBuilder } from "userop";
import { rpcUrl, entryPoint, sender, nonce } from "./config";

const signature =
  "0xc895ff014f1f5267af47fcc2833cc3f331ecaac1a988214d045b3176ec339f8077438e45b83e54ace29459ca3b5b44ed9aca0f8f56b35e43baa47c07ec7f735a1b";

async function main() {
  try {
    const client = await Client.init(rpcUrl, { entryPoint });

    const builder = new UserOperationBuilder().useDefaults({
      sender,
      nonce: "0x0",
      signature,
    });
    const userOp = await client.buildUserOperation(builder);

    const output = {
      jsonrpc: "2.0",
      id: 5,
      method: "eth_sendUserOperation",
      params: [userOp, "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"],
    };

    console.log({ output: JSON.stringify(output) });
  } catch (err) {
    console.log(err);
  }
}

main();
