import { handleUnaryCall, sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

import {
  ScanRequest,
  ScanResult,
  LookupCriteria,
} from "../models/common/common";

import {
  CreatePaymentInput,
  Payment,
  UpdatePaymentInput,
} from "../models/domain-layer/payment/payment";

import PaymentDomain from "../domain/PaymentDomain";
import {
  PaymentServer,
  PaymentService,
} from "../models/domain-layer/payment/services/payment";

class PaymentServerImpl implements PaymentServer {
  [name: string]: import("@grpc/grpc-js").UntypedHandleCall;

  scan: handleUnaryCall<ScanRequest, ScanResult> = async (
    call: ServerUnaryCall<ScanRequest, ScanResult>,
    callback: sendUnaryData<ScanResult>
  ): Promise<void> => {
    const {
      request: { scanCriteria, nextToken: inputNextToken },
    } = call;
    // TODO
  };

  lookup: handleUnaryCall<LookupCriteria, Payment> = async (
    call: ServerUnaryCall<LookupCriteria, Payment>,
    callback: sendUnaryData<Payment>
  ): Promise<void> => {
    const { request: lookupCriteria } = call;
    PaymentDomain.lookup(lookupCriteria)
      .then((payment) => callback(null, payment))
      .catch((err) => callback(err, null));
  };

  create: handleUnaryCall<CreatePaymentInput, Payment> = async (
    call: ServerUnaryCall<CreatePaymentInput, Payment>,
    callback: sendUnaryData<Payment>
  ): Promise<void> => {
    const { request: createRequestInput } = call;
    PaymentDomain.create(createRequestInput)
      .then((payment) => callback(null, payment))
      .catch((err) => callback(err, null));
  };

  update: handleUnaryCall<UpdatePaymentInput, Payment> = async (
    call: ServerUnaryCall<UpdatePaymentInput, Payment>,
    callback: sendUnaryData<Payment>
  ): Promise<void> => {
    const {
      request: { updateInput, lookupCriteria },
    } = call;
  };

  delete: handleUnaryCall<LookupCriteria, Payment> = async (
    call: ServerUnaryCall<LookupCriteria, Payment>,
    callback: sendUnaryData<Payment>
  ): Promise<void> => {
    const { request: lookupCriteria } = call;
  };
}

export { PaymentServerImpl as PaymentServer, PaymentService };
