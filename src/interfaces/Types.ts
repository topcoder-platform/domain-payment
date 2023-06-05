import { PaymentType } from "@Model/domain-layer/payment/payment";

export interface ChallengeInfo {
  legacyChallengeId?: number;
  v5ChallengeId?: string;
}

export interface PaymentAmount {
  netAmount: number;
  grossAmount: number;
  totalAmount: number;
}

export interface CreatePaymentDetailQueryArgs {
  challenge: ChallengeInfo & (Pick<ChallengeInfo, "legacyChallengeId"> | Pick<ChallengeInfo, "v5ChallengeId">);
  amount: PaymentAmount;
  paymentDescription: string;
  dueInDays: number;
  paymentType: PaymentType;
  installmentNumber: number;
}
