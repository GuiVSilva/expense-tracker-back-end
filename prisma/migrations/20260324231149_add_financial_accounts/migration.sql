-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('receivable', 'payable');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('pending', 'paid', 'partial', 'overdue', 'canceled');

-- CreateTable
CREATE TABLE "financial_accounts" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "category_id" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "amount_paid" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "AccountStatus" NOT NULL DEFAULT 'pending',
    "installment_number" INTEGER,
    "installment_total" INTEGER,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "financial_accounts_userId_type_idx" ON "financial_accounts"("userId", "type");

-- CreateIndex
CREATE INDEX "financial_accounts_userId_status_idx" ON "financial_accounts"("userId", "status");

-- CreateIndex
CREATE INDEX "financial_accounts_userId_due_date_idx" ON "financial_accounts"("userId", "due_date");

-- AddForeignKey
ALTER TABLE "financial_accounts" ADD CONSTRAINT "financial_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_accounts" ADD CONSTRAINT "financial_accounts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
