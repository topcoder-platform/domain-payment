import { Payment } from "@Model/domain-layer/payment/payment";
import { ColumnType, Schema } from "@topcoder-framework/client-relational";

export const PaymentSchema: Schema<Payment> = {
  dbSchema: "informixoltp",
  tableName: "payment",
  idColumn: "payment_id",
  idSequence: "PAYMENT_SEQ",
  idTable: "payment",
  columns: {
    paymentId: { type: ColumnType.COLUMN_TYPE_LONG, name: "payment_id" },
    userId: { type: ColumnType.COLUMN_TYPE_LONG, name: "user_id" },
    mostRecentPaymentDetailId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "most_recent_detail_id",
    },
    referralPaymentId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "referral_payment_id",
    },
    payReferrer: { type: ColumnType.COLUMN_TYPE_BOOLEAN, name: "pay_referrer" },
    createDate: { type: ColumnType.COLUMN_TYPE_DATE, name: "create_date" },
    modifyDate: { type: ColumnType.COLUMN_TYPE_DATE, name: "modify_date" },
    hasGlobalAd: {
      type: ColumnType.COLUMN_TYPE_BOOLEAN,
      name: "has_global_ad",
    },
  },
};
