import Util from "@Common/Util";
import { CreatePaymentDetailQueryArgs } from "@Interface/Types";
import { Payee, Payment } from "@Model/domain-layer/payment/payment";
import {
  PaymentDetail,
  PaymentDetailStatusReasonXref,
  PaymentDetailXref,
} from "@Model/domain-layer/payment/payment_detail";
import { PaymentSchema } from "@Schema/Payment";
import { PaymentDetailSchema } from "@Schema/PaymentDetail";
import { PaymentDetailStatusReasonXrefSchema } from "@Schema/PaymentDetailStatusReasonXref";
import { PaymentDetailXrefSchema } from "@Schema/PaymentDetailXref";
import { Query, QueryBuilder } from "@topcoder-framework/client-relational";

class PaymentQueryHelper {
  public getCreatePaymentDetailQuery = (
    createPaymentDetailQueryArgs: CreatePaymentDetailQueryArgs,
    user: number
  ): Query => {
    const input: Partial<PaymentDetail> = {
      netAmount: createPaymentDetailQueryArgs.amount.netAmount,
      grossAmount: createPaymentDetailQueryArgs.amount.grossAmount,
      totalAmount: createPaymentDetailQueryArgs.amount.totalAmount,
      paymentDesc: createPaymentDetailQueryArgs.paymentDescription,
      dateDue: `EXTEND(CURRENT + INTERVAL (${createPaymentDetailQueryArgs.dueInDays}) DAY(5) TO DAY, YEAR TO DAY)`,
      installmentNumber: createPaymentDetailQueryArgs.installmentNumber,
      paymentTypeId: Util.mapPaymentType(createPaymentDetailQueryArgs.paymentType),
      paymentMethodId: 1, // Not Set
      modificationRationaleId: 1, // New
      paymentStatusId: 55, // Hold - Pending Approval
      createUser: user,
      componentProjectId:
        "legacyChallengeId" in createPaymentDetailQueryArgs.challenge
          ? createPaymentDetailQueryArgs.challenge.legacyChallengeId
          : undefined,
      jiraIssueId:
        "v5ChallengeId" in createPaymentDetailQueryArgs.challenge
          ? createPaymentDetailQueryArgs.challenge.v5ChallengeId
          : undefined,
    };

    console.log(input);

    return new QueryBuilder(PaymentDetailSchema).insert(input).build();
  };

  public getCreatePaymentQuery = (payee: Payee, paymentDetailId: number): Query => {
    const input: Partial<Payment> = {
      userId: payee.userId,
      mostRecentPaymentDetailId: paymentDetailId,
      hasGlobalAd: false,
    };

    return new QueryBuilder(PaymentSchema).insert(input).build();
  };

  public getCreatePaymentDetailXrefQuery(paymentId: number, paymentDetailId: number) {
    const input: Partial<PaymentDetailXref> = {
      paymentId,
      paymentDetailId,
    };

    return new QueryBuilder(PaymentDetailXrefSchema).insert(input).build();
  }

  public getCreatePaymentDetailStatusReasonXrefQuery(detailId: number, statusReason: number) {
    const input: Partial<PaymentDetailStatusReasonXref> = {
      paymentDetailId: detailId,
      paymentStatusReasonId: statusReason,
    };

    return new QueryBuilder(PaymentDetailStatusReasonXrefSchema).insert(input).build();
  }
}

export default new PaymentQueryHelper();
