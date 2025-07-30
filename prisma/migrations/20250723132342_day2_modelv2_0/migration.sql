/*
  Warnings:

  - You are about to drop the column `daysAvail` on the `Professional` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('CONSULTATION', 'CLEANING', 'FILLING', 'EXTRACTION', 'ROOT_CANAL', 'ORTHODONTICS', 'PERIODONTICS', 'PROSTHODONTICS', 'EMERGENCY', 'WHITENING');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "type",
ADD COLUMN     "type" "AppointmentType" NOT NULL;

-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "daysAvail";

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Availability_professionalId_day_key" ON "Availability"("professionalId", "day");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
