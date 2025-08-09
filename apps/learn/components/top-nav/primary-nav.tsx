'use client';

import { useEffect, useRef } from 'react';

import { Badge } from '@spike/ui/badge';
import { cn } from '@spike/ui/utils';

type Item = { id: string; label: string; count?: number };

export default function PrimaryNav({
  items = [],
  activeId,
  onChange,
}: {
  items?: Item[];
  activeId?: string;
  onChange?: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current?.querySelector(`[data-id="${activeId}"]`);
    if (el && 'scrollIntoView' in el) {
      (el as HTMLElement).scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  return (
    <nav className="relative">
      <div
        ref={containerRef}
        className="scrollbar-none hide-webkit-scrollbar flex h-11 items-stretch gap-6 overflow-x-auto overflow-y-hidden"
        role="tablist"
        aria-label="Primary"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              data-id={item.id}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange?.(item.id)}
              className={cn(
                'relative h-full whitespace-nowrap text-sm font-medium outline-none',
                'text-foreground/80 hover:text-foreground transition-colors',
              )}
            >
              <span>{item.label}</span>
              {typeof item.count === 'number' ? (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 rounded-full px-2 text-[11px]"
                >
                  {item.count}
                </Badge>
              ) : null}
              <span
                className={cn(
                  'bg-foreground absolute -bottom-px left-0 h-[2px] w-full origin-left rounded transition-transform',
                  isActive ? 'scale-x-100' : 'scale-x-0',
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <style>{`
        .hide-webkit-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and old Edge */
        }
        .hide-webkit-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </nav>
  );
}
