'use client';

import { useSyncExternalStore } from 'react';
import { MapPin } from 'lucide-react';
import { site } from '@/lib/site';
import { formatTime } from '@/lib/utils';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

/* The server has no idea what day it is where the visitor is, so today's row
   is resolved on the client only — null during SSR, which keeps the markup
   identical on both sides and avoids a hydration mismatch. */
const subscribe = () => () => {};
const getDay = () => new Date().getDay();
const getServerDay = () => null;

export function Contact() {
  const today = useSyncExternalStore(subscribe, getDay, getServerDay);

  return (
    <section className="sec" id="contact">
      <div className="shell">
        <div className="contact">
          <div className="contact__block">
            <div>
              <Reveal><SectionLabel>Find us</SectionLabel></Reveal>
              <h2 className="dsp dsp--lg">
                <RevealLines
                  lines={['Bridge Road,', <><span className="ser">Southampton</span><Dot /></>]}
                />
              </h2>
            </div>

            <Reveal delay={0.16}>
              <p className="mono" style={{ margin: '0 0 12px' }}>The studio</p>
              <address className="addr">
                <strong style={{ fontWeight: 'inherit' }}>{site.name}</strong>
                <span>{site.address.street}</span>
                <span>{site.address.locality}</span>
                <span>{site.address.postcode}</span>
                <a href={site.phone.href} className="red" data-cur="" style={{ marginTop: 8 }}>
                  {site.phone.display}
                </a>
              </address>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mono" style={{ margin: '0 0 12px' }}>Opening hours</p>
              <div className="hours">
                {site.hours.map((h) => (
                  <div
                    key={h.day}
                    className={[!h.opens && 'closed', today === h.index && 'today'].filter(Boolean).join(' ')}
                  >
                    <b>{h.day}</b>
                    <span>{h.opens ? `${formatTime(h.opens)} – ${formatTime(h.closes)}` : 'Closed'}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="contact__cta">
                <ButtonLink href={site.address.mapsUrl} variant="solid" external>Get directions</ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghost">Call the studio</ButtonLink>
                <ButtonLink href="#book">Book a consultation</ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div
              className="map"
              role="img"
              aria-label={`Map showing ${site.name} at ${site.address.street}, ${site.address.locality} ${site.address.postcode}`}
            >
              <div className="map__canvas" aria-hidden="true" />
              <div className="map__road" style={{ left: 0, right: 0, top: '52%', height: 16 }} aria-hidden="true" />
              <div className="map__road" style={{ left: 0, right: 0, top: '52%', height: 2, background: 'rgba(179,38,38,.45)' }} aria-hidden="true" />
              <div className="map__road" style={{ left: '28%', top: 0, bottom: 0, width: 9 }} aria-hidden="true" />
              <div className="map__road" style={{ left: '72%', top: 0, bottom: 0, width: 6 }} aria-hidden="true" />
              <div className="map__road" style={{ left: 0, right: 0, top: '20%', height: 5, transform: 'rotate(-4deg)' }} aria-hidden="true" />
              <div className="map__road" style={{ left: 0, right: 0, bottom: '16%', height: 5, transform: 'rotate(3deg)' }} aria-hidden="true" />
              <div className="map__pulse" aria-hidden="true" />
              <div className="map__pin" aria-hidden="true"><MapPin /></div>
              <div className="map__lbl">
                <b>{site.name}</b>
                {site.address.street} · {site.address.postcode}
              </div>
            </div>
            <p className="mono" style={{ marginTop: 14, color: 'rgba(242,240,234,.28)' }}>
              Demo concept — replace with an embedded Google Map or Mapbox view on the live build.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
