import { Info } from 'lucide-react';
import { bookingSteps } from '@/lib/site';
import { Plate } from '@/components/site/Plate';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';
import { BookingForm } from '@/components/forms/BookingForm';

export function Booking() {
  return (
    <section className="sec book sec--char" id="book">
      <div className="book__bg" aria-hidden="true">
        <Plate
          motif="heart"
          flat
          parallax={0.12}
          artWidth="min(60vh,34%)"
          rotate={6}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <div className="shell">
        <div className="book__grid">
          <div className="book__aside">
            <Reveal><SectionLabel>Enquire</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Ready to get', <><span className="ser">inked?</span></>]} />
            </h2>
            <Reveal delay={0.16}>
              <p className="lead">Tell us what you&apos;re thinking and we&apos;ll help you take the next step.</p>
            </Reveal>

            <Reveal delay={0.24}>
              <ol className="book__steps">
                {bookingSteps.map((s) => (
                  <li key={s.n}>
                    <b>{s.n}</b>
                    <div>
                      <span>{s.title}</span>
                      <p>{s.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="demo-note" style={{ margin: 0 }}>
                <Info aria-hidden="true" />
                <p>
                  <b>Demo build</b>
                  <br />
                  This form validates properly and shows real loading, success and error states.
                  With Supabase and Resend keys in place it stores the enquiry and emails the
                  studio; without them it runs in demo mode and sends nothing.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
