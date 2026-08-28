import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'solid' | 'ghost';

interface Common {
  children: ReactNode;
  variant?: Variant;
  small?: boolean;
  full?: boolean;
  className?: string;
}

const classes = (v: Variant, small?: boolean, full?: boolean, className?: string) =>
  cn('btn', v === 'solid' && 'btn--solid', v === 'ghost' && 'btn--ghost', small && 'btn--sm', full && 'btn--full', className);

export function ButtonLink({
  href,
  external,
  ...rest
}: Common & { href: string; external?: boolean }) {
  const { children, variant = 'default', small, full, className } = rest;
  const cls = classes(variant, small, full, className);
  if (external || href.startsWith('http') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={cls}
        data-cur=""
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cur="">
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = 'default',
  small,
  full,
  className,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, small, full, className)} data-cur="" {...rest}>
      {children}
    </button>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
