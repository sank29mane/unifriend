-- AlterTable
ALTER TABLE "User" ADD COLUMN "country" TEXT;
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "isUniversityEmailVerified" BOOLEAN DEFAULT false;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "studentStatus" TEXT DEFAULT 'UNVERIFIED';
ALTER TABLE "User" ADD COLUMN "university" TEXT;
ALTER TABLE "User" ADD COLUMN "universityEmail" TEXT;
ALTER TABLE "User" ADD COLUMN "verificationDocument" TEXT;
ALTER TABLE "User" ADD COLUMN "verificationMethod" TEXT;
