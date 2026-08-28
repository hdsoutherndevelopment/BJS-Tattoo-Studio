'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { site } from '@/lib/site';

/** Mobile-only conversion bar — appears once the hero is behind you. */
export function StickyCta() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`sticky${on ? ' on' : ''}`}>
      <a href={site.phone.href}>
        <Phone aria-hidden="true" />
        Call studio
      </a>
      <a className="p" href="#book">Book a consultation</a>
    </div>
  );
}
