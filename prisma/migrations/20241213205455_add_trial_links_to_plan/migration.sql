-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "trialMonthlyPaymentLink" TEXT NOT NULL DEFAULT 'link',
ADD COLUMN     "trialYearlyPaymentLink" TEXT NOT NULL DEFAULT 'link';

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "trialPeriodEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
