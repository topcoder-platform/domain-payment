# Domain Payment

## Description

This is a gRPC service used to create and manage user payment records and transactions.

## Prerequisites

This gRPC service requires the following software:

- NodeJS version 18 or higher.
- Informix database.
- Yarn for package management.

We highly recommend installing [volta.sh](https://volta.sh/) to automatically manage NodeJS and Yarn versions. If you need to run Informix locally, Docker is a suitable option.

## Setup Steps

### 1. Installing Dependencies

Install NodeJS and Yarn via [volta.sh](https://volta.sh/).

### 2. Protoc Compiler

A protoc compiler is required to generate stubs from protobuf definitions. You can follow instructions from the [protobuf GitHub repo](https://github.com/protocolbuffers/protobuf) to install it on your machine.

### 3. Protobuf Definitions

The protobuf definitions for this project are located on the 'payment-api' branch of the repository [https://github.com/topcoder-platform/plat-interface-definition](https://github.com/topcoder-platform/plat-interface-definition). Clone the repository and switch to the 'payment-api' branch to access these definitions.

### 4. Informix Setup

To run a local copy of Informix with the relevant tables, execute the following command in Docker:

```bash
docker run -p 2021:2021 -it appiriodevops/informix:1b3d4ef
```

If you are running this on an Apple Silicon Mac, you need to include the `--platform linux/amd64` flag:

```bash
docker run --platform linux/amd64 -p 2021:2021 -it appiriodevops/informix:1b3d4ef
```

### 5. Private NPM Repository Access

This project uses a private NPM repository. You will need a connection key to download the `@topcoder-framework/` scoped library. Reach out to a member of the platform team to get this key.

### 6. Informix Access Layer

To run the service with the Informix access layer locally, you need to have the 'feat/sql-expressions' branch of the repo [https://github.com/topcoder-platform/informix-access-layer](https://github.com/topcoder-platform/informix-access-layer) running locally.

### 7. Setting Up Your Local Environment

After installing the dependencies, create a `.env` file using the `sample.env` as an example.

Then, you can install the project dependencies, build the protobuf files, and start the development server with these commands:

```bash
yarn install
yarn build:proto
yarn dev
```

### 8. gRPC Client

For testing the method calls, you will need a gRPC client. We recommend using [Postman](https://www.postman.com/). Please refer to the [Postman documentation](https://learning.postman.com/docs/sending-requests/grpc/grpc-client-overview/) on how to setup and use it for gRPC requests.

## Conclusion

If you follow these instructions, you should be able to get the gRPC service running locally on your machine. For any issues or additional information, please contact the platform team.
