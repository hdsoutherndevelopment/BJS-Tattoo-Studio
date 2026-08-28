'use client';

import { Instagram } from 'lucide-react';
import { artists } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';
import type { Motif, Tone } from '@/types';
import { usePortfolio } from '@/components/sections/PortfolioContext';

export function Artists() {
  const { setFilter } = usePortfolio();

  return (
    <section className="sec" id="artists">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>The team</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Meet the', <><span className="ser">artists</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <p className="body-c" style={{ maxWidth: '44ch', paddingBottom: 8 }}>
              Three resident artists, each with their own hand. Pick the one whose work speaks to
              you — or tell us your idea and we&apos;ll point you to the right person.
            </p>
          </Reveal>
        </div>

        <div className="artists">
          {artists.map((a, i) => (
            <Reveal as="article" className="artist" delay={i * 0.09} key={a.slug}>
              <div className="artist__media">
                <Plate
                  motif={a.motif as Motif}
                  tone={a.tone as Tone}
                  parallax={0.06}
                  artWidth="68%"
                  style={{ position: 'absolute', inset: 0 }}
                  label={`${a.name} — ${a.styles.join(', ')} tattoo artist`}
                />
                <span className="artist__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <a className="artist__ig" href="#social" data-cur="">
                  <Instagram aria-hidden="true" />
                  {a.instagram}
                </a>
              </div>

              <div className="artist__body">
                <span className="artist__role">{a.role}</span>
                <h3 className="dsp dsp--md">{a.name}</h3>
                <ul className="artist__tags">
                  {a.styles.map((s) => <li key={s}>{s}</li>)}
                </ul>
                <p className="artist__bio">{a.bio}</p>
                <div className="artist__foot">
                  <a
                    className="btn btn--sm"
                    href="#portfolio"
                    data-cur=""
                    onClick={() => setTimeout(() => setFilter(a.filter as never), 320)}
                  >
                    View portfolio
                  </a>
                  <ButtonLink href={`#book?artist=${a.name}`} variant="ghost" small>
                    Book with {a.name}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mono" style={{ marginTop: 26, color: 'rgba(242,240,234,.28)' }}>
          Demo concept — artist names, biographies and handles shown here are placeholder content.
        </p>
      </div>
    </section>
  );
}
