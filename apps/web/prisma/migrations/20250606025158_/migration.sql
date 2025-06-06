/*
  Warnings:

  - You are about to drop the column `projectId` on the `ResumeData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeDataId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ResumeData" DROP CONSTRAINT "ResumeData_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "resumeDataId" TEXT;

-- AlterTable
ALTER TABLE "ResumeData" DROP COLUMN "projectId";

-- CreateIndex
CREATE UNIQUE INDEX "Project_resumeDataId_key" ON "Project"("resumeDataId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_resumeDataId_fkey" FOREIGN KEY ("resumeDataId") REFERENCES "ResumeData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
