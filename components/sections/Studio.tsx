import { Check } from 'lucide-react';
import { studioPoints } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

const plates = [
  { cls: 's1', motif: 'machine', tone: '', art: '34%', rot: 0, cap: 'Station one · Private booth', px: 0.07 },
  { cls: 's2', motif: 'lantern', tone: 't3', art: '34%', rot: -6, cap: 'Waiting area · Flash wall', px: 0.07 },
  { cls: 's3', motif: 'eye', tone: 't2', art: '48%', rot: 0, cap: 'Artwork in progress', px: 0 },
  { cls: 's4', motif: 'anchor', tone: '', art: '48%', rot: 4, cap: 'Sterile equipment', px: 0 },
  { cls: 's5', motif: 'ship', tone: 't5', art: '48%', rot: -4, cap: 'Bridge Road, Southampton', px: 0 }
] as const;

export function Studio() {
  return (
    <section className="sec sec--char" id="studio">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>The space</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Step into', <>the <span className="ser">studio</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <p className="body-c" style={{ maxWidth: '46ch', paddingBottom: 8 }}>
              A proper working studio on Bridge Road — clean, comfortable and set up so you can relax
              through a long session.
            </p>
          </Reveal>
        </div>

        <div className="studio__grid">
          {plates.map((p, i) => (
            <Reveal key={p.cls} delay={i * 0.08} className={p.cls}>
              <Plate
                motif={p.motif}
                tone={p.tone}
                framed
                artWidth={p.art}
                rotate={p.rot}
                caption={p.cap}
                parallax={p.px}
                style={{ height: '100%' }}
              />
            </Reveal>
          ))}

          <div className="studio__txt">
            <Reveal>
              <p className="lead">
                The studio is set up the way we&apos;d want it as clients: single-use needles,
                hospital-grade sterilisation, private stations and enough space that a five-hour
                sitting doesn&apos;t feel like one.
              </p>
              <p className="body-c" style={{ marginTop: 18 }}>
                Bring headphones, bring a friend, bring snacks. There&apos;s no rush and no hard
                sell — if the idea isn&apos;t ready yet, we&apos;ll say so.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="tick">
                {studioPoints.map((s) => (
                  <li key={s}><Check aria-hidden="true" />{s}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
