import {
  Search,
  Grid3X3,
  List,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Settings,
  Eye,
  Trash2,
  Code,
  ArrowLeft,
  Github,
} from 'lucide-react';
import { auth } from '@/auth';
import { Button } from '@snapweb/ui/components/button';
import { Input } from '@snapweb/ui/components/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@snapweb/ui/components/dropdown-menu';
import { redirect } from 'next/navigation';

const projects = [
  {
    id: 1,
    name: 'buildingpublic',
    url: 'build-eight.vercel.app',
    repo: 'manish591/buildingpublic',
    lastCommit: 'fix casing issue',
    commitDate: 'May 27',
    branch: 'main',
    avatar: 'B',
    avatarColor: 'bg-yellow-500',
    status: 'deployed',
  },
  {
    id: 2,
    name: 'portfolio',
    url: 'portfolio-psi-khaki-27.vercel.app',
    repo: 'manish591/portfolio',
    lastCommit: 'responsive',
    commitDate: 'May 23',
    branch: 'main',
    avatar: 'P',
    avatarColor: 'bg-blue-500',
    status: 'deployed',
  },
  {
    id: 3,
    name: 'ghlon',
    url: 'ghlon.vercel.app',
    repo: 'manish591/ghlon',
    lastCommit: 'new',
    commitDate: 'Mar 4',
    branch: 'main',
    avatar: '▲',
    avatarColor: 'bg-white text-black',
    status: 'deployed',
  },
  {
    id: 4,
    name: 'anon-chat-web',
    url: 'anon-chat-web.vercel.app',
    repo: 'manish591/anon-chat-web',
    lastCommit: 'updated api endpoint',
    commitDate: '12/19/24',
    branch: 'main',
    avatar: 'ac',
    avatarColor: 'bg-gray-600',
    status: 'deployed',
  },
  {
    id: 5,
    name: 'job-board-ui',
    url: 'job-board-ui-psi.vercel.app',
    repo: 'manish591/job-board-ui',
    lastCommit: 'updated sidebar width',
    commitDate: '6/28/24',
    branch: 'main',
    avatar: 'a',
    avatarColor: 'bg-red-500',
    status: 'error',
  },
];

// projects = [];

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth');
  }

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
                <span className="text-md font-semibold ml-1">
                  manish591&apos;s projects
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-sm font-medium">M</span>
              </div>
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
                <div className="relative flex-1 max-w-md">
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
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-700 rounded-md">
                  <Button variant="ghost" className={`px-2 py-1`}>
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className={`px-2 py-1`}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200">
                  create new project
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
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
                        {project.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-400">{project.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                          >
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                            <Eye className="w-4 h-4 mr-2" />
                            View Project
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                            <Settings className="w-4 h-4 mr-2" />
                            Project Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-800">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {/* Repository Link */}
                  <div className="flex items-center space-x-2 mb-3">
                    <p className="text-foreground/60 text-sm">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Inventore ipsa, explicabo blanditiis facere dolorum animi.
                    </p>
                  </div>
                </div>
              ))}
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
              <Button>
                <Plus className="w-4 h-4" />
                Create New Project
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                home
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
