import { Star } from 'lucide-react';
import { testimonials } from '@/lib/site';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

export function Testimonials() {
  return (
    <section className="sec sec--grey" id="reviews">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>Client words</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['What people', <><span className="ser">say</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <p className="body-c" style={{ maxWidth: '40ch', paddingBottom: 8 }}>
              Demo concept — the reviews below are illustrative placeholder content, ready to be
              swapped for the studio&apos;s real Google reviews.
            </p>
          </Reveal>
        </div>

        <div className="revs">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.09}>
              <figure className="rev">
                <div className="stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>{t.quote}</blockquote>
                <footer>
                  <cite>{t.name}</cite>
                  <span>{t.style}</span>
                </footer>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
