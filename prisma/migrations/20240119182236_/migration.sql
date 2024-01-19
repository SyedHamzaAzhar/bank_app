/*
  Warnings:

  - Added the required column `cvv` to the `bank_account_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `bank_account_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_account_details" ADD COLUMN     "cardNumber" VARCHAR(16),
ADD COLUMN     "cvv" VARCHAR(3) NOT NULL,
ADD COLUMN     "expiryDate" DATE NOT NULL;
