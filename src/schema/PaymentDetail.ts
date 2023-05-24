import { PaymentDetail } from "@Model/domain-layer/payment/payment_detail";
import { ColumnType, Schema } from "@topcoder-framework/client-relational";

export const PaymentDetailSchema: Schema<PaymentDetail> = {
  dbSchema: "informixoltp",
  tableName: "payment_detail",
  idColumn: "payment_detail_id",
  idSequence: "PAYMENT_DETAIL_SEQ",
  idTable: "payment_detail",
  columns: {
    paymentDetailId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "payment_detail_id",
    },
    netAmount: { type: ColumnType.COLUMN_TYPE_FLOAT, name: "net_amount" },
    grossAmount: { type: ColumnType.COLUMN_TYPE_FLOAT, name: "gross_amount" },
    totalAmount: { type: ColumnType.COLUMN_TYPE_FLOAT, name: "total_amount" },
    datePaid: { type: ColumnType.COLUMN_TYPE_DATETIME, name: "date_paid" },
    paymentStatusId: {
      type: ColumnType.COLUMN_TYPE_INT,
      name: "payment_status_id",
    },
    paymentAddressId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "payment_address_id",
    },
    modificationRationaleId: {
      type: ColumnType.COLUMN_TYPE_INT,
      name: "modification_rationale_id",
    },
    paymentDesc: { type: ColumnType.COLUMN_TYPE_STRING, name: "payment_desc" },
    paymentTypeId: {
      type: ColumnType.COLUMN_TYPE_INT,
      name: "payment_type_id",
    },
    dateModified: {
      type: ColumnType.COLUMN_TYPE_DATETIME,
      name: "date_modified",
    },
    dateDue: { type: ColumnType.COLUMN_TYPE_DATETIME, name: "date_due" },
    paymentMethodId: {
      type: ColumnType.COLUMN_TYPE_INT,
      name: "payment_method_id",
    },
    client: { type: ColumnType.COLUMN_TYPE_STRING, name: "client" },
    algorithmRoundId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "algorithm_round_id",
    },
    algorithmProblemId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "algorithm_problem_id",
    },
    componentContestId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "component_contest_id",
    },
    componentProjectId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "component_project_id",
    },
    cockpitProjectId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "cockpit_project_id",
    },
    studioContestId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "studio_contest_id",
    },
    digitalRunStageId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "digital_run_stage_id",
    },
    digitalRunSeasonId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "digital_run_season_id",
    },
    parentPaymentId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "parent_payment_id",
    },
    createDate: { type: ColumnType.COLUMN_TYPE_DATETIME, name: "create_date" },
    charityInd: { type: ColumnType.COLUMN_TYPE_BOOLEAN, name: "charity_ind" },
    installmentNumber: {
      type: ColumnType.COLUMN_TYPE_INT,
      name: "installment_number",
    },
    digitalRunTrackId: {
      type: ColumnType.COLUMN_TYPE_LONG,
      name: "digital_run_track_id",
    },
    jiraIssueId: { type: ColumnType.COLUMN_TYPE_STRING, name: "jira_issue_id" },
    userId: { type: ColumnType.COLUMN_TYPE_LONG, name: "create_user" },
  },
};
