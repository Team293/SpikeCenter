'use client';

import { Button } from '@spike/ui/button';
import { Wand2 } from 'lucide-react';

export default function AskAIButton() {
  return (
    <Button
      variant="outline"
      size="default"
      className="gap-2 rounded-full border-violet-200 pr-3 pl-2 transition-colors hover:border-violet-300 hover:bg-violet-50"
      onClick={() =>
        //todo ask AI
        {}
      }
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
        <Wand2 className="h-3.5 w-3.5" />
      </span>
      {'Ask AI'}
    </Button>
  );
}
