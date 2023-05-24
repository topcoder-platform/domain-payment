import assert from "assert";
import * as dotenv from "dotenv";

dotenv.config();

export const ENV = process.env.ENV || "local";

/** GRPC server information */
export const GRPC_SERVER_PORT = process.env.GRPC_SERVER_PORT || 9095;
export const GRPC_SERVER_HOST = process.env.GRPC_SERVER_HOST || "localhost";
export const GRPC_RDB_SERVER_HOST = <string>process.env.GRPC_RDB_SERVER_HOST;
// prettier-ignore
export const GRPC_RDB_SERVER_PORT = parseInt(process.env.GRPC_RDB_SERVER_PORT!, 10);

assert(GRPC_SERVER_PORT, "GRPC_SERVER_PORT is not defined");
assert(GRPC_SERVER_HOST, "GRPC_SERVER_HOST is not defined");

assert(GRPC_RDB_SERVER_HOST, "GRPC_RDB_SERVER_HOST is not defined");
assert(GRPC_RDB_SERVER_PORT, "GRPC_RDB_SERVER_PORT is not defined");
