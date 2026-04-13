/*
  Warnings:

  - The values [cash,bank_slip] on the enum `FinancialAccountPaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FinancialAccountPaymentMethod_new" AS ENUM ('money', 'pix', 'ticket', 'credit_card', 'debit_card', 'transfer');
ALTER TABLE "financial_account_payments" ALTER COLUMN "method" TYPE "FinancialAccountPaymentMethod_new" USING ("method"::text::"FinancialAccountPaymentMethod_new");
ALTER TYPE "FinancialAccountPaymentMethod" RENAME TO "FinancialAccountPaymentMethod_old";
ALTER TYPE "FinancialAccountPaymentMethod_new" RENAME TO "FinancialAccountPaymentMethod";
DROP TYPE "public"."FinancialAccountPaymentMethod_old";
COMMIT;
