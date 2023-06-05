/* eslint-disable */
import { LookupCriteria } from "@topcoder-framework/lib-common";
import Long from "long";
import _m0 from "protobufjs/minimal";

export enum PaymentType {
  PAYMENT_TYPE_UNSPECIFIED = 0,
  PAYMENT_TYPE_WINNER = 1,
  PAYMENT_TYPE_COPILOT = 2,
  PAYMENT_TYPE_REVIEWER = 3,
  PAYMENT_TYPE_CONTEST_PAYMENT = 4,
  UNRECOGNIZED = -1,
}

export function paymentTypeFromJSON(object: any): PaymentType {
  switch (object) {
    case 0:
    case "PAYMENT_TYPE_UNSPECIFIED":
      return PaymentType.PAYMENT_TYPE_UNSPECIFIED;
    case 1:
    case "PAYMENT_TYPE_WINNER":
      return PaymentType.PAYMENT_TYPE_WINNER;
    case 2:
    case "PAYMENT_TYPE_COPILOT":
      return PaymentType.PAYMENT_TYPE_COPILOT;
    case 3:
    case "PAYMENT_TYPE_REVIEWER":
      return PaymentType.PAYMENT_TYPE_REVIEWER;
    case 4:
    case "PAYMENT_TYPE_CONTEST_PAYMENT":
      return PaymentType.PAYMENT_TYPE_CONTEST_PAYMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PaymentType.UNRECOGNIZED;
  }
}

