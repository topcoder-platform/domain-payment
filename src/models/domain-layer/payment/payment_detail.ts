/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface PaymentDetail {
  paymentDetailId: number;
  netAmount: number;
  grossAmount: number;
  totalAmount: number;
  datePaid?: string | undefined;
  paymentStatusId: number;
  paymentAddressId?: number | undefined;
  modificationRationaleId: number;
  paymentDesc: string;
  paymentTypeId: number;
  dateModified: string;
  dateDue: string;
  paymentMethodId: number;
  client?: string | undefined;
  algorithmRoundId?: number | undefined;
  algorithmProblemId?: number | undefined;
  componentContestId?: number | undefined;
  componentProjectId?: number | undefined;
  cockpitProjectId?: number | undefined;
  studioContestId?: number | undefined;
  digitalRunStageId?: number | undefined;
  digitalRunSeasonId?: number | undefined;
  parentPaymentId?: number | undefined;
  createDate: string;
  charityInd: number;
  installmentNumber: number;
  digitalRunTrackId: number;
  jiraIssueId?: string | undefined;
  userId: number;
}

export interface PaymentDetailList {
  items: PaymentDetail[];
}

function createBasePaymentDetail(): PaymentDetail {
  return {
    paymentDetailId: 0,
    netAmount: 0,
    grossAmount: 0,
    totalAmount: 0,
    datePaid: undefined,
    paymentStatusId: 0,
    paymentAddressId: undefined,
    modificationRationaleId: 0,
    paymentDesc: "",
    paymentTypeId: 0,
    dateModified: "",
    dateDue: "",
    paymentMethodId: 0,
    client: undefined,
    algorithmRoundId: undefined,
    algorithmProblemId: undefined,
    componentContestId: undefined,
    componentProjectId: undefined,
    cockpitProjectId: undefined,
    studioContestId: undefined,
    digitalRunStageId: undefined,
    digitalRunSeasonId: undefined,
    parentPaymentId: undefined,
    createDate: "",
    charityInd: 0,
    installmentNumber: 0,
    digitalRunTrackId: 0,
    jiraIssueId: undefined,
    userId: 0,
  };
}

