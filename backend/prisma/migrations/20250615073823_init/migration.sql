/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IPO` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_ipo_id_fkey";

-- DropForeignKey
ALTER TABLE "IPO" DROP CONSTRAINT "IPO_company_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "company_id" DROP DEFAULT,
ALTER COLUMN "company_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id");
DROP SEQUENCE "Company_company_id_seq";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "ipo_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "IPO" DROP CONSTRAINT "IPO_pkey",
ALTER COLUMN "ipo_id" DROP DEFAULT,
ALTER COLUMN "ipo_id" SET DATA TYPE TEXT,
ALTER COLUMN "company_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "IPO_pkey" PRIMARY KEY ("ipo_id");
DROP SEQUENCE "IPO_ipo_id_seq";

-- AddForeignKey
ALTER TABLE "IPO" ADD CONSTRAINT "IPO_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ipo_id_fkey" FOREIGN KEY ("ipo_id") REFERENCES "IPO"("ipo_id") ON DELETE CASCADE ON UPDATE CASCADE;
