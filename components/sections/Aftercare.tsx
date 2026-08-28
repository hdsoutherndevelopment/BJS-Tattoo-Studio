import { Info } from 'lucide-react';
import { aftercare } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

export function Aftercare() {
  return (
    <section className="sec" id="aftercare">
      <div className="shell">
        <div className="care">
          <div>
            <Reveal><SectionLabel>Aftercare</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg" style={{ marginBottom: 26 }}>
              <RevealLines lines={['Look after', <>your <span className="ser">ink</span><Dot /></>]} />
            </h2>
            <Reveal delay={0.16}>
              <p className="lead">
                A tattoo is only half finished when you leave the chair. The first two weeks decide
                how it looks for the next twenty years.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Plate
                motif="heart"
                tone="t3"
                framed
                parallax={0.08}
                artWidth="46%"
                rotate={3}
                caption="Healed work · Six weeks"
                className="care__plate"
                style={{ marginTop: 'clamp(24px,3vw,40px)' }}
              />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="care__list">
              {aftercare.map((a, i) => (
                <li key={a}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <p>{a}</p>
                </li>
              ))}
            </ul>
            <div
              className="demo-note"
              style={{ marginTop: 24, borderStyle: 'solid', borderColor: 'var(--line)', background: 'rgba(242,240,234,.02)' }}
            >
              <Info aria-hidden="true" style={{ stroke: 'var(--red-hot)' }} />
              <p>
                Your artist will provide personalised aftercare instructions after your appointment.
                This page is general guidance only — always follow the advice you&apos;re given in
                studio, and speak to a healthcare professional if you&apos;re worried about how a
                tattoo is healing.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
