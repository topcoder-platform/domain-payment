import { Value } from "@GrpcModel/rdb/relational";
import { PaymentType } from "@Model/domain-layer/payment/payment";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { GrpcError } from "./GrpcError";

class Util {
  public mapPaymentType(paymentType: PaymentType): number {
    if (paymentType === PaymentType.PAYMENT_TYPE_WINNER) return 72;
    if (paymentType === PaymentType.PAYMENT_TYPE_REVIEWER) return 73;
    if (paymentType === PaymentType.PAYMENT_TYPE_COPILOT) return 74;
    // if (paymentType === PaymentType.PAYMENT_TYPE_CONTEST_PAYMENT) return 65;

    throw new GrpcError({
      code: Status.FAILED_PRECONDITION,
      details: `Invalid payment type: ${paymentType}`,
    });
  }

  public toIntValue(val: number): Value {
    return {
      value: {
        $case: "intValue",
        intValue: val,
      },
    };
  }

  public toFloatValue(val: number): Value {
    return {
      value: {
        $case: "floatValue",
        floatValue: val,
      },
    };
  }

  public toStringValue(val: string): Value {
    return {
      value: {
        $case: "stringValue",
        stringValue: val,
      },
    };
  }

  public toDatetimeValue(val: string): Value {
    return {
      value: {
        $case: "datetimeValue",
        datetimeValue: val,
      },
    };
  }
}

export default new Util();
