/*
  Warnings:

  - The `companyOverview` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `businessDescription` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyOverview",
ADD COLUMN     "companyOverview" TEXT[],
DROP COLUMN "businessDescription",
ADD COLUMN     "businessDescription" TEXT[];
