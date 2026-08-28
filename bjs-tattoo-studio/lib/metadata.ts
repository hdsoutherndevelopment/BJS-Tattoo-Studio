import type { Metadata } from 'next';
import { site } from './site';

const title = "BJ's Tattoo Studio | Custom Tattoo Studio in Southampton";
const description =
  "BJ's Tattoo Studio — custom tattooing in Southampton. Black & grey, fine line, traditional, blackwork and neo-traditional work by experienced artists on Bridge Road, SO19. Book a consultation.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  keywords: [
    'Southampton tattoo studio', 'tattoo artist Southampton', 'tattoo shop Southampton',
    'custom tattoos Southampton', 'black and grey tattoos Southampton',
    'fine line tattoos Southampton', 'blackwork tattoo Southampton',
    'neo-traditional tattoo Southampton', 'cover up tattoo Southampton',
    'tattoo Bridge Road Woolston', 'tattoo studio SO19'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${site.name}, Southampton` }]
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
  other: { 'geo.region': 'GB-STH', 'geo.placename': 'Southampton' }
};
