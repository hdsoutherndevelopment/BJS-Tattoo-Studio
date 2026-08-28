import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { StickyCta } from '@/components/site/StickyCta';
import { PortfolioProvider } from '@/components/sections/PortfolioContext';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Artists } from '@/components/sections/Artists';
import { Styles } from '@/components/sections/Styles';
import { Portfolio } from '@/components/sections/Portfolio';
import { Booking } from '@/components/sections/Booking';
import { Pricing } from '@/components/sections/Pricing';
import { Studio } from '@/components/sections/Studio';
import { WhyUs } from '@/components/sections/WhyUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { Aftercare } from '@/components/sections/Aftercare';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { Social } from '@/components/sections/Social';

export default function HomePage() {
  return (
    <PortfolioProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Artists />
        <Styles />
        <Portfolio />
        <Booking />
        <Pricing />
        <Studio />
        <WhyUs />
        <Testimonials />
        <Aftercare />
        <Faq />
        <Contact />
        <Social />
      </main>
      <Footer />
      <StickyCta />
    </PortfolioProvider>
  );
}
