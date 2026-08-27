import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { baseMetadata } from '@/lib/metadata';
import { localBusinessSchema } from '@/lib/schema';
import { FlashSprite } from '@/components/site/FlashSprite';
import { Cursor } from '@/components/site/Cursor';
import { SmoothAnchors } from '@/components/site/SmoothAnchors';
import './globals.css';

/* Self-hosted (SIL OFL) so there is no third-party font request at runtime and
   no network dependency at build time. See app/fonts/LICENSE.md. */
const anton = localFont({
  src: [{ path: './fonts/anton-latin-400-normal.woff2', weight: '400', style: 'normal' }],
  variable: '--font-anton',
  display: 'swap',
  fallback: ['Arial Narrow', 'Impact', 'sans-serif'],
  adjustFontFallback: false
});

const cond = localFont({
  src: [
    { path: './fonts/barlow-condensed-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-condensed-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/barlow-condensed-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/barlow-condensed-latin-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-cond',
  display: 'swap',
  fallback: ['Arial Narrow', 'sans-serif'],
  adjustFontFallback: false
});

const body = localFont({
  src: [
    { path: './fonts/barlow-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fonts/barlow-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/barlow-latin-600-normal.woff2', weight: '600', style: 'normal' }
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: false
});

const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' }
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: false
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${anton.variable} ${cond.variable} ${body.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <div className="grain" aria-hidden="true" />
        <div className="vig" aria-hidden="true" />
        <FlashSprite />
        <Cursor />
        <SmoothAnchors />
        {children}
      </body>
    </html>
  );
}
