import Link from 'next/link';
import { Instagram, Facebook, Phone, Info } from 'lucide-react';
import { site } from '@/lib/site';
import { Logo } from './Logo';

const explore = [
  { label: 'Home', href: '#top' },
  { label: 'Artists', href: '#artists' },
  { label: 'Styles', href: '#styles' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Studio', href: '#studio' },
  { label: 'Pricing', href: '#pricing' }
];

const visit = [
  { label: 'Book a consultation', href: '#book' },
  { label: 'Aftercare', href: '#aftercare' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' }
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="demo-note">
          <Info aria-hidden="true" />
          <p>
            <b>Concept demo</b>
            <br />
            This is an unofficial website concept created by HD Southern Development for {site.name},
            using publicly listed business details. Artist profiles, portfolio artwork, reviews and
            pricing shown here are demonstration content and are not verified studio information.
          </p>
        </div>

        <div className="foot__top">
          <div className="foot__brand">
            <Logo />
            <p>
              Custom tattooing, bold ideas and exceptional craftsmanship on Bridge Road,
              Southampton. Black &amp; grey, fine line, traditional, blackwork, neo-traditional and
              fully custom work.
            </p>
            <div className="socials">
              <a href={site.socials.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-cur="">
                <Instagram aria-hidden="true" />
              </a>
              <a href={site.socials.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-cur="">
                <Facebook aria-hidden="true" />
              </a>
              <a href={site.phone.href} aria-label="Call the studio" data-cur="">
                <Phone aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>{explore.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>

          <div>
            <h4>Visit</h4>
            <ul>
              {visit.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              <li><a href={site.phone.href}>{site.phone.display}</a></li>
            </ul>
          </div>

          <div className="foot__hours">
            <h4>Opening hours</h4>
            <div><span>Mon</span><span>Closed</span></div>
            <div><span>Tue – Fri</span><span>9:30 – 18:00</span></div>
            <div><span>Sat</span><span>9:30 – 17:00</span></div>
            <div><span>Sun</span><span>Closed</span></div>
            <p className="mono" style={{ marginTop: 18, lineHeight: 1.7 }}>
              {site.address.street}<br />{site.address.locality}<br />{site.address.postcode}
            </p>
          </div>
        </div>

        <div className="foot__bar">
          <p>&copy; {new Date().getFullYear()} {site.name} · All rights reserved</p>
          <div className="foot__links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <a href="https://hdsoutherndevelopment.com" target="_blank" rel="noopener noreferrer">
              Concept by HD Southern Development
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
