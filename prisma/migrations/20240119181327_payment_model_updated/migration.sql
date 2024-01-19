/*
  Warnings:

  - Added the required column `name_of_bank` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "IBAN" VARCHAR(24),
ADD COLUMN     "account_number" VARCHAR(16),
ADD COLUMN     "name_of_bank" TEXT NOT NULL;
