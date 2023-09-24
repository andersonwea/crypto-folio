/*
  Warnings:

  - The values [BUY,SELL] on the enum `TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TYPE_new" AS ENUM ('buy', 'sell');
ALTER TABLE "transactions" ALTER COLUMN "type" TYPE "TYPE_new" USING ("type"::text::"TYPE_new");
ALTER TYPE "TYPE" RENAME TO "TYPE_old";
ALTER TYPE "TYPE_new" RENAME TO "TYPE";
DROP TYPE "TYPE_old";
COMMIT;
