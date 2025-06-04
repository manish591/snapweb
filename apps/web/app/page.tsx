import { ArrowRight, CheckCircle, Code, Zap } from 'lucide-react';
import { Button } from '@snapweb/ui/components/button';

export default function Page() {
  return (
    <div>
      {/* navbar section */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-1">
              <div className="mt-[3px] w-7 h-7 rounded flex items-center justify-center">
                <Code className="w-5 h-5" strokeWidth={3} />
              </div>
              <span className="text-xl font-semibold">snapweb</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a
                href="#features"
                className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                Features
              </a>
              <a
                href="#templates"
                className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                Templates
              </a>
              <a
                href="#pricing"
                className="text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                Pricing
              </a>
              <div className="flex items-center gap-4">
                <Button size="sm" variant="outline">
                  signin
                </Button>
                <Button size="sm">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-foreground/10 text-foreground/80 px-3 py-1 rounded-full text-sm mb-8">
            <Zap className="w-3 h-3 mr-2" />
            Transform your resume into a stunning portfolio
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[500] mb-8 leading-none">
            Stand out with
            <br />
            <span className="font-[800]">a custom-coded</span>
            <br />
            <span className="font-[800]">portfolio today</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Streamline your portfolio creation process. Convert your resume into
            a beautiful, interactive portfolio website and share your work with
            the world effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 mt-8">
            <Button>
              build your portfolio
              <ArrowRight className="w-4 h-4 mt-[2px]" />
            </Button>
            <Button variant="outline">view templates</Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center text-foreground/60">
              <CheckCircle className="w-4 h-4 mr-2" />
              No coding required
            </div>
            <div className="flex items-center text-foreground/60">
              <CheckCircle className="w-4 h-4 mr-2" />
              Free to start
            </div>
            <div className="flex items-center text-foreground/60">
              <CheckCircle className="w-4 h-4 mr-2" />
              Deploy instantly
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
