'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { pieces, filters } from '@/lib/portfolio';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';
import { usePortfolio } from './PortfolioContext';

export function Portfolio() {
  const { filter, setFilter, setPrefill } = usePortfolio();
  const gridRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const visible = pieces
    .map((p, i) => ({ ...p, index: i }))
    .filter((p) => filter === 'all' || p.cat === filter);

  /* Masonry: turn each tile's aspect ratio into a grid row span so the columns
     stay flush rather than ending ragged. */
  const layout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cs = getComputedStyle(grid);
    const cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    const gap = parseFloat(cs.columnGap) || 16;
    const unit = parseFloat(cs.gridAutoRows) || 4;
    const colW = (grid.clientWidth - gap * (cols - 1)) / cols;
    grid.querySelectorAll<HTMLElement>('.pf__item').forEach((el) => {
      const ar = parseFloat(el.dataset.ar || '0.75');
      el.style.gridRowEnd = `span ${Math.max(1, Math.ceil((colW / ar + gap) / unit))}`;
    });
  }, []);

  useLayoutEffect(layout, [layout, filter]);
  useEffect(() => {
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});
    return () => window.removeEventListener('resize', layout);
  }, [layout]);

  const step = useCallback(
    (d: number) => {
      setOpen((cur) => {
        if (cur === null) return cur;
        const pos = visible.findIndex((p) => p.index === cur);
        const next = (pos + d + visible.length) % visible.length;
        return visible[next].index;
      });
    },
    [visible]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  const active = open === null ? null : pieces[open];
  const activePos = open === null ? 0 : visible.findIndex((p) => p.index === open) + 1;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="sec" id="portfolio">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>Selected work</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['The', <><span className="ser">portfolio</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <div className="pf__filters" role="group" aria-label="Filter portfolio by style">
              {filters.map((f) => (
                <button
                  className="chip"
                  key={f.value}
                  aria-pressed={filter === f.value}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="pf__grid" ref={gridRef}>
          {visible.map((p, i) => (
            <button
              key={`${p.title}-${p.index}`}
              type="button"
              className="pf__item"
              data-ar={p.ar}
              style={{ animationDelay: `${i * 0.035}s` }}
              aria-label={`${p.title} — ${p.style} by ${p.artist}. Open in viewer.`}
              onClick={() => setOpen(p.index)}
            >
              <Plate
                motif={p.motif}
                tone={p.tone}
                photo={p.photo}
                framed
                artWidth="62%"
                rotate={p.rot}
                style={{ aspectRatio: String(p.ar) }}
                label={`${p.title}, ${p.style.toLowerCase()} tattoo design`}
              />
              <span className="pf__ov" aria-hidden="true">
                <em>{p.style}</em>
                <b>{p.title}</b>
                <i>
                  {p.artist}
                  <span style={{ width: 4, height: 4, background: 'currentColor', transform: 'rotate(45deg)', display: 'inline-block' }} />
                  View project
                </i>
              </span>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="pf__empty">No pieces in that category yet — try another filter.</p>
        )}

        <div className="pf__more">
          <ButtonLink href="#book">Start your piece <Arrow /></ButtonLink>
        </div>
        <p className="mono" style={{ marginTop: 22, color: 'rgba(242,240,234,.28)', textAlign: 'center' }}>
          Demo concept — portfolio pieces are original placeholder artwork, ready to be replaced
          with the studio&apos;s own photography.
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lb on"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="lb__bar">
              <div>
                <p className="mono" style={{ margin: '0 0 3px' }}>
                  {pad(activePos)} / {pad(visible.length)}
                </p>
                <p className="dsp dsp--sm" style={{ margin: 0 }}>{active.title}</p>
              </div>
              <button className="lb__x" aria-label="Close viewer" onClick={() => setOpen(null)} autoFocus>
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="lb__fig" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
              <button className="lb__nav lb__nav--p" aria-label="Previous piece" onClick={() => step(-1)}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <motion.div
                key={active.title + activePos}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lb__stage"
              >
                <Plate
                  motif={active.motif}
                  tone={active.tone}
                  photo={active.photo}
                  framed
                  artWidth="58%"
                  rotate={active.rot}
                  style={{ position: 'absolute', inset: 0 }}
                  label={`${active.title}, ${active.style.toLowerCase()} tattoo design`}
                />
              </motion.div>
              <button className="lb__nav lb__nav--n" aria-label="Next piece" onClick={() => step(1)}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>

            <div className="lb__foot">
              <p className="mono" style={{ margin: 0 }}>{active.artist} · {active.style}</p>
              <a
                className="btn btn--solid btn--sm"
                href="#book"
                onClick={() => {
                  setOpen(null);
                  setPrefill({ artist: active.artist, style: active.style });
                }}
              >
                Enquire about {active.style.toLowerCase()}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
