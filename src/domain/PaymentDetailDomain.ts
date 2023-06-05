class PaymentDetailDomain {
  constructor(
    private schemaName: string = "informixoltp",
    private tableName: string = "payment_detail"
  ) {}
}

export default new PaymentDetailDomain();
