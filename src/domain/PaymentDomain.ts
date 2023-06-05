import { ColumnType, JoinType, Operator, Query, WhereCriteria } from "@topcoder-framework/client-relational";
import { queryRunner } from "../helpers/QueryRunner";

import {
  ChallengePayment,
  CreatePaymentInput,
  Payment,
  PaymentType,
  TaskPayment,
  UpdatePaymentInput,
} from "../models/domain-layer/payment/payment";

import { GrpcError } from "../common/GrpcError";
import { Status } from "@grpc/grpc-js/build/src/constants";

import Util from "../common/Util";
import { LookupCriteria } from "@topcoder-framework/lib-common";
import PaymentQueryHelper from "../helpers/query-helper/PaymentQueryHelper";

const TCWEBSERVICE = 22838965;

class PaymentDomain {
  constructor(
    private schemaName: string = "informixoltp",
    private tableName: string = "payment",
    private detailTableName: string = "payment_detail"
  ) {}

  async lookup({ key, value }: LookupCriteria): Promise<Payment> {
    let whereCriteria: WhereCriteria[] = [];

    if (key === "payment_id") {
      return this.getPaymentWithDetails({ key, value });
    } else if (key === "legacy_challenge_id") {
      whereCriteria = [
        {
          key: `${this.detailTableName}.component_project_id`,
          operator: Operator.OPERATOR_EQUAL,
          value: { value: { $case: "intValue", intValue: value } },
        },
      ];
    } else if (key === "challenge_id") {
      whereCriteria = [
        {
          key: "jira_issue_id",
          operator: Operator.OPERATOR_EQUAL,
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
              type: ColumnType.COLUMN_TYPE_INT,
            },
            {
              name: "user_id",
              tableName: this.tableName,
              type: ColumnType.COLUMN_TYPE_INT,
            },
            {
              name: "payment_detail_id",
              tableName: this.detailTableName,
              type: ColumnType.COLUMN_TYPE_INT,
            },
            {
              name: "total_amount",
              tableName: this.detailTableName,
              type: ColumnType.COLUMN_TYPE_FLOAT,
            },
          ],
          where: whereCriteria,
          limit: 10,
          groupBy: [],
          orderBy: [],
          offset: 0,
          join: [
            {
              type: JoinType.JOIN_TYPE_INNER,
              fromTable: this.tableName,
              fromColumn: "most_recent_detail_id",
              joinTable: this.detailTableName,
              joinColumn: "payment_detail_id",
            },
          ],
        },
      },
    };

    const transaction = queryRunner.beginTransaction();

    const queryResponse = await transaction.add(query);

    if (queryResponse.rows?.length === 0) {
      throw new Error(`Invalid query response: ${JSON.stringify(queryResponse)}`);
    }

    const result = queryResponse.rows;
    console.log("result", JSON.stringify(result, null, 2));
    return Promise.resolve({} as Payment);
  }

  async create(input: CreatePaymentInput): Promise<Payment> {
    const paymentKind = input.kind?.$case;
    let payment: ChallengePayment | TaskPayment;

    if (paymentKind === "challengePayment") {
      payment = input.kind?.challengePayment!;
    } else {
      payment = input.kind?.taskPayment!;
    }

    const createPaymentDetailQuery = PaymentQueryHelper.getCreatePaymentDetailQuery(
      {
        challenge: {
          // prettier-ignore
          legacyChallengeId: paymentKind === "challengePayment" ? (payment as ChallengePayment).legacyChallengeId! : undefined,
          v5ChallengeId: paymentKind === "taskPayment" ? (payment as TaskPayment).challengeId! : undefined,
        },
        amount: {
          netAmount: payment.payable?.amount!,
          grossAmount: payment.payable?.amount!,
          totalAmount: payment.payable?.amount!,
        },
        dueInDays: payment.dueInDays!,
        // prettier-ignore
        installmentNumber:  paymentKind === "challengePayment" ? (payment as ChallengePayment).installmentNumber : 1,
        paymentDescription: payment.desc!,
        paymentType: payment.paymentType!,
      },
      TCWEBSERVICE
    );

    const transaction = queryRunner.beginTransaction();
    const paymentDetailResponse = await transaction.add(createPaymentDetailQuery);

    if (paymentDetailResponse.lastInsertId === undefined) {
      throw new GrpcError({
        code: Status.INTERNAL,
        details: `Invalid query response`,
      });
    }

    const paymentDetailId = paymentDetailResponse.lastInsertId;

    const createPaymentQuery = PaymentQueryHelper.getCreatePaymentQuery(payment.payee!, paymentDetailId);
    const paymentResponse = await transaction.add(createPaymentQuery);
    if (paymentResponse.lastInsertId === undefined) {
      throw new GrpcError({
        code: Status.INTERNAL,
        details: `Invalid query response`,
      });
    }

    const paymentId = paymentResponse.lastInsertId;

    const createPaymentDetailXrefQuery = PaymentQueryHelper.getCreatePaymentDetailXrefQuery(paymentId, paymentDetailId);
    await transaction.add(createPaymentDetailXrefQuery);

    if (paymentKind === "taskPayment") {
      const createPaymentDetailStatusReasonXrefQuery = PaymentQueryHelper.getCreatePaymentDetailStatusReasonXrefQuery(
        paymentDetailId,
        500 /* Created By v5 */
      );
      await transaction.add(createPaymentDetailStatusReasonXrefQuery);
    }

    transaction.commit();

    return {
      paymentId,
      userId: payment.payee?.userId!,
      mostRecentPaymentDetailId: paymentDetailId,
    };
  }

  async edit(input: UpdatePaymentInput): Promise<Payment> {
    return Promise.resolve({} as Payment);
  }

  // private async createTaskPayment({
  //   challengeId,
  //   desc,
  //   paymentType,
  //   dueInDays,
  //   payable,
  //   payee,
  // }: TaskPayment): Promise<Payment> {
  //   const transaction = queryRunner.beginTransaction();

  //   const insertPaymentDetailQuery: Partial<Query> = {
  //     query: {
  //       $case: "insert",
  //       insert: {
  //         schema: this.schemaName,
  //         table: this.detailTableName,
  //         columnValue: [
  //           {
  //             column: "net_amount",
  //             value: Util.toFloatValue(payable?.amount!),
  //           },
  //           {
  //             column: "gross_amount",
  //             value: Util.toFloatValue(payable?.amount!),
  //           },
  //           {
  //             column: "total_amount",
  //             value: Util.toFloatValue(payable?.amount!),
  //           },
  //           {
  //             column: "payment_desc",
  //             value: Util.toStringValue(desc),
  //           },
  //           {
  //             column: "create_date",
  //             value: Util.toDatetimeValue("CURRENT"),
  //           },
  //           {
  //             column: "date_modified",
  //             value: Util.toDatetimeValue("CURRENT"),
  //           },
  //           {
  //             column: "date_due",
  //             value: Util.toDatetimeValue(`EXTEND(CURRENT + INTERVAL (${dueInDays}) DAY(5) TO DAY, YEAR TO DAY)`),
  //           },
  //           {
  //             column: "jira_issue_id",
  //             value: Util.toStringValue(challengeId),
  //           },
  //           {
  //             column: "create_user",
  //             value: Util.toIntValue(22838965), // tcwebservice | TODO: Get from metadata JWT Token
  //           },
  //           {
  //             column: "installment_number",
  //             value: Util.toIntValue(1),
  //           },
  //           {
  //             column: "charity_ind",
  //             value: Util.toIntValue(0),
  //           },
  //           {
  //             column: "payment_method_id",
  //             value: Util.toIntValue(1), // Not Set
  //           },
  //           {
  //             column: "payment_type_id",
  //             value: Util.toIntValue(this.mapPaymentType(paymentType)),
  //           },
  //           {
  //             column: "modification_rationale_id",
  //             value: Util.toIntValue(1), // New
  //           },
  //           {
  //             column: "payment_status_id",
  //             value: Util.toIntValue(55), // Hold - Pending Approval - has user filled up tax forms for example?
  //           },
  //         ],
  //         idSequence: "PAYMENT_DETAIL_SEQ",
  //         idColumn: "payment_detail_id",
  //       },
  //     },
  //   };

  //   const createPaymentDetailResponse = await transaction.add(insertPaymentDetailQuery);

  //   if (createPaymentDetailResponse.result?.$case !== "insertResult") {
  //     throw new GrpcError({
  //       code: Status.INTERNAL,
  //       details: `Invalid query response`,
  //     });
  //   }

  //   // prettier-ignore
  //   const detailId: number = createPaymentDetailResponse.result.insertResult.lastInsertId;

  //   const insertPayment: Partial<Query> = {
  //     query: {
  //       $case: "insert",
  //       insert: {
  //         schema: this.schemaName,
  //         table: this.tableName,
  //         columnValue: [
  //           {
  //             column: "user_id",
  //             value: Util.toIntValue(payee?.userId!),
  //           },
  //           {
  //             column: "most_recent_detail_id",
  //             value: Util.toIntValue(detailId),
  //           },
  //           {
  //             column: "create_date",
  //             value: Util.toDatetimeValue("CURRENT"),
  //           },
  //           {
  //             column: "modify_date",
  //             value: Util.toDatetimeValue("CURRENT"),
  //           },
  //           {
  //             column: "has_global_ad",
  //             value: Util.toStringValue("f"),
  //           },
  //         ],
  //         idTable: this.tableName,
  //         idColumn: "payment_id",
  //         idSequence: "PAYMENT_SEQ",
  //       },
  //     },
  //   };

  //   const createPaymentResponse = await relationalClient.query({
  //     query: insertPayment,
  //   });

  //   if (createPaymentResponse.result?.$case !== "insertResult") {
  //     throw new GrpcError({
  //       code: Status.INTERNAL,
  //       details: `Invalid query response`,
  //     });
  //   }

  //   const paymentId: number = createPaymentResponse.result.insertResult.lastInsertId;

  //   const insertPaymentDetailXref: Partial<Query> = {
  //     query: {
  //       $case: "insert",
  //       insert: {
  //         schema: this.schemaName,
  //         table: "payment_detail_xref",
  //         columnValue: [
  //           {
  //             column: "payment_id",
  //             value: Util.toIntValue(paymentId),
  //           },
  //           {
  //             column: "payment_detail_id",
  //             value: Util.toIntValue(detailId),
  //           },
  //         ],
  //       },
  //     },
  //   };

  //   await relationalClient.query({ query: insertPaymentDetailXref });

  //   const insertPaymentDetailStatusReasonXref: Partial<Query> = {
  //     query: {
  //       $case: "insert",
  //       insert: {
  //         schema: this.schemaName,
  //         table: "payment_detail_status_reason_xref",
  //         columnValue: [
  //           {
  //             column: "payment_detail_id",
  //             value: Util.toIntValue(detailId),
  //           },
  //           {
  //             column: "payment_status_reason_id",
  //             value: Util.toIntValue(500), // Created By v5
  //           },
  //         ],
  //       },
  //     },
  //   };

  //   await relationalClient.query({
  //     query: insertPaymentDetailStatusReasonXref,
  //   });

  //   return {
  //     paymentId,
  //     userId: payee?.userId!,
  //     mostRecentPaymentDetailId: detailId,
  //   };
  // }

  private async getPaymentWithDetails(lookupCriteria: LookupCriteria): Promise<Payment> {
    if (lookupCriteria.key != "payment_id") {
      throw new Error(`Expected lookup by "payment_id." Invalid lookup criteria: ${lookupCriteria.key}`);
    }

    const paymentId = lookupCriteria.value;
    const query: Query = {
      query: {
        $case: "select",
        select: {
          schema: this.schemaName,
          table: this.tableName,
          column: [],
          where: [
            {
              key: lookupCriteria.key,
              operator: Operator.OPERATOR_EQUAL,
              value: Util.toIntValue(paymentId),
            },
          ],
          join: [
            {
              type: JoinType.JOIN_TYPE_INNER,
              fromTableSchema: this.schemaName,
              fromTable: this.tableName,
              fromColumn: "payment_id",
              joinTableSchema: this.schemaName,
              joinTable: "payment_detail_xref",
              joinColumn: "payment_id",
            },
            {
              type: JoinType.JOIN_TYPE_INNER,
              fromTableSchema: this.schemaName,
              fromTable: "payment_detail_xref",
              fromColumn: "payment_detail_id",
              joinTableSchema: this.schemaName,
              joinTable: this.detailTableName,
              joinColumn: "payment_detail_id",
            },
          ],
          groupBy: [],
          orderBy: [],
          limit: 500,
          offset: 0,
        },
      },
    };

    const transaction = queryRunner.beginTransaction();
    const queryResult = await transaction.add(query);

    if (queryResult.rows?.length === 0) {
      throw new GrpcError({
        code: Status.INTERNAL,
        details: "Unexpected query response",
      });
    }

    const { rows } = queryResult;
    console.log("Response from Server", JSON.stringify(rows));

    return Promise.resolve({} as Payment);
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
