import {
  ArrowDown,
  Code,
  Github,
  Mail,
  Linkedin,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@snapweb/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@snapweb/ui/components/card';

interface SkillCardProps {
  skill: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => (
  <div className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center mb-6">
      <Code className="w-8 h-8 text-primary mr-3" />
      <h3 className="text-xl font-semibold">{skill}</h3>
    </div>
  </div>
);

export function Portfoli({ data }: { data?: any }) {
  // Use data if provided, otherwise fallback to defaults
  const name = data?.name || 'Alex Chen';
  const about =
    data?.about ||
    'Full-Stack Developer crafting beautiful digital experiences with modern technologies';
  const summary =
    data?.summary ||
    "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful designs.";
  const skills = data?.skills || [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Next.js',
    'Vue.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'REST APIs',
    'Git',
    'Docker',
    'AWS',
    'Figma',
    'Linux',
  ];
  const education = data?.education || [
    {
      degree: 'B.Tech Computer Science',
      university: 'ABC University',
      year: '2020',
    },
  ];
  const experience = data?.experience || [
    {
      title: 'Software Engineer',
      company: 'Tech Corp',
      duration: '2020-2024',
    },
  ];
  const projects = data?.projects || [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: '#',
      live: '#',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates, team workspaces, and progress tracking built with modern web technologies.',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
      github: '#',
      live: '#',
    },
    {
      title: 'Weather Dashboard',
      description:
        'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics using external APIs.',
      tech: ['Vue.js', 'Express', 'MongoDB', 'Chart.js'],
      github: '#',
      live: '#',
    },
  ];
  const socialLinks = data?.socialLinks || [
    {
      name: 'Email',
      icon: Mail,
      href: data?.email
        ? `mailto:${data.email}`
        : 'mailto:alex.chen@example.com',
      label: data?.email || 'alex.chen@example.com',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: data?.github || 'https://github.com/alexchen',
      label: data?.github || 'github.com/alexchen',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: data?.linkedin || 'https://linkedin.com/in/alexchen',
      label: data?.linkedin || 'linkedin.com/in/alexchen',
    },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              {name.split(' ')[0]}{' '}
              <span className="text-primary">{name.split(' ')[1] || ''}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {about}
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="hover:scale-105 transition-transform"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="hover:scale-105 transition-transform"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown
            className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {summary}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, or
                  enjoying a good cup of coffee while reading about the latest
                  in tech.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Problem Solver', 'Team Player', 'Continuous Learner'].map(
                    (trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-secondary rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary/20 to-secondary rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                    AC
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {skills.map((skill: string, index: number) => (
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map(
              (
                project: {
                  title: string;
                  description: string;
                  tech: string[];
                  github: string;
                  live: string;
                },
                index: number,
              ) => (
                <Card
                  key={project.title}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Live
                    </Button>
                  </CardFooter>
                </Card>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-secondary/20 to-background"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's connect and discuss how we can bring your ideas to life.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {socialLinks.map(
                (link: {
                  name: string;
                  icon: React.ComponentType<{ className?: string }>;
                  href: string;
                  label: string;
                }) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group p-6 bg-background rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <link.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold mb-2">{link.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {link.label}
                    </p>
                  </a>
                ),
              )}
            </div>

            <Button size="lg" className="hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 mr-2" />
              Start a Conversation
            </Button>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2024 Alex Chen. Built with React & Tailwind CSS.</p>
        </footer>
      </section>
    </div>
  );
}
