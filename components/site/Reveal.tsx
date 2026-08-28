'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/** Scroll-triggered fade + rise, used for every block on the page. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/**
 * Masked line-by-line heading reveal.
 *
 * The observer sits on the wrapper rather than the masked lines: a line that
 * starts translated fully outside its `overflow:hidden` parent has an empty
 * intersection rect, so watching it directly would never fire.
 */
export function RevealLines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {lines.map((line, i) => (
        <span className="split" key={i}>
          <motion.span
            initial={reduced ? false : { y: '105%' }}
            animate={reduced ? undefined : { y: inView ? 0 : '105%' }}
            transition={{ duration: 1.05, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block' }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
