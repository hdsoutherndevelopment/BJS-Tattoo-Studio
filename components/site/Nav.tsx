'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { Logo } from './Logo';
import { ButtonLink } from '@/components/ui/Button';

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('#top');
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    nav.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <>
      <header className={`nav${solid ? ' solid' : ''}`}>
        <div className="nav__in">
          <a className="nav__brand" href="#top" aria-label={`${site.name} — home`} data-cur="">
            <Logo />
          </a>

          <nav aria-label="Primary">
            <ul className="nav__list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    className="nav__link"
                    href={item.href}
                    {...(current === item.href ? { 'aria-current': 'true' as const } : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__right">
            <a className="nav__tel" href={site.phone.href} data-cur="">
              <Phone aria-hidden="true" />
              {site.phone.display}
            </a>
            <ButtonLink href="#book" variant="solid" small>
              Book a consultation
            </ButtonLink>
            <button
              className={`burger${open ? ' on' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mmenu"
              onClick={() => setOpen((v) => !v)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div className={`mmenu${open ? ' on' : ''}`} id="mmenu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="mmenu__list">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mmenu__foot">
          <ButtonLink href="#book" variant="solid">Book a consultation</ButtonLink>
          <ButtonLink href={site.phone.href}>Call {site.phone.display}</ButtonLink>
          <p className="mono" style={{ margin: 0 }}>
            {site.address.street} · {site.address.locality} · {site.address.postcode}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {open && !reduced && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 780, pointerEvents: 'none' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
