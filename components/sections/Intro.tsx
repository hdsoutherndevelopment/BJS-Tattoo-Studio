import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

export function Intro() {
  return (
    <section className="sec sec--char" id="intro">
      <div className="shell">
        <div className="intro__grid">
          <div>
            <Reveal><SectionLabel>Who we are</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg intro__q">
              <RevealLines
                lines={[
                  <>Your idea<Dot /></>,
                  <>Our <span className="ser">craft</span><Dot /></>
                ]}
              />
            </h2>

            <Reveal delay={0.16}>
              <p className="lead">
                Every tattoo should mean something. Whether you arrive with a fully formed idea or
                nothing more than a rough sketch, our artists work with you to create something
                personal, considered and built to last.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="body-c" style={{ marginTop: 22 }}>
                We&apos;ve been tattooing on Bridge Road for years — long enough to know that the best
                pieces come out of a proper conversation, not a rushed decision. Three artists, three
                distinct styles, one standard of work.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="intro__stats">
                <div><b>3</b><span>Resident artists</span></div>
                <div><b>6</b><span>Core styles</span></div>
                <div><b>5</b><span>Days a week</span></div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div style={{ marginTop: 'clamp(28px,3vw,42px)' }}>
                <ButtonLink href="#artists">Meet the artists <Arrow /></ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <Plate
              motif="rose"
              tone="t3"
              framed
              parallax={0.1}
              artWidth="74%"
              rotate={-4}
              caption="Custom linework · Studio archive"
              className="intro__plate"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
