import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { PaymentDetailStatusReasonXref } from "../models/domain-layer/payment/payment_detail";

export const PaymentDetailStatusReasonXrefSchema: Schema<PaymentDetailStatusReasonXref> = {
  dbSchema: "informixoltp",
  tableName: "payment_detail_status_reason_xref",
  columns: {
    paymentDetailId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "payment_detail_id",
    },
    paymentStatusReasonId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "payment_status_reason_id",
    },
  },
};
