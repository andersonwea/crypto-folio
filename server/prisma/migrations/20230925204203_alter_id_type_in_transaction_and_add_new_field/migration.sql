/*
  Warnings:

  - The primary key for the `currencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `cryptocurrency_id` to the `currencies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_currency_id_fkey";

-- AlterTable
ALTER TABLE "currencies" DROP CONSTRAINT "currencies_pkey",
ADD COLUMN     "cryptocurrency_id" INTEGER NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "currencies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "currency_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
