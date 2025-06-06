/*
  Warnings:

  - You are about to drop the column `resumeDataId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `ResumeData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `ResumeData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_resumeDataId_fkey";

-- DropIndex
DROP INDEX "Project_resumeDataId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "resumeDataId";

-- AlterTable
ALTER TABLE "ResumeData" ADD COLUMN     "projectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResumeData_projectId_key" ON "ResumeData"("projectId");

-- AddForeignKey
ALTER TABLE "ResumeData" ADD CONSTRAINT "ResumeData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
