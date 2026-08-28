import { pricing } from '@/lib/site';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

export function Pricing() {
  return (
    <section className="sec" id="pricing">
      <div className="shell">
        <div className="pf__head">
          <div>
            <Reveal><SectionLabel>Guide pricing</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['No surprises', <>no <span className="ser">guesswork</span><Dot /></>]} />
            </h2>
          </div>
          <Reveal delay={0.16}>
            <p className="body-c" style={{ maxWidth: '44ch', paddingBottom: 8 }}>
              Tattooing is priced by time and complexity, not by a menu. These figures are a starting
              point so you know roughly where you stand before you walk in.
            </p>
          </Reveal>
        </div>

        {/* DEMO PRICING — illustrative figures for the concept build only.
            Replace every value in lib/site.ts with confirmed studio rates. */}
        <Reveal>
          <div className="price">
            {pricing.map((p) => (
              <div className="price__i" key={p.tier}>
                <h3>{p.tier}</h3>
                <p className="price__v">{p.from} <em>from</em></p>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="price__note">
            <div>
              <b>Please note — demo pricing</b>
              <p>
                Prices vary depending on artist, design complexity, size and placement. Final pricing
                will be confirmed during consultation. The figures shown on this concept build are
                illustrative examples only and are not verified current studio rates.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
