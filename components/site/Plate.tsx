'use client';

import { useEffect, useRef } from 'react';
import type { Motif, Tone } from '@/types';
import { cn } from '@/lib/utils';

interface PlateProps {
  motif?: Motif;
  tone?: Tone;
  /** Optional photograph layered over the artwork ground. */
  photo?: string;
  photoPosition?: string;
  /** Artwork width as a percentage of the plate. */
  artWidth?: string;
  rotate?: number;
  ghost?: boolean;
  framed?: boolean;
  flat?: boolean;
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Parallax strength; 0 disables. */
  parallax?: number;
  label?: string;
}

/**
 * The site's art-directed image slot. Renders original flash artwork over a
 * procedural dark ground, with an optional photograph layered on top — so the
 * layout is complete before the studio's photography arrives and stays intact
 * if an image ever fails to load.
 */
export function Plate({
  motif,
  tone = '',
  photo,
  photoPosition,
  artWidth = '62%',
  rotate = 0,
  ghost = false,
  framed = false,
  flat = false,
  caption,
  className,
  style,
  parallax = 0,
  label
}: PlateProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!parallax || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 860px)').matches) return;

    const el = ref.current;
    let ticking = false;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom > -200 && r.top < vh + 200) {
        const off = (r.top + r.height / 2 - vh / 2) * parallax;
        el.style.setProperty('--py', `${(-off).toFixed(1)}px`);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [parallax]);

  return (
    <figure
      ref={ref}
      className={cn('plate', framed && 'plate--frame', flat && 'plate--flat', tone && `plate--${tone}`, className)}
      style={{
        ...style,
        ...(photo ? ({ ['--photo' as string]: `url(${photo})` } as React.CSSProperties) : null),
        ...(photoPosition ? ({ ['--photo-pos' as string]: photoPosition } as React.CSSProperties) : null)
      }}
    >
      <div className="plate__photo" />
      {motif && (
        <div
          className="plate__art"
          style={{ ['--art-w' as string]: artWidth, ['--art-rot' as string]: `${rotate}deg` } as React.CSSProperties}
        >
          <svg viewBox="0 0 200 260" role={label ? 'img' : 'presentation'} aria-label={label || undefined}>
            <use href={`#fl-${motif}`} />
          </svg>
          {ghost && (
            <svg viewBox="0 0 200 260" className="ghost" aria-hidden="true">
              <use href={`#fl-${motif}`} />
            </svg>
          )}
        </div>
      )}
      {caption && <figcaption className="plate__cap">{caption}</figcaption>}
    </figure>
  );
}
