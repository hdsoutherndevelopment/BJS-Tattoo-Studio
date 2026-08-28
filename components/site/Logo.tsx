import { cn } from '@/lib/utils';

/** Horizontal lockup, drawn from the sprite so it inherits the page palette. */
export function Logo({ className, title = "BJ's Tattoo Studio" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 261.7 112" className={cn(className)} role="img" aria-label={title}>
      <use href="#logo-h" />
    </svg>
  );
}
