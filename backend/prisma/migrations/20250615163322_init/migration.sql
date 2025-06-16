/*
  Warnings:

  - The values [Upcoming,Open,Closed,Listed] on the enum `IPOStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IPOStatus_new" AS ENUM ('UPCOMING', 'OPEN', 'CLOSED', 'LISTED');
ALTER TABLE "IPO" ALTER COLUMN "status" TYPE "IPOStatus_new" USING ("status"::text::"IPOStatus_new");
ALTER TYPE "IPOStatus" RENAME TO "IPOStatus_old";
ALTER TYPE "IPOStatus_new" RENAME TO "IPOStatus";
DROP TYPE "IPOStatus_old";
COMMIT;
