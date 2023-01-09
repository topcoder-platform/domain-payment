import { relationalClient } from "../grpc/client/relational";

import { LookupCriteria } from "../models/common/common";
import {
  CreatePaymentInput,
  Payment,
  PaymentType,
  TaskPayment,
} from "../models/domain-layer/payment/payment";
import {
  Query,
  WhereCriteria,
  Operator,
  JoinType,
  ColumnType,
  Value,
} from "../grpc/models/rdb/relational";
import { GrpcError } from "../common/GrpcError";
import { Status } from "@grpc/grpc-js/build/src/constants";

class PaymentDomain {
  constructor(
    private schemaName: string = "informixoltp",
    private tableName: string = "payment",
    private detailTableName: string = "payment_detail"
  ) {
    this.tableName = `${this.schemaName}:${this.tableName}`;
    this.detailTableName = `${this.schemaName}:${this.detailTableName}`;
  }

  async lookup({ key, value }: LookupCriteria): Promise<Payment> {
    let whereCriteria: WhereCriteria[] = [];

    if (key === "payment_id") {
      whereCriteria = [
        {
          key,
          operator: Operator.EQUAL,
          value: { value: { $case: "intValue", intValue: value } },
        },
      ];
    } else if (key === "legacy_challenge_id") {
      whereCriteria = [
        {
          key: `${this.detailTableName}.component_contest_id`,
          operator: Operator.EQUAL,
          value: { value: { $case: "intValue", intValue: value } },
        },
      ];
    } else if (key === "challenge_id") {
      whereCriteria = [
        {
          key: "jira_issue_id",
          operator: Operator.EQUAL,
          value: { value: { $case: "stringValue", stringValue: value } },
        },
      ];
    } else throw new Error(`Invalid lookup key: ${key}`);

    const query: Partial<Query> = {
      query: {
        $case: "select",
        select: {
          table: this.tableName,
          column: [
            {
              name: "payment_id",
              tableName: this.tableName,
              type: ColumnType.INT,
            },
            {
              name: "user_id",
              tableName: this.tableName,
              type: ColumnType.INT,
            },
            {
              name: "payment_detail_id",
              tableName: this.detailTableName,
              type: ColumnType.INT,
            },
            {
              name: "total_amount",
              tableName: this.detailTableName,
              type: ColumnType.FLOAT,
            },
          ],
          where: whereCriteria,
          limit: 10,
          groupBy: [],
          orderBy: [],
          offset: 0,
          join: [
            {
              type: JoinType.INNER,
              fromTable: this.tableName,
              fromColumn: "most_recent_detail_id",
              joinTable: this.detailTableName,
              joinColumn: "payment_detail_id",
            },
          ],
        },
      },
    };

    const queryResponse = await relationalClient.query({
      query,
    });

    if (queryResponse.result?.$case !== "selectResult") {
      throw new Error(
        `Invalid query response: ${JSON.stringify(queryResponse)}`
      );
    }

    const result = queryResponse.result.selectResult;
    console.log("result", JSON.stringify(result, null, 2));
    return Promise.resolve({} as Payment);
  }

  async create(input: CreatePaymentInput): Promise<Payment> {
    if (input.kind?.$case !== "taskPayment") {
      throw new GrpcError({
        code: Status.UNIMPLEMENTED,
        details: "Only task payments are supported at the moment.",
      });
    }

    return this.createTaskPayment(input.kind.taskPayment);
  }

