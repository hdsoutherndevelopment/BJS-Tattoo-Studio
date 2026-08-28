import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Terms',
  description: `Booking terms for ${site.name}, Southampton.`,
  robots: { index: false, follow: true }
};

export default function TermsPage() {
  return (
    <>
      <main className="sec" style={{ paddingTop: 'clamp(120px,14vw,200px)' }}>
        <div className="shell" style={{ maxWidth: 860 }}>
          <p className="lbl">Legal</p>
          <h1 className="dsp dsp--lg" style={{ marginBottom: 32 }}>Terms</h1>

          <div className="body-c" style={{ display: 'grid', gap: 20, maxWidth: '70ch' }}>
            <p><strong style={{ color: 'var(--off)' }}>Concept demo notice.</strong> Placeholder wording produced
              for a website concept by HD Southern Development. Replace with the studio&apos;s own terms before launch.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>Age</h2>
            <p>You must be 18 or over to be tattooed. Photo ID is required, with no exceptions.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>Bookings and deposits</h2>
            <p>A deposit secures your appointment and comes off the final cost of the tattoo. Deposits cover
              the artist&apos;s design time and are non-refundable where an appointment is cancelled at short
              notice. Give reasonable notice and we will move your booking.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>Pricing</h2>
            <p>All prices shown on this website are guides only. Final pricing depends on the artist, design,
              size and placement, and is confirmed at consultation.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>Aftercare</h2>
            <p>Aftercare guidance on this site is general. Your artist gives personalised instructions after
              your appointment, and healing depends on following them.</p>

            <p style={{ marginTop: 24 }}>
              <Link className="link-u" href="/">Back to the studio</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
