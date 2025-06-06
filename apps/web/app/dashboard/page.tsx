import {
  Plus,
  ExternalLink,
  Code,
  ArrowLeft,
  MoreVertical,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@snapweb/ui/components/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@snapweb/ui/components/avatar';
import { CreateNewProject } from './create-new-project';
import { getAllProjects } from './actions';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@snapweb/ui/components/dropdown-menu';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth');
  }

  const projects = await getAllProjects();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="px-6 py-4 max-w-8xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-1">
                <div className="mt-[3px] w-7 h-7 rounded flex items-center justify-center">
                  <Code className="w-5 h-5" strokeWidth={3} />
                </div>
                <span className="text-foreground/30 text-xl font-[300]">/</span>
                <span className="text-md ml-1 font-[500]">
                  {session.user.name?.split(' ')[0]}&apos;s projects
                </span>
              </div>
            </div>
            <div>
              <Avatar>
                <AvatarImage
                  className="w-8 h-8"
                  src={session.user.image ?? ''}
                />
                <AvatarFallback>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {session.user.name?.split('')[0]}
                    </span>
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {/* <nav className="px-6">
          <div className="flex space-x-8">
            {['overview'].map((item, index) => (
              <button
                key={item}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  index === 0
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav> */}
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 max-w-8xl">
        {projects.length > 0 ? (
          <>
            {/* Search and Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-1">
                {/* <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                  <Input placeholder="search projects..." className="pl-10" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 text-xs rounded border">
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 text-xs rounded border">
                      K
                    </kbd>
                  </div>
                </div> */}
              </div>

              <div className="flex items-center space-x-3">
                {/* <div className="flex items-center border border-gray-700 rounded-md">
                  <Button variant="ghost" className={`px-2 py-1`}>
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className={`px-2 py-1`}>
                    <List className="w-4 h-4" />
                  </Button>
                </div> */}
                <CreateNewProject />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                return (
                  <div
                    key={project.id}
                    className="bg-card text-card-foreground rounded-lg p-6 hover:border-gray-700 transition-colors group"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium text-black bg-foreground mb-[2px]`}
                        >
                          {project.title.split('')[0]}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {project.portfolioURL}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                              aria-label="Open menu"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={project.portfolioURL}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="flex items-center gap-2">
                                  <ExternalLink className="w-4 h-4" />
                                  View Live
                                </span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/projects/${project.id}`}>
                                <span className="flex items-center gap-2">
                                  <Code className="w-4 h-4" />
                                  Open Project
                                </span>
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-32 h-32 mb-8 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">
              No projects yet
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Get started by creating your first portfolio project and showcase
              your work with the community
            </p>

            <div className="flex items-center space-x-4">
              <CreateNewProject />
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
