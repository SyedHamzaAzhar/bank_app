-- CreateTable
CREATE TABLE "BankAccountDetails" (
    "id" SERIAL NOT NULL,
    "account_number" VARCHAR(16),
    "IBAN" VARCHAR(24),
    "bank" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "BankAccountDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "transfered_to" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankAccountDetails" ADD CONSTRAINT "BankAccountDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "BankAccountDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
