import Link from 'next/link';
import { Code } from 'lucide-react';
import { AuthForm } from '@/components/auth-form';

export default function Auth() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="#"
          className="flex items-center gap-1 self-center font-medium"
        >
          <div className="mt-[3px] w-7 h-7 rounded flex items-center justify-center">
            <Code className="w-5 h-5" strokeWidth={3} />
          </div>
          snapweb
        </Link>
        <AuthForm />
      </div>
    </div>
  );
}
