-- CreateEnum
CREATE TYPE "IPOStatus" AS ENUM ('Upcoming', 'Open', 'Closed', 'Listed');

-- CreateTable
CREATE TABLE "Company" (
    "company_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_logo" TEXT,
    "companyOverview" TEXT,
    "businessDescription" TEXT,
    "objectives" TEXT[],
    "revenue" TEXT,
    "netProfit" TEXT,
    "totalAssets" TEXT,
    "bookValue" TEXT,
    "riskFactors" TEXT[],

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "IPO" (
    "ipo_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "price_band" TEXT,
    "open_date" TIMESTAMP(3),
    "close_date" TIMESTAMP(3),
    "issue_size" TEXT,
    "issue_type" TEXT,
    "listing_date" TIMESTAMP(3),
    "status" "IPOStatus" NOT NULL,
    "ipo_price" DECIMAL(10,2),
    "listing_price" DECIMAL(10,2),
    "listing_gain" DECIMAL(5,2),
    "current_market_price" DECIMAL(10,2),
    "current_return" DECIMAL(5,2),

    CONSTRAINT "IPO_pkey" PRIMARY KEY ("ipo_id")
);

-- CreateTable
CREATE TABLE "Document" (
    "document_id" SERIAL NOT NULL,
    "ipo_id" INTEGER NOT NULL,
    "rhp_pdf" TEXT,
    "drhp_pdf" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- AddForeignKey
ALTER TABLE "IPO" ADD CONSTRAINT "IPO_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ipo_id_fkey" FOREIGN KEY ("ipo_id") REFERENCES "IPO"("ipo_id") ON DELETE CASCADE ON UPDATE CASCADE;
