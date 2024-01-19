/*
  Warnings:

  - You are about to drop the `BankAccountDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankAccountDetails" DROP CONSTRAINT "BankAccountDetails_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_bank_id_fkey";

-- DropTable
DROP TABLE "BankAccountDetails";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "bank_account_details" (
    "id" SERIAL NOT NULL,
    "account_number" VARCHAR(16),
    "IBAN" VARCHAR(24),
    "bank" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "bank_account_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "transfered_to" TEXT NOT NULL,
    "name_of_bank" TEXT NOT NULL,
    "account_number" VARCHAR(16),
    "IBAN" VARCHAR(24),
    "amount" DECIMAL(65,30) NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_account_details" ADD CONSTRAINT "bank_account_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank_account_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
