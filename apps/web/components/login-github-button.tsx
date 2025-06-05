'use client';

import { Button } from '@snapweb/ui/components/button';
import { GithubIcon } from '@/components/github-icon';
import { signIn } from 'next-auth/react';

export function LoginGithubButton() {
  return (
    <Button
      variant="outline"
      className="w-full"
      size="sm"
      onClick={() => {
        signIn('github');
      }}
    >
      <GithubIcon />
      Login with github
    </Button>
  );
}
