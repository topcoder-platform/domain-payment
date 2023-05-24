/* eslint-disable */
import { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { LookupCriteria, ScanRequest, ScanResult } from "@topcoder-framework/lib-common";
import { CreatePaymentInput, Payment, UpdatePaymentInput } from "../payment";

export type PaymentService = typeof PaymentService;
export const PaymentService = {
  scan: {
    path: "/topcoder.domain.service.payment.Payment/Scan",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ScanRequest) => Buffer.from(ScanRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ScanRequest.decode(value),
    responseSerialize: (value: ScanResult) => Buffer.from(ScanResult.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ScanResult.decode(value),
  },
  lookup: {
    path: "/topcoder.domain.service.payment.Payment/Lookup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: Payment) => Buffer.from(Payment.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Payment.decode(value),
  },
  create: {
    path: "/topcoder.domain.service.payment.Payment/Create",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreatePaymentInput) => Buffer.from(CreatePaymentInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreatePaymentInput.decode(value),
    responseSerialize: (value: Payment) => Buffer.from(Payment.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Payment.decode(value),
  },
  update: {
    path: "/topcoder.domain.service.payment.Payment/Update",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdatePaymentInput) => Buffer.from(UpdatePaymentInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdatePaymentInput.decode(value),
    responseSerialize: (value: Payment) => Buffer.from(Payment.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Payment.decode(value),
  },
  delete: {
    path: "/topcoder.domain.service.payment.Payment/Delete",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LookupCriteria) => Buffer.from(LookupCriteria.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LookupCriteria.decode(value),
    responseSerialize: (value: Payment) => Buffer.from(Payment.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Payment.decode(value),
  },
} as const;

export interface PaymentServer extends UntypedServiceImplementation {
  scan: handleUnaryCall<ScanRequest, ScanResult>;
  lookup: handleUnaryCall<LookupCriteria, Payment>;
  create: handleUnaryCall<CreatePaymentInput, Payment>;
  update: handleUnaryCall<UpdatePaymentInput, Payment>;
  delete: handleUnaryCall<LookupCriteria, Payment>;
}
