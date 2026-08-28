'use client';

import { styles } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';
import { Arrow } from '@/components/ui/Button';
import type { Motif, Tone, PortfolioFilter } from '@/types';
import { usePortfolio } from '@/components/sections/PortfolioContext';

export function Styles() {
  const { setFilter } = usePortfolio();

  return (
    <section className="sec sec--char" id="styles">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>What we do</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Find your', <><span className="ser">style</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <p className="body-c" style={{ maxWidth: '44ch', paddingBottom: 8 }}>
              Not sure what you&apos;re after? Start here — then bring the idea to a consultation and
              we&apos;ll shape it around you.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="styles">
            {styles.map((s) => (
              <article className="style" key={s.n} data-cur="">
                <Plate
                  motif={s.motif as Motif}
                  tone={s.tone as Tone}
                  artWidth="52%"
                  style={{ position: 'absolute', inset: 0 }}
                />
                <span className="style__n">{s.n}</span>
                <h3 className="dsp dsp--sm">{s.name}</h3>
                <p>{s.copy}</p>
                <a
                  className="style__go"
                  href="#portfolio"
                  onClick={() => setTimeout(() => setFilter(s.filter as PortfolioFilter), 320)}
                >
                  See the work <Arrow />
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
