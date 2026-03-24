-- CreateEnum
CREATE TYPE "FinancialAccountPaymentMethod" AS ENUM ('cash', 'pix', 'bank_slip', 'credit_card', 'debit_card', 'transfer');

-- CreateTable
CREATE TABLE "financial_account_payments" (
    "id" SERIAL NOT NULL,
    "financial_account_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "FinancialAccountPaymentMethod" NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_account_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "financial_account_payments_financial_account_id_idx" ON "financial_account_payments"("financial_account_id");

-- AddForeignKey
ALTER TABLE "financial_account_payments" ADD CONSTRAINT "financial_account_payments_financial_account_id_fkey" FOREIGN KEY ("financial_account_id") REFERENCES "financial_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
