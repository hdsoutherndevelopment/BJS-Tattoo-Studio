import { site } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { ButtonLink, Arrow } from '@/components/ui/Button';
import { Dot } from '@/components/ui/SectionLabel';

const ticker = [
  site.address.locality, `Est. ${site.established}`, 'Custom Tattooing',
  '59 Bridge Road', 'Walk-ins Welcome', 'Black & Grey', 'Fine Line', 'Neo-Traditional'
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <Plate
          motif="dagger"
          ghost
          parallax={0.16}
          artWidth="min(74vh,42%)"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__ticker" aria-hidden="true">
        <div className="marq">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="hero__in">
        <h1 className="dsp hero__h1">
          <RevealLines
            lines={[
              'Ink with',
              <>
                <span className="ser red">attitude</span>
                <Dot />
              </>
            ]}
          />
        </h1>

        <Reveal delay={0.24}>
          <p className="hero__sub">{site.tagline}</p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="hero__cta">
            <ButtonLink href="#book" variant="solid">
              Book a consultation <Arrow />
            </ButtonLink>
            <ButtonLink href="#portfolio" variant="ghost">View our work</ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="hero__meta">
            <div>
              <b>Studio</b>
              <p>{site.address.street}, {site.address.locality} {site.address.postcode}</p>
            </div>
            <div>
              <b>Open</b>
              <p>Tue – Fri 9:30–6:00 · Sat 9:30–5:00</p>
            </div>
            <div>
              <b>Call</b>
              <p><a href={site.phone.href} data-cur="">{site.phone.display}</a></p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="scroller" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
