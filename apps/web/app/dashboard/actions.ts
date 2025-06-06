"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/src";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function createNewProject() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const userId = session.user.id!;

  const data = await prisma.project.create({
    data: {
      title: "untitled",
      portfolioURL: `http://${userId}.localhost:3000`,
      userId
    }
  });

  redirect(`/dashboard/projects/${data.id}`);
}

export async function getAllProjects() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("unauthenticated");
  }

  const userId = session.user.id!;

  const projectsData = await prisma.project.findMany({
    where: {
      userId
    }
  });

  return projectsData;
}

export async function uploadResume(formData: FormData, projectId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("unauthenticated");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "resumes" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });

  // Set resumeURL in Project
  await prisma.project.update({
    where: { id: projectId },
    data: { resumeURL: uploadResult.secure_url },
  });

  // Use LangChain to extract data from Gemini
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
  });

  const prompt = `
You are an AI that extracts structured resume data from a resume file.
Given the resume at this URL: ${uploadResult.secure_url}
Return a JSON object with the following fields:
{
  "name": "",
  "email": "",
  "phone": "",
  "education": [],
  "experience": [],
  "skills": []
}
`;

  const response = await model.invoke([
    ["human", prompt]
  ]);
  let geminiData: any = {};
  try {
    // Try to parse the model's response as JSON
    geminiData = JSON.parse(typeof response.content === "string" ? response.content : JSON.stringify(response.content));
  } catch {
    // Fallback: try to extract JSON from the response string
    const contentStr = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    const match = contentStr.match(/\{[\s\S]*\}/);
    if (match) {
      geminiData = JSON.parse(match[0]);
    }
  }

  // Parse and update ResumeData
  await prisma.resumeData.upsert({
    where: { projectId: projectId, userid: session.user.id! },
    update: {
      name: geminiData.name,
      email: geminiData.email,
      phone: geminiData.phone,
      education: geminiData.education,
      experience: geminiData.experience,
      skills: geminiData.skills,
    },
    create: {
      projectId,
      userid: session.user.id!,
      name: geminiData.name,
      email: geminiData.email,
      phone: geminiData.phone,
      education: geminiData.education,
      experience: geminiData.experience,
      skills: geminiData.skills,
    },
  });

  return { url: uploadResult.secure_url };
}

export async function getResumeDataByProjectId(projectId: string) {
  return prisma.project.findUnique({
    where: { id: projectId },
    include: { resumeData: true },
  });
}