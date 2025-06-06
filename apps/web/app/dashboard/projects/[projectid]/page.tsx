'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Upload,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Code,
} from 'lucide-react';
import { Button } from '@snapweb/ui/components/button';
import { Input } from '@snapweb/ui/components/input';
import { Label } from '@snapweb/ui/components/label';
import { Textarea } from '@snapweb/ui/components/textarea';
import { Separator } from '@snapweb/ui/components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
} from '@snapweb/ui/components/sidebar';
import { uploadResume, getResumeDataByProjectId } from '../../actions'; // adjust path as needed
import { useRouter } from 'next/navigation';
import { Portfoli } from '@/components/portfolio';

export default function Projects({
  params,
}: {
  params: { projectid: string };
}) {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchResume() {
      setLoading(true);
      const project = await getResumeDataByProjectId(params.projectid);
      setResumeData(project?.resumeData ?? null);
      setLoading(false);
    }
    fetchResume();
  }, [params.projectid]);

  // If loading, you can show a spinner or skeleton
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  // Helper to determine if fields should be readonly/disabled
  const isResumeAvailable = !!resumeData;

  // Helper to get value or empty string
  const getValue = (field: string) => resumeData?.[field] ?? '';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar
          className="w-[220px]"
          style={
            {
              '--sidebar-width': '220px',
            } as React.CSSProperties
          }
        >
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-1">
              <div className="mt-[3px] w-7 h-7 rounded flex items-center justify-center">
                <Code className="w-5 h-5" strokeWidth={3} />
              </div>
              <span className="text-xl font-semibold">snapweb</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4 space-y-6">
            {/* Upload Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Resume
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={async (e) => {
                      if (!isResumeAvailable) {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('file', file);
                          await uploadResume(formData, params.projectid);
                          router.refresh();
                        }
                      }
                    }}
                    className="text-xs"
                    disabled={isResumeAvailable}
                  />
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Personal Information */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Info
              </SidebarGroupLabel>
              <SidebarGroupContent className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={getValue('name')}
                    readOnly
                    disabled={!isResumeAvailable}
                    placeholder="John Doe"
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={getValue('email')}
                    readOnly
                    disabled={!isResumeAvailable}
                    placeholder="john@example.com"
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={getValue('phone')}
                    readOnly
                    disabled={!isResumeAvailable}
                    placeholder="+1 (555) 123-4567"
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-xs">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={getValue('address')}
                    readOnly
                    disabled={!isResumeAvailable}
                    placeholder="City, State"
                    className="h-8 text-xs"
                  />
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Professional Summary */}
            <SidebarGroup>
              <SidebarGroupLabel>Summary</SidebarGroupLabel>
              <SidebarGroupContent>
                <Textarea
                  value={getValue('about')}
                  readOnly
                  disabled={!isResumeAvailable}
                  placeholder="Brief professional summary..."
                  className="min-h-[60px] text-xs resize-none"
                />
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Education */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Textarea
                  value={getValue('education')}
                  readOnly
                  disabled={!isResumeAvailable}
                  placeholder="Degree, University, Year..."
                  className="min-h-[60px] text-xs resize-none"
                />
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Experience */}
            <SidebarGroup>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experience
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Textarea
                  value={getValue('experience')}
                  readOnly
                  disabled={!isResumeAvailable}
                  placeholder="Job title, Company, Duration..."
                  className="min-h-[80px] text-xs resize-none"
                />
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator />

            {/* Skills */}
            <SidebarGroup>
              <SidebarGroupLabel>Skills</SidebarGroupLabel>
              <SidebarGroupContent>
                <Textarea
                  value={getValue('skills')}
                  readOnly
                  disabled={!isResumeAvailable}
                  placeholder="List your key skills..."
                  className="min-h-[60px] text-xs resize-none"
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          {/* Main Content Area */}
          <main className="flex-1 p-6">
            <div className="h-full w-full border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Portfoli data={resumeData} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