  private async createTaskPayment({
    challengeId,
    desc,
    paymentType,
    dueInDays,
    payable,
    payee,
  }: TaskPayment): Promise<Payment> {
    // TODO: Use Transactions

    const insertPaymentDetailQuery: Partial<Query> = {
      query: {
        $case: "insert",
        insert: {
          table: this.detailTableName,
          columnValue: [
            {
              column: "net_amount",
              value: this.toFloatValue(payable?.amount!),
            },
            {
              column: "gross_amount",
              value: this.toFloatValue(payable?.amount!),
            },
            {
              column: "total_amount",
              value: this.toFloatValue(payable?.amount!),
            },
            {
              column: "payment_desc",
              value: this.toStringValue(desc),
            },
            {
              column: "create_date",
              value: this.toDatetimeValue("CURRENT"),
            },
            {
              column: "date_modified",
              value: this.toDatetimeValue("CURRENT"),
            },
            {
              column: "date_due",
              value: this.toDatetimeValue(
                `EXTEND(CURRENT + INTERVAL (${dueInDays}) DAY(5) TO DAY, YEAR TO DAY)`
              ),
            },
            {
              column: "jira_issue_id",
              value: this.toStringValue(challengeId),
            },
            {
              column: "create_user",
              value: this.toIntValue(22838965), // tcwebservice | TODO: Get from metadata JWT Token
            },
            {
              column: "installment_number",
              value: this.toIntValue(1),
            },
            {
              column: "charity_ind",
              value: this.toIntValue(0),
            },
            {
              column: "payment_method_id",
              value: this.toIntValue(1), // Not Set
            },
            {
              column: "payment_type_id",
              value: this.toIntValue(this.mapPaymentType(paymentType)),
            },
            {
              column: "modification_rationale_id",
              value: this.toIntValue(1), // New
            },
            {
              column: "payment_status_id",
              value: this.toIntValue(70), // Entered into Payment System
            },
          ],
          idSequence: "PAYMENT_DETAIL_SEQ",
          idColumn: "payment_detail_id",
        },
      },
    };

    const createPaymentDetailResponse = await relationalClient.query({
      query: insertPaymentDetailQuery,
    });

    if (createPaymentDetailResponse.result?.$case !== "insertResult") {
      throw new GrpcError({
        code: Status.INTERNAL,
        details: `Invalid query response`,
      });
    }

    const detailId: number =
      createPaymentDetailResponse.result.insertResult.lastInsertId;

    const insertPayment: Partial<Query> = {
      query: {
        $case: "insert",
        insert: {
          table: this.tableName,
          columnValue: [
            {
              column: "user_id",
              value: this.toIntValue(payee?.userId!),
            },
            {
              column: "most_recent_detail_id",
              value: this.toIntValue(detailId),
            },
            {
              column: "create_date",
              value: this.toDatetimeValue("CURRENT"),
            },
            {
              column: "modify_date",
              value: this.toDatetimeValue("CURRENT"),
            },
            {
              column: "has_global_ad",
              value: this.toStringValue("f"),
            },
          ],
          idTable: this.tableName,
          idColumn: "payment_id",
          idSequence: "PAYMENT_SEQ",
        },
      },
    };

    const createPaymentResponse = await relationalClient.query({
      query: insertPayment,
    });

    if (createPaymentResponse.result?.$case !== "insertResult") {
      throw new GrpcError({
        code: Status.INTERNAL,
        details: `Invalid query response`,
      });
    }

    const paymentId: number =
      createPaymentResponse.result.insertResult.lastInsertId;

    const insertPaymentDetailXref: Partial<Query> = {
      query: {
        $case: "insert",
        insert: {
          table: `${this.schemaName}:payment_detail_xref`,
          columnValue: [
            {
              column: "payment_id",
              value: this.toIntValue(paymentId),
            },
            {
              column: "payment_detail_id",
              value: this.toIntValue(detailId),
            },
          ],
        },
      },
    };

    await relationalClient.query({ query: insertPaymentDetailXref });

    const insertPaymentDetailStatusReasonXref: Partial<Query> = {
      query: {
        $case: "insert",
        insert: {
          table: `${this.schemaName}:payment_detail_status_reason_xref`,
          columnValue: [
            {
              column: "payment_detail_id",
              value: this.toIntValue(detailId),
            },
            {
              column: "payment_status_reason_id",
              value: this.toIntValue(500), // Created By v5
            },
          ],
        },
      },
    };

    await relationalClient.query({
      query: insertPaymentDetailStatusReasonXref,
    });

    return Promise.resolve({} as Payment);
  }

  private toIntValue(val: number): Value {
    return {
      value: {
        $case: "intValue",
        intValue: val,
      },
    };
  }

  private toFloatValue(val: number): Value {
    return {
      value: {
        $case: "floatValue",
        floatValue: val,
      },
    };
  }

  private toStringValue(val: string): Value {
    return {
      value: {
        $case: "stringValue",
        stringValue: val,
      },
    };
  }

  private toDatetimeValue(val: string): Value {
    return {
      value: {
        $case: "datetimeValue",
        datetimeValue: val,
      },
    };
  }

  private mapPaymentType(paymentType: PaymentType): number {
    if (paymentType === PaymentType.PAYMENT_TYPE_WINNER) return 72;
    if (paymentType === PaymentType.PAYMENT_TYPE_REVIEWER) return 73;
    if (paymentType === PaymentType.PAYMENT_TYPE_COPILOT) return 74;

    throw new GrpcError({
      code: Status.FAILED_PRECONDITION,
      details: `Invalid payment type: ${paymentType}`,
    });
  }
}

export default new PaymentDomain();
