'use client';

import { useEffect } from 'react';

/** Two-part cursor: a hard dot and a lagging ring that swells over targets. */
export function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cur';
    ring.className = 'cur-r';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);

    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement)?.closest?.(
        'a,button,[data-cur],.pf__item,.style,.soc__i,input,select,textarea,label'
      );
      document.body.classList.toggle('cur-lg', Boolean(hit));
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      dot.remove();
      ring.remove();
      document.body.classList.remove('cur-lg');
    };
  }, []);

  return null;
}
