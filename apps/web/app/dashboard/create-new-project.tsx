'use client';

import { Plus } from 'lucide-react';
import { Button } from '@snapweb/ui/components/button';
import { createNewProject } from './actions';

export function CreateNewProject() {
  return (
    <Button
      onClick={() => {
        createNewProject();
      }}
    >
      <Plus className="w-4 h-4" />
      Create New Project
    </Button>
  );
}
