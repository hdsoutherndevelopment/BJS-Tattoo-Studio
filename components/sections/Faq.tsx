'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs, site } from '@/lib/site';
import { Reveal, RevealLines } from '@/components/site/Reveal';
import { SectionLabel, Dot } from '@/components/ui/SectionLabel';

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="sec sec--char" id="faqs">
      <div className="shell">
        <div className="faq">
          <div>
            <Reveal><SectionLabel>Questions</SectionLabel></Reveal>
            <h2 className="dsp dsp--lg">
              <RevealLines lines={['Good to', <><span className="ser">know</span><Dot /></>]} />
            </h2>
            <Reveal delay={0.16}>
              <p className="body-c" style={{ marginTop: 20 }}>
                Can&apos;t see your question? Call the studio on{' '}
                <a className="link-u" href={site.phone.href} style={{ fontSize: '.8rem' }}>
                  {site.phone.display}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="faq__list">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div className={`faq__i${isOpen ? ' on' : ''}`} key={f.q}>
                    <h3 style={{ margin: 0 }}>
                      <button
                        className="faq__q"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        {f.q}
                        <i aria-hidden="true" />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq__a"
                          style={{ height: 'auto' }}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div><p>{f.a}</p></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
