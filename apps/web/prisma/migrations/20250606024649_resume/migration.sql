-- CreateTable
CREATE TABLE "ResumeData" (
    "id" TEXT NOT NULL,
    "github" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "about" TEXT,
    "education" JSONB,
    "experience" JSONB,
    "opensource" JSONB,
    "skills" JSONB,
    "userid" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeData" ADD CONSTRAINT "ResumeData_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeData" ADD CONSTRAINT "ResumeData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