export function paymentTypeToJSON(object: PaymentType): string {
  switch (object) {
    case PaymentType.PAYMENT_TYPE_UNSPECIFIED:
      return "PAYMENT_TYPE_UNSPECIFIED";
    case PaymentType.PAYMENT_TYPE_WINNER:
      return "PAYMENT_TYPE_WINNER";
    case PaymentType.PAYMENT_TYPE_COPILOT:
      return "PAYMENT_TYPE_COPILOT";
    case PaymentType.PAYMENT_TYPE_REVIEWER:
      return "PAYMENT_TYPE_REVIEWER";
    case PaymentType.PAYMENT_TYPE_CONTEST_PAYMENT:
      return "PAYMENT_TYPE_CONTEST_PAYMENT";
    case PaymentType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Payment {
  paymentId: number;
  userId: number;
  mostRecentPaymentDetailId: number;
  referralPaymentId?: number | undefined;
  payReferrer?:
    | number
    | undefined;
  /** DATETIME YEAR TO FRACTION (3) */
  createDate?:
    | string
    | undefined;
  /** DATETIME YEAR TO FRACTION (3) */
  modifyDate?: string | undefined;
  hasGlobalAd?: boolean | undefined;
}

export interface PaymentList {
  items: Payment[];
}

export interface Payee {
  userId: number;
}

export interface Payable {
  amount: number;
  grossAmount?: number | undefined;
  totalAmount?: number | undefined;
}

export interface TaskPayment {
  challengeId: string;
  paymentType: PaymentType;
  payee?: Payee;
  payable?: Payable;
  dueInDays?: number | undefined;
  desc: string;
}

export interface ChallengePayment {
  challengeId: string;
  legacyChallengeId: number;
  paymentType: PaymentType;
  payee?: Payee;
  payable?: Payable;
  dueInDays?: number | undefined;
  desc: string;
  installmentNumber: number;
}

export interface CreatePaymentInput {
  kind?: { $case: "challengePayment"; challengePayment: ChallengePayment } | {
    $case: "taskPayment";
    taskPayment: TaskPayment;
  };
}

export interface UpdatePaymentInput {
  lookupCriteria?: LookupCriteria;
  updateInput?: UpdatePaymentInput_UpdateInput;
}

export interface UpdatePaymentInput_UpdateInput {
  payable?: Payable;
}

function createBasePayment(): Payment {
  return {
    paymentId: 0,
    userId: 0,
    mostRecentPaymentDetailId: 0,
    referralPaymentId: undefined,
    payReferrer: undefined,
    createDate: undefined,
    modifyDate: undefined,
    hasGlobalAd: undefined,
  };
}

export const Payment = {
  encode(message: Payment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paymentId !== 0) {
      writer.uint32(8).int64(message.paymentId);
    }
    if (message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    if (message.mostRecentPaymentDetailId !== 0) {
      writer.uint32(24).int64(message.mostRecentPaymentDetailId);
    }
    if (message.referralPaymentId !== undefined) {
      writer.uint32(32).int64(message.referralPaymentId);
    }
    if (message.payReferrer !== undefined) {
      writer.uint32(40).int32(message.payReferrer);
    }
    if (message.createDate !== undefined) {
      writer.uint32(50).string(message.createDate);
    }
    if (message.modifyDate !== undefined) {
      writer.uint32(58).string(message.modifyDate);
    }
    if (message.hasGlobalAd !== undefined) {
      writer.uint32(64).bool(message.hasGlobalAd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paymentId = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.userId = reader.int32();
          break;
        case 3:
          message.mostRecentPaymentDetailId = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.referralPaymentId = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.payReferrer = reader.int32();
          break;
        case 6:
          message.createDate = reader.string();
          break;
        case 7:
          message.modifyDate = reader.string();
          break;
        case 8:
          message.hasGlobalAd = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Payment {
    return {
      paymentId: isSet(object.paymentId) ? Number(object.paymentId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      mostRecentPaymentDetailId: isSet(object.mostRecentPaymentDetailId) ? Number(object.mostRecentPaymentDetailId) : 0,
      referralPaymentId: isSet(object.referralPaymentId) ? Number(object.referralPaymentId) : undefined,
      payReferrer: isSet(object.payReferrer) ? Number(object.payReferrer) : undefined,
      createDate: isSet(object.createDate) ? String(object.createDate) : undefined,
      modifyDate: isSet(object.modifyDate) ? String(object.modifyDate) : undefined,
      hasGlobalAd: isSet(object.hasGlobalAd) ? Boolean(object.hasGlobalAd) : undefined,
    };
  },

  toJSON(message: Payment): unknown {
    const obj: any = {};
    message.paymentId !== undefined && (obj.paymentId = Math.round(message.paymentId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.mostRecentPaymentDetailId !== undefined &&
      (obj.mostRecentPaymentDetailId = Math.round(message.mostRecentPaymentDetailId));
    message.referralPaymentId !== undefined && (obj.referralPaymentId = Math.round(message.referralPaymentId));
    message.payReferrer !== undefined && (obj.payReferrer = Math.round(message.payReferrer));
    message.createDate !== undefined && (obj.createDate = message.createDate);
    message.modifyDate !== undefined && (obj.modifyDate = message.modifyDate);
    message.hasGlobalAd !== undefined && (obj.hasGlobalAd = message.hasGlobalAd);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Payment>, I>>(object: I): Payment {
    const message = createBasePayment();
    message.paymentId = object.paymentId ?? 0;
    message.userId = object.userId ?? 0;
    message.mostRecentPaymentDetailId = object.mostRecentPaymentDetailId ?? 0;
    message.referralPaymentId = object.referralPaymentId ?? undefined;
    message.payReferrer = object.payReferrer ?? undefined;
    message.createDate = object.createDate ?? undefined;
    message.modifyDate = object.modifyDate ?? undefined;
    message.hasGlobalAd = object.hasGlobalAd ?? undefined;
    return message;
  },
};

function createBasePaymentList(): PaymentList {
  return { items: [] };
}

export const PaymentList = {
  encode(message: PaymentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Payment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.items.push(Payment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PaymentList {
    return { items: Array.isArray(object?.items) ? object.items.map((e: any) => Payment.fromJSON(e)) : [] };
  },

  toJSON(message: PaymentList): unknown {
    const obj: any = {};
    if (message.items) {
      obj.items = message.items.map((e) => e ? Payment.toJSON(e) : undefined);
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PaymentList>, I>>(object: I): PaymentList {
    const message = createBasePaymentList();
    message.items = object.items?.map((e) => Payment.fromPartial(e)) || [];
    return message;
  },
};

function createBasePayee(): Payee {
  return { userId: 0 };
}

export const Payee = {
  encode(message: Payee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Payee {
    return { userId: isSet(object.userId) ? Number(object.userId) : 0 };
  },

  toJSON(message: Payee): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Payee>, I>>(object: I): Payee {
    const message = createBasePayee();
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBasePayable(): Payable {
  return { amount: 0, grossAmount: undefined, totalAmount: undefined };
}

export const Payable = {
  encode(message: Payable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== 0) {
      writer.uint32(13).float(message.amount);
    }
    if (message.grossAmount !== undefined) {
      writer.uint32(21).float(message.grossAmount);
    }
    if (message.totalAmount !== undefined) {
      writer.uint32(29).float(message.totalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Payable {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePayable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.float();
          break;
        case 2:
          message.grossAmount = reader.float();
          break;
        case 3:
          message.totalAmount = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Payable {
    return {
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      grossAmount: isSet(object.grossAmount) ? Number(object.grossAmount) : undefined,
      totalAmount: isSet(object.totalAmount) ? Number(object.totalAmount) : undefined,
    };
  },

  toJSON(message: Payable): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.grossAmount !== undefined && (obj.grossAmount = message.grossAmount);
    message.totalAmount !== undefined && (obj.totalAmount = message.totalAmount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Payable>, I>>(object: I): Payable {
    const message = createBasePayable();
    message.amount = object.amount ?? 0;
    message.grossAmount = object.grossAmount ?? undefined;
    message.totalAmount = object.totalAmount ?? undefined;
    return message;
  },
};

function createBaseTaskPayment(): TaskPayment {
  return { challengeId: "", paymentType: 0, payee: undefined, payable: undefined, dueInDays: undefined, desc: "" };
}

export const TaskPayment = {
  encode(message: TaskPayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.challengeId !== "") {
      writer.uint32(10).string(message.challengeId);
    }
    if (message.paymentType !== 0) {
      writer.uint32(16).int32(message.paymentType);
    }
    if (message.payee !== undefined) {
      Payee.encode(message.payee, writer.uint32(26).fork()).ldelim();
    }
    if (message.payable !== undefined) {
      Payable.encode(message.payable, writer.uint32(34).fork()).ldelim();
    }
    if (message.dueInDays !== undefined) {
      writer.uint32(40).int32(message.dueInDays);
    }
    if (message.desc !== "") {
      writer.uint32(50).string(message.desc);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TaskPayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTaskPayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.challengeId = reader.string();
          break;
        case 2:
          message.paymentType = reader.int32() as any;
          break;
        case 3:
          message.payee = Payee.decode(reader, reader.uint32());
          break;
        case 4:
          message.payable = Payable.decode(reader, reader.uint32());
          break;
        case 5:
          message.dueInDays = reader.int32();
          break;
        case 6:
          message.desc = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TaskPayment {
    return {
      challengeId: isSet(object.challengeId) ? String(object.challengeId) : "",
      paymentType: isSet(object.paymentType) ? paymentTypeFromJSON(object.paymentType) : 0,
      payee: isSet(object.payee) ? Payee.fromJSON(object.payee) : undefined,
      payable: isSet(object.payable) ? Payable.fromJSON(object.payable) : undefined,
      dueInDays: isSet(object.dueInDays) ? Number(object.dueInDays) : undefined,
      desc: isSet(object.desc) ? String(object.desc) : "",
    };
  },

  toJSON(message: TaskPayment): unknown {
    const obj: any = {};
    message.challengeId !== undefined && (obj.challengeId = message.challengeId);
    message.paymentType !== undefined && (obj.paymentType = paymentTypeToJSON(message.paymentType));
    message.payee !== undefined && (obj.payee = message.payee ? Payee.toJSON(message.payee) : undefined);
    message.payable !== undefined && (obj.payable = message.payable ? Payable.toJSON(message.payable) : undefined);
    message.dueInDays !== undefined && (obj.dueInDays = Math.round(message.dueInDays));
    message.desc !== undefined && (obj.desc = message.desc);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TaskPayment>, I>>(object: I): TaskPayment {
    const message = createBaseTaskPayment();
    message.challengeId = object.challengeId ?? "";
    message.paymentType = object.paymentType ?? 0;
    message.payee = (object.payee !== undefined && object.payee !== null) ? Payee.fromPartial(object.payee) : undefined;
    message.payable = (object.payable !== undefined && object.payable !== null)
      ? Payable.fromPartial(object.payable)
      : undefined;
    message.dueInDays = object.dueInDays ?? undefined;
    message.desc = object.desc ?? "";
    return message;
  },
};

function createBaseChallengePayment(): ChallengePayment {
  return {
    challengeId: "",
    legacyChallengeId: 0,
    paymentType: 0,
    payee: undefined,
    payable: undefined,
    dueInDays: undefined,
    desc: "",
    installmentNumber: 0,
  };
}

export const ChallengePayment = {
  encode(message: ChallengePayment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.challengeId !== "") {
      writer.uint32(10).string(message.challengeId);
    }
    if (message.legacyChallengeId !== 0) {
      writer.uint32(16).int32(message.legacyChallengeId);
    }
    if (message.paymentType !== 0) {
      writer.uint32(24).int32(message.paymentType);
    }
    if (message.payee !== undefined) {
      Payee.encode(message.payee, writer.uint32(34).fork()).ldelim();
    }
    if (message.payable !== undefined) {
      Payable.encode(message.payable, writer.uint32(42).fork()).ldelim();
    }
    if (message.dueInDays !== undefined) {
      writer.uint32(48).int32(message.dueInDays);
    }
    if (message.desc !== "") {
      writer.uint32(58).string(message.desc);
    }
    if (message.installmentNumber !== 0) {
      writer.uint32(64).sint32(message.installmentNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChallengePayment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChallengePayment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.challengeId = reader.string();
          break;
        case 2:
          message.legacyChallengeId = reader.int32();
          break;
        case 3:
          message.paymentType = reader.int32() as any;
          break;
        case 4:
          message.payee = Payee.decode(reader, reader.uint32());
          break;
        case 5:
          message.payable = Payable.decode(reader, reader.uint32());
          break;
        case 6:
          message.dueInDays = reader.int32();
          break;
        case 7:
          message.desc = reader.string();
          break;
        case 8:
          message.installmentNumber = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChallengePayment {
    return {
      challengeId: isSet(object.challengeId) ? String(object.challengeId) : "",
      legacyChallengeId: isSet(object.legacyChallengeId) ? Number(object.legacyChallengeId) : 0,
      paymentType: isSet(object.paymentType) ? paymentTypeFromJSON(object.paymentType) : 0,
      payee: isSet(object.payee) ? Payee.fromJSON(object.payee) : undefined,
      payable: isSet(object.payable) ? Payable.fromJSON(object.payable) : undefined,
      dueInDays: isSet(object.dueInDays) ? Number(object.dueInDays) : undefined,
      desc: isSet(object.desc) ? String(object.desc) : "",
      installmentNumber: isSet(object.installmentNumber) ? Number(object.installmentNumber) : 0,
    };
  },

  toJSON(message: ChallengePayment): unknown {
    const obj: any = {};
    message.challengeId !== undefined && (obj.challengeId = message.challengeId);
    message.legacyChallengeId !== undefined && (obj.legacyChallengeId = Math.round(message.legacyChallengeId));
    message.paymentType !== undefined && (obj.paymentType = paymentTypeToJSON(message.paymentType));
    message.payee !== undefined && (obj.payee = message.payee ? Payee.toJSON(message.payee) : undefined);
    message.payable !== undefined && (obj.payable = message.payable ? Payable.toJSON(message.payable) : undefined);
    message.dueInDays !== undefined && (obj.dueInDays = Math.round(message.dueInDays));
    message.desc !== undefined && (obj.desc = message.desc);
    message.installmentNumber !== undefined && (obj.installmentNumber = Math.round(message.installmentNumber));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChallengePayment>, I>>(object: I): ChallengePayment {
    const message = createBaseChallengePayment();
    message.challengeId = object.challengeId ?? "";
    message.legacyChallengeId = object.legacyChallengeId ?? 0;
    message.paymentType = object.paymentType ?? 0;
    message.payee = (object.payee !== undefined && object.payee !== null) ? Payee.fromPartial(object.payee) : undefined;
    message.payable = (object.payable !== undefined && object.payable !== null)
      ? Payable.fromPartial(object.payable)
      : undefined;
    message.dueInDays = object.dueInDays ?? undefined;
    message.desc = object.desc ?? "";
    message.installmentNumber = object.installmentNumber ?? 0;
    return message;
  },
};

function createBaseCreatePaymentInput(): CreatePaymentInput {
  return { kind: undefined };
}

export const CreatePaymentInput = {
  encode(message: CreatePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.kind?.$case === "challengePayment") {
      ChallengePayment.encode(message.kind.challengePayment, writer.uint32(10).fork()).ldelim();
    }
    if (message.kind?.$case === "taskPayment") {
      TaskPayment.encode(message.kind.taskPayment, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePaymentInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePaymentInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = {
            $case: "challengePayment",
            challengePayment: ChallengePayment.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.kind = { $case: "taskPayment", taskPayment: TaskPayment.decode(reader, reader.uint32()) };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatePaymentInput {
    return {
      kind: isSet(object.challengePayment)
        ? { $case: "challengePayment", challengePayment: ChallengePayment.fromJSON(object.challengePayment) }
        : isSet(object.taskPayment)
        ? { $case: "taskPayment", taskPayment: TaskPayment.fromJSON(object.taskPayment) }
        : undefined,
    };
  },

  toJSON(message: CreatePaymentInput): unknown {
    const obj: any = {};
    message.kind?.$case === "challengePayment" && (obj.challengePayment = message.kind?.challengePayment
      ? ChallengePayment.toJSON(message.kind?.challengePayment)
      : undefined);
    message.kind?.$case === "taskPayment" &&
      (obj.taskPayment = message.kind?.taskPayment ? TaskPayment.toJSON(message.kind?.taskPayment) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreatePaymentInput>, I>>(object: I): CreatePaymentInput {
    const message = createBaseCreatePaymentInput();
    if (
      object.kind?.$case === "challengePayment" &&
      object.kind?.challengePayment !== undefined &&
      object.kind?.challengePayment !== null
    ) {
      message.kind = {
        $case: "challengePayment",
        challengePayment: ChallengePayment.fromPartial(object.kind.challengePayment),
      };
    }
    if (
      object.kind?.$case === "taskPayment" &&
      object.kind?.taskPayment !== undefined &&
      object.kind?.taskPayment !== null
    ) {
      message.kind = { $case: "taskPayment", taskPayment: TaskPayment.fromPartial(object.kind.taskPayment) };
    }
    return message;
  },
};

function createBaseUpdatePaymentInput(): UpdatePaymentInput {
  return { lookupCriteria: undefined, updateInput: undefined };
}

export const UpdatePaymentInput = {
  encode(message: UpdatePaymentInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lookupCriteria !== undefined) {
      LookupCriteria.encode(message.lookupCriteria, writer.uint32(10).fork()).ldelim();
    }
    if (message.updateInput !== undefined) {
      UpdatePaymentInput_UpdateInput.encode(message.updateInput, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePaymentInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePaymentInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lookupCriteria = LookupCriteria.decode(reader, reader.uint32());
          break;
        case 2:
          message.updateInput = UpdatePaymentInput_UpdateInput.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdatePaymentInput {
    return {
      lookupCriteria: isSet(object.lookupCriteria) ? LookupCriteria.fromJSON(object.lookupCriteria) : undefined,
      updateInput: isSet(object.updateInput) ? UpdatePaymentInput_UpdateInput.fromJSON(object.updateInput) : undefined,
    };
  },

  toJSON(message: UpdatePaymentInput): unknown {
    const obj: any = {};
    message.lookupCriteria !== undefined &&
      (obj.lookupCriteria = message.lookupCriteria ? LookupCriteria.toJSON(message.lookupCriteria) : undefined);
    message.updateInput !== undefined &&
      (obj.updateInput = message.updateInput ? UpdatePaymentInput_UpdateInput.toJSON(message.updateInput) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePaymentInput>, I>>(object: I): UpdatePaymentInput {
    const message = createBaseUpdatePaymentInput();
    message.lookupCriteria = (object.lookupCriteria !== undefined && object.lookupCriteria !== null)
      ? LookupCriteria.fromPartial(object.lookupCriteria)
      : undefined;
    message.updateInput = (object.updateInput !== undefined && object.updateInput !== null)
      ? UpdatePaymentInput_UpdateInput.fromPartial(object.updateInput)
      : undefined;
    return message;
  },
};

function createBaseUpdatePaymentInput_UpdateInput(): UpdatePaymentInput_UpdateInput {
  return { payable: undefined };
}

export const UpdatePaymentInput_UpdateInput = {
  encode(message: UpdatePaymentInput_UpdateInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payable !== undefined) {
      Payable.encode(message.payable, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePaymentInput_UpdateInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePaymentInput_UpdateInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payable = Payable.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdatePaymentInput_UpdateInput {
    return { payable: isSet(object.payable) ? Payable.fromJSON(object.payable) : undefined };
  },

  toJSON(message: UpdatePaymentInput_UpdateInput): unknown {
    const obj: any = {};
    message.payable !== undefined && (obj.payable = message.payable ? Payable.toJSON(message.payable) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdatePaymentInput_UpdateInput>, I>>(
    object: I,
  ): UpdatePaymentInput_UpdateInput {
    const message = createBaseUpdatePaymentInput_UpdateInput();
    message.payable = (object.payable !== undefined && object.payable !== null)
      ? Payable.fromPartial(object.payable)
      : undefined;
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
