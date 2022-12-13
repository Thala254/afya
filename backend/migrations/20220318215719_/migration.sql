-- AlterTable
ALTER TABLE "User" ADD COLUMN "passwordResetIssuedAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "passwordResetRedeemedAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "passwordResetToken" TEXT;
