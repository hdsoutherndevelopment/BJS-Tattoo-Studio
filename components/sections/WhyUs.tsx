import { Star, PenTool, ShieldCheck, ZoomIn, MessageSquare } from 'lucide-react';
import { whyUs } from '@/lib/site';
import { Reveal } from '@/components/site/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const icons = {
  star: Star, pen: PenTool, shield: ShieldCheck, zoom: ZoomIn, chat: MessageSquare
} as const;

export function WhyUs() {
  return (
    <section className="sec sec--tight" id="why">
      <div className="shell">
        <Reveal><SectionLabel>Why BJ&apos;s</SectionLabel></Reveal>
        <Reveal delay={0.08}>
          <h2 className="dsp dsp--md" style={{ marginBottom: 'clamp(28px,3.2vw,46px)' }}>
            Five reasons people keep coming back.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="why">
            {whyUs.map((w) => {
              const Icon = icons[w.icon as keyof typeof icons];
              return (
                <div className="why__i" key={w.title}>
                  <Icon className="ico" aria-hidden="true" />
                  <h3>{w.title}</h3>
                  <p>{w.copy}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
