-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('SUCCESSFUL', 'UNSUCCESSFUL', 'PENDING', 'CANCELED', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(127),
    "api_count" INTEGER,
    "is_email_verified" BOOLEAN DEFAULT false,
    "first_name" VARCHAR(127),
    "last_name" VARCHAR(127),
    "phone_number" VARCHAR(15),
    "practice_address" JSONB,
    "password" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_account_details" (
    "id" SERIAL NOT NULL,
    "account_number" VARCHAR(16),
    "IBAN" VARCHAR(24),
    "cardNumber" VARCHAR(16),
    "cvv" VARCHAR(3) NOT NULL,
    "expiryDate" DATE NOT NULL,
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
    "transaction_id" TEXT NOT NULL,
    "transfered_to" TEXT,
    "name_of_bank" TEXT,
    "account_number" VARCHAR(16),
    "IBAN" VARCHAR(24),
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_status" "Status" NOT NULL,
    "transaction_status" "TransactionStatus" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_details_account_number_key" ON "bank_account_details"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_details_IBAN_key" ON "bank_account_details"("IBAN");

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_details_cardNumber_key" ON "bank_account_details"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "bank_account_details_cvv_key" ON "bank_account_details"("cvv");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transaction_id_key" ON "payment"("transaction_id");

-- AddForeignKey
ALTER TABLE "bank_account_details" ADD CONSTRAINT "bank_account_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank_account_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
