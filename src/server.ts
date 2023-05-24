import "source-map-support/register";

import * as path from "path";

import { ENV, GRPC_SERVER_HOST, GRPC_SERVER_PORT } from "./config";

import { Server, ServerCredentials } from "@grpc/grpc-js";
import { addReflection } from "grpc-server-reflection";

import { PaymentServer, PaymentService } from "./service/PaymentService";

const server = new Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

if (ENV === "local") {
  addReflection(server, path.join(__dirname, "../reflections/reflection.bin"));
}

// server.addService(LegacyChallengeService, new LegacyChallengeServer());

server.addService(PaymentService, new PaymentServer());

server.bindAsync(
  `${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}`,
  ServerCredentials.createInsecure(),
  (err: Error | null, bindPort: number) => {
    if (err) {
      throw err;
    }

    console.info(`gRPC:Server running at: ${GRPC_SERVER_HOST}:${bindPort}`, new Date().toLocaleString());
    server.start();
  }
);
