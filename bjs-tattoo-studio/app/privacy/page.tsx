import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Footer } from '@/components/site/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} handles the information you send through this website.`,
  robots: { index: false, follow: true }
};

export default function PrivacyPage() {
  return (
    <>
      <main className="sec" style={{ paddingTop: 'clamp(120px,14vw,200px)' }}>
        <div className="shell" style={{ maxWidth: 860 }}>
          <p className="lbl">Legal</p>
          <h1 className="dsp dsp--lg" style={{ marginBottom: 32 }}>Privacy Policy</h1>

          <div className="body-c" style={{ display: 'grid', gap: 20, maxWidth: '70ch' }}>
            <p><strong style={{ color: 'var(--off)' }}>Concept demo notice.</strong> This page is part of an
              unofficial website concept produced by HD Southern Development. It is placeholder wording and
              must be reviewed and replaced with the studio&apos;s own policy before the site goes live.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>What we collect</h2>
            <p>When you send a booking enquiry we collect the name, email address, phone number and the details
              of the tattoo idea you choose to give us. We do not collect anything else, and the form does not
              ask for payment details.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>How we use it</h2>
            <p>Enquiry details are used only to reply to you, arrange a consultation and manage your booking.
              We do not sell your information or use it for marketing without your consent.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>How long we keep it</h2>
            <p>Enquiries are kept for as long as needed to deal with your booking and any follow-up work, and
              then deleted.</p>

            <h2 className="dsp dsp--sm" style={{ marginTop: 12 }}>Your rights</h2>
            <p>You can ask us for a copy of the information we hold about you, ask for it to be corrected, or
              ask us to delete it. Contact the studio on {site.phone.display} or call in during opening hours.</p>

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