export const PaymentDetail = {
  encode(message: PaymentDetail, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paymentDetailId !== 0) {
      writer.uint32(8).int64(message.paymentDetailId);
    }
    if (message.netAmount !== 0) {
      writer.uint32(21).float(message.netAmount);
    }
    if (message.grossAmount !== 0) {
      writer.uint32(29).float(message.grossAmount);
    }
    if (message.totalAmount !== 0) {
      writer.uint32(37).float(message.totalAmount);
    }
    if (message.datePaid !== undefined) {
      writer.uint32(42).string(message.datePaid);
    }
    if (message.paymentStatusId !== 0) {
      writer.uint32(48).int32(message.paymentStatusId);
    }
    if (message.paymentAddressId !== undefined) {
      writer.uint32(56).int32(message.paymentAddressId);
    }
    if (message.modificationRationaleId !== 0) {
      writer.uint32(64).int32(message.modificationRationaleId);
    }
    if (message.paymentDesc !== "") {
      writer.uint32(74).string(message.paymentDesc);
    }
    if (message.paymentTypeId !== 0) {
      writer.uint32(80).int32(message.paymentTypeId);
    }
    if (message.dateModified !== "") {
      writer.uint32(90).string(message.dateModified);
    }
    if (message.dateDue !== "") {
      writer.uint32(98).string(message.dateDue);
    }
    if (message.paymentMethodId !== 0) {
      writer.uint32(104).int32(message.paymentMethodId);
    }
    if (message.client !== undefined) {
      writer.uint32(114).string(message.client);
    }
    if (message.algorithmRoundId !== undefined) {
      writer.uint32(120).int32(message.algorithmRoundId);
    }
    if (message.algorithmProblemId !== undefined) {
      writer.uint32(128).int32(message.algorithmProblemId);
    }
    if (message.componentContestId !== undefined) {
      writer.uint32(136).int32(message.componentContestId);
    }
    if (message.componentProjectId !== undefined) {
      writer.uint32(144).int32(message.componentProjectId);
    }
    if (message.cockpitProjectId !== undefined) {
      writer.uint32(152).int32(message.cockpitProjectId);
    }
    if (message.studioContestId !== undefined) {
      writer.uint32(160).int32(message.studioContestId);
    }
    if (message.digitalRunStageId !== undefined) {
      writer.uint32(168).int32(message.digitalRunStageId);
    }
    if (message.digitalRunSeasonId !== undefined) {
      writer.uint32(176).int32(message.digitalRunSeasonId);
    }
    if (message.parentPaymentId !== undefined) {
      writer.uint32(184).int32(message.parentPaymentId);
    }
    if (message.createDate !== "") {
      writer.uint32(194).string(message.createDate);
    }
    if (message.charityInd !== 0) {
      writer.uint32(200).int32(message.charityInd);
    }
    if (message.installmentNumber !== 0) {
      writer.uint32(208).int32(message.installmentNumber);
    }
    if (message.digitalRunTrackId !== 0) {
      writer.uint32(216).int32(message.digitalRunTrackId);
    }
    if (message.jiraIssueId !== undefined) {
      writer.uint32(226).string(message.jiraIssueId);
    }
    if (message.userId !== 0) {
      writer.uint32(232).int32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentDetail {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentDetail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentDetailId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.netAmount = reader.float();
          break;
        case 3:
          message.grossAmount = reader.float();
          break;
        case 4:
          message.totalAmount = reader.float();
          break;
        case 5:
          message.datePaid = reader.string();
          break;
        case 6:
          message.paymentStatusId = reader.int32();
          break;
        case 7:
          message.paymentAddressId = reader.int32();
          break;
        case 8:
          message.modificationRationaleId = reader.int32();
          break;
        case 9:
          message.paymentDesc = reader.string();
          break;
        case 10:
          message.paymentTypeId = reader.int32();
          break;
        case 11:
          message.dateModified = reader.string();
          break;
        case 12:
          message.dateDue = reader.string();
          break;
        case 13:
          message.paymentMethodId = reader.int32();
          break;
        case 14:
          message.client = reader.string();
          break;
        case 15:
          message.algorithmRoundId = reader.int32();
          break;
        case 16:
          message.algorithmProblemId = reader.int32();
          break;
        case 17:
          message.componentContestId = reader.int32();
          break;
        case 18:
          message.componentProjectId = reader.int32();
          break;
        case 19:
          message.cockpitProjectId = reader.int32();
          break;
        case 20:
          message.studioContestId = reader.int32();
          break;
        case 21:
          message.digitalRunStageId = reader.int32();
          break;
        case 22:
          message.digitalRunSeasonId = reader.int32();
          break;
        case 23:
          message.parentPaymentId = reader.int32();
          break;
        case 24:
          message.createDate = reader.string();
          break;
        case 25:
          message.charityInd = reader.int32();
          break;
        case 26:
          message.installmentNumber = reader.int32();
          break;
        case 27:
          message.digitalRunTrackId = reader.int32();
          break;
        case 28:
          message.jiraIssueId = reader.string();
          break;
        case 29:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentDetail {
    return {
      paymentDetailId: isSet(object.paymentDetailId) ? Number(object.paymentDetailId) : 0,
      netAmount: isSet(object.netAmount) ? Number(object.netAmount) : 0,
      grossAmount: isSet(object.grossAmount) ? Number(object.grossAmount) : 0,
      totalAmount: isSet(object.totalAmount) ? Number(object.totalAmount) : 0,
      datePaid: isSet(object.datePaid) ? String(object.datePaid) : undefined,
      paymentStatusId: isSet(object.paymentStatusId) ? Number(object.paymentStatusId) : 0,
      paymentAddressId: isSet(object.paymentAddressId) ? Number(object.paymentAddressId) : undefined,
      modificationRationaleId: isSet(object.modificationRationaleId) ? Number(object.modificationRationaleId) : 0,
      paymentDesc: isSet(object.paymentDesc) ? String(object.paymentDesc) : "",
      paymentTypeId: isSet(object.paymentTypeId) ? Number(object.paymentTypeId) : 0,
      dateModified: isSet(object.dateModified) ? String(object.dateModified) : "",
      dateDue: isSet(object.dateDue) ? String(object.dateDue) : "",
      paymentMethodId: isSet(object.paymentMethodId) ? Number(object.paymentMethodId) : 0,
      client: isSet(object.client) ? String(object.client) : undefined,
      algorithmRoundId: isSet(object.algorithmRoundId) ? Number(object.algorithmRoundId) : undefined,
      algorithmProblemId: isSet(object.algorithmProblemId) ? Number(object.algorithmProblemId) : undefined,
      componentContestId: isSet(object.componentContestId) ? Number(object.componentContestId) : undefined,
      componentProjectId: isSet(object.componentProjectId) ? Number(object.componentProjectId) : undefined,
      cockpitProjectId: isSet(object.cockpitProjectId) ? Number(object.cockpitProjectId) : undefined,
      studioContestId: isSet(object.studioContestId) ? Number(object.studioContestId) : undefined,
      digitalRunStageId: isSet(object.digitalRunStageId) ? Number(object.digitalRunStageId) : undefined,
      digitalRunSeasonId: isSet(object.digitalRunSeasonId) ? Number(object.digitalRunSeasonId) : undefined,
      parentPaymentId: isSet(object.parentPaymentId) ? Number(object.parentPaymentId) : undefined,
      createDate: isSet(object.createDate) ? String(object.createDate) : "",
      charityInd: isSet(object.charityInd) ? Number(object.charityInd) : 0,
      installmentNumber: isSet(object.installmentNumber) ? Number(object.installmentNumber) : 0,
      digitalRunTrackId: isSet(object.digitalRunTrackId) ? Number(object.digitalRunTrackId) : 0,
      jiraIssueId: isSet(object.jiraIssueId) ? String(object.jiraIssueId) : undefined,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: PaymentDetail): unknown {
    const obj: any = {};
    message.paymentDetailId !== undefined && (obj.paymentDetailId = Math.round(message.paymentDetailId));
    message.netAmount !== undefined && (obj.netAmount = message.netAmount);
    message.grossAmount !== undefined && (obj.grossAmount = message.grossAmount);
    message.totalAmount !== undefined && (obj.totalAmount = message.totalAmount);
    message.datePaid !== undefined && (obj.datePaid = message.datePaid);
    message.paymentStatusId !== undefined && (obj.paymentStatusId = Math.round(message.paymentStatusId));
    message.paymentAddressId !== undefined && (obj.paymentAddressId = Math.round(message.paymentAddressId));
    message.modificationRationaleId !== undefined &&
      (obj.modificationRationaleId = Math.round(message.modificationRationaleId));
    message.paymentDesc !== undefined && (obj.paymentDesc = message.paymentDesc);
    message.paymentTypeId !== undefined && (obj.paymentTypeId = Math.round(message.paymentTypeId));
    message.dateModified !== undefined && (obj.dateModified = message.dateModified);
    message.dateDue !== undefined && (obj.dateDue = message.dateDue);
    message.paymentMethodId !== undefined && (obj.paymentMethodId = Math.round(message.paymentMethodId));
    message.client !== undefined && (obj.client = message.client);
    message.algorithmRoundId !== undefined && (obj.algorithmRoundId = Math.round(message.algorithmRoundId));
    message.algorithmProblemId !== undefined && (obj.algorithmProblemId = Math.round(message.algorithmProblemId));
    message.componentContestId !== undefined && (obj.componentContestId = Math.round(message.componentContestId));
    message.componentProjectId !== undefined && (obj.componentProjectId = Math.round(message.componentProjectId));
    message.cockpitProjectId !== undefined && (obj.cockpitProjectId = Math.round(message.cockpitProjectId));
    message.studioContestId !== undefined && (obj.studioContestId = Math.round(message.studioContestId));
    message.digitalRunStageId !== undefined && (obj.digitalRunStageId = Math.round(message.digitalRunStageId));
    message.digitalRunSeasonId !== undefined && (obj.digitalRunSeasonId = Math.round(message.digitalRunSeasonId));
    message.parentPaymentId !== undefined && (obj.parentPaymentId = Math.round(message.parentPaymentId));
    message.createDate !== undefined && (obj.createDate = message.createDate);
    message.charityInd !== undefined && (obj.charityInd = Math.round(message.charityInd));
    message.installmentNumber !== undefined && (obj.installmentNumber = Math.round(message.installmentNumber));
    message.digitalRunTrackId !== undefined && (obj.digitalRunTrackId = Math.round(message.digitalRunTrackId));
    message.jiraIssueId !== undefined && (obj.jiraIssueId = message.jiraIssueId);
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentDetail>, I>>(object: I): PaymentDetail {
    const message = createBasePaymentDetail();
    message.paymentDetailId = object.paymentDetailId ?? 0;
    message.netAmount = object.netAmount ?? 0;
    message.grossAmount = object.grossAmount ?? 0;
    message.totalAmount = object.totalAmount ?? 0;
    message.datePaid = object.datePaid ?? undefined;
    message.paymentStatusId = object.paymentStatusId ?? 0;
    message.paymentAddressId = object.paymentAddressId ?? undefined;
    message.modificationRationaleId = object.modificationRationaleId ?? 0;
    message.paymentDesc = object.paymentDesc ?? "";
    message.paymentTypeId = object.paymentTypeId ?? 0;
    message.dateModified = object.dateModified ?? "";
    message.dateDue = object.dateDue ?? "";
    message.paymentMethodId = object.paymentMethodId ?? 0;
    message.client = object.client ?? undefined;
    message.algorithmRoundId = object.algorithmRoundId ?? undefined;
    message.algorithmProblemId = object.algorithmProblemId ?? undefined;
    message.componentContestId = object.componentContestId ?? undefined;
    message.componentProjectId = object.componentProjectId ?? undefined;
    message.cockpitProjectId = object.cockpitProjectId ?? undefined;
    message.studioContestId = object.studioContestId ?? undefined;
    message.digitalRunStageId = object.digitalRunStageId ?? undefined;
    message.digitalRunSeasonId = object.digitalRunSeasonId ?? undefined;
    message.parentPaymentId = object.parentPaymentId ?? undefined;
    message.createDate = object.createDate ?? "";
    message.charityInd = object.charityInd ?? 0;
    message.installmentNumber = object.installmentNumber ?? 0;
    message.digitalRunTrackId = object.digitalRunTrackId ?? 0;
    message.jiraIssueId = object.jiraIssueId ?? undefined;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBasePaymentDetailList(): PaymentDetailList {
  return { items: [] };
}

export const PaymentDetailList = {
  encode(message: PaymentDetailList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      PaymentDetail.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentDetailList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentDetailList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(PaymentDetail.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentDetailList {
    return { items: Array.isArray(object?.items) ? object.items.map((e: any) => PaymentDetail.fromJSON(e)) : [] };
  },

  toJSON(message: PaymentDetailList): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map((e) => e ? PaymentDetail.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentDetailList>, I>>(object: I): PaymentDetailList {
    const message = createBasePaymentDetailList();
    message.items = object.items?.map((e) => PaymentDetail.fromPartial(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
