import { PaymentDetailXref } from "@Model/domain-layer/payment/payment_detail";
import { ColumnType, Schema } from "@topcoder-framework/client-relational";

export const PaymentDetailXrefSchema: Schema<PaymentDetailXref> = {
  dbSchema: "informixoltp",
  tableName: "payment_detail_xref",
  columns: {
    paymentId: { type: ColumnType.COLUMN_TYPE_LONG, name: "payment_id" },
    paymentDetailId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "payment_detail_id",
    },
  },
};
