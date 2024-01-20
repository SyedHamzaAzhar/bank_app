/*
  Warnings:

  - You are about to drop the column `user_id` on the `payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_user_id_fkey";

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "user_id";
