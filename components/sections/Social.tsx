import { Instagram, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';
import { socialMotifs } from '@/lib/portfolio';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';
import type { Motif, Tone } from '@/types';

const TONES: Tone[] = ['', 't2', 't3', 't4', 't5'];

export function Social() {
  return (
    <section className="sec sec--tight sec--char" id="social">
      <div className="shell">
        <div className="pf__head" style={{ alignItems: 'center' }}>
          <div>
            <Reveal><SectionLabel>Instagram</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Follow', <>the <span className="ser">ink</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <a
              className="btn btn--ghost"
              href={site.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cur=""
            >
              {site.socials.instagram.handle}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal>
          <div className="soc__grid">
            {socialMotifs.map((m, i) => (
              <a
                className="soc__i"
                key={`${m}-${i}`}
                href={site.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View this piece on Instagram"
                data-cur=""
              >
                <Plate
                  motif={m as Motif}
                  tone={TONES[(i + 2) % TONES.length]}
                  artWidth="58%"
                  rotate={(i % 3 - 1) * 4}
                  style={{ position: 'absolute', inset: 0 }}
                />
                <Instagram className="ig" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
