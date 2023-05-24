import { GRPC_RDB_SERVER_HOST, GRPC_RDB_SERVER_PORT } from "../config";

import { QueryRunner } from "@topcoder-framework/client-relational";

export const queryRunner = new QueryRunner(
  GRPC_RDB_SERVER_HOST!,
  GRPC_RDB_SERVER_PORT!
);
