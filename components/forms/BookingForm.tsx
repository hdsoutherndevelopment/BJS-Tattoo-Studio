'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, AlertCircle, Upload } from 'lucide-react';
import { artists, styles } from '@/lib/site';
import { Button, Arrow } from '@/components/ui/Button';
import { usePortfolio } from '@/components/sections/PortfolioContext';

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'idea', string>>;
type State = 'idle' | 'sending' | 'ok' | 'error';

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phoneRe = /^[+()\d\s-]{9,18}$/;

export function BookingForm() {
  const { prefill } = usePortfolio();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const [fileLabel, setFileLabel] = useState('Upload inspiration or reference images — optional');
  const [over, setOver] = useState(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    if (prefill.artist) (form.elements.namedItem('artist') as HTMLSelectElement).value = prefill.artist;
    if (prefill.style) {
      const select = form.elements.namedItem('style') as HTMLSelectElement;
      const match = Array.from(select.options).find(
        (o) => o.value.toLowerCase() === prefill.style!.toLowerCase()
      );
      if (match) select.value = match.value;
    }
  }, [prefill]);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const idea = String(data.get('idea') || '').trim();

    if (name.length < 2) next.name = 'Please tell us your name';
    if (!emailRe.test(email)) next.email = 'Please enter a valid email address';
    if (phone && !phoneRe.test(phone)) next.phone = 'Please enter a valid UK phone number';
    if (idea.length < 20) next.idea = 'Tell us a little about the idea — 20 characters or more';
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Honeypot — accept silently and discard. */
    if (String(data.get('company') || '')) {
      setState('ok');
      setMessage('Thanks — we will be in touch shortly.');
      form.reset();
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setState('error');
      const count = Object.keys(found).length;
      setMessage(count === 1 ? 'One field still needs attention.' : `${count} fields still need attention.`);
      const first = form.querySelector<HTMLElement>('.f.err input, .f.err textarea');
      first?.focus();
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setState('sending');
    try {
      const payload = Object.fromEntries(
        Array.from(data.entries()).filter(([k]) => k !== 'files').map(([k, v]) => [k, String(v)])
      );
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = (await res.json()) as { ok: boolean; demo?: boolean; message?: string };

      if (!res.ok || !json.ok) throw new Error(json.message || 'Something went wrong');

      const first = String(data.get('name') || '').trim().split(/\s+/)[0] || 'there';
      setState('ok');
      setMessage(
        json.demo
          ? `Thanks ${first} — in the live build this enquiry would land in the studio inbox and we'd reply within one working day. Nothing has been sent from this demo.`
          : `Thanks ${first} — we'll be in touch within one working day to talk through your idea.`
      );
      form.reset();
      setFileLabel('Upload inspiration or reference images — optional');
      setErrors({});
    } catch (err) {
      setState('error');
      setMessage(
        err instanceof Error && err.message
          ? `${err.message}. You can also call the studio on 023 8044 9910.`
          : 'We could not send that. Please try again, or call the studio on 023 8044 9910.'
      );
    }
  }

  const fieldClass = (key: keyof Errors) => `f${errors[key] ? ' err' : ''}`;

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className={fieldClass('name')}>
        <label htmlFor="bf-name">Name <span>*</span></label>
        <input id="bf-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
        <span className="f__err">{errors.name}</span>
      </div>

      <div className={fieldClass('email')}>
        <label htmlFor="bf-email">Email <span>*</span></label>
        <input id="bf-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <span className="f__err">{errors.email}</span>
      </div>

      <div className={fieldClass('phone')}>
        <label htmlFor="bf-phone">Phone</label>
        <input id="bf-phone" name="phone" type="tel" autoComplete="tel" placeholder="07000 000000" />
        <span className="f__err">{errors.phone}</span>
      </div>

      <div className="f">
        <label htmlFor="bf-artist">Preferred artist</label>
        <select id="bf-artist" name="artist" defaultValue="">
          <option value="">No preference</option>
          {artists.map((a) => <option key={a.slug}>{a.name}</option>)}
        </select>
      </div>

      <div className="f">
        <label htmlFor="bf-style">Tattoo style</label>
        <select id="bf-style" name="style" defaultValue="">
          <option value="">Not sure yet</option>
          {styles.map((s) => <option key={s.n}>{s.name}</option>)}
          <option>Cover-up</option>
        </select>
      </div>

      <div className="f">
        <label htmlFor="bf-size">Approximate size</label>
        <select id="bf-size" name="size" defaultValue="">
          <option value="">Select a size</option>
          <option>Tiny — under 5cm</option>
          <option>Small — 5–10cm</option>
          <option>Medium — 10–20cm</option>
          <option>Large — 20cm+</option>
          <option>Sleeve / full panel</option>
        </select>
      </div>

      <div className="f">
        <label htmlFor="bf-place">Body placement</label>
        <input id="bf-place" name="placement" type="text" placeholder="e.g. forearm, ribs, upper back" />
      </div>

      <div className="f">
        <label htmlFor="bf-budget">Budget</label>
        <select id="bf-budget" name="budget" defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Up to £150</option>
          <option>£150–£300</option>
          <option>£300–£600</option>
          <option>£600–£1,000</option>
          <option>£1,000+</option>
        </select>
      </div>

      <div className="f">
        <label htmlFor="bf-date">Preferred appointment date</label>
        <input id="bf-date" name="date" type="date" />
      </div>

      <div className="f">
        <label htmlFor="bf-contact">Best way to reach you</label>
        <select id="bf-contact" name="contact" defaultValue="Email">
          <option>Email</option>
          <option>Phone call</option>
          <option>Text / WhatsApp</option>
        </select>
      </div>

      <div className={`${fieldClass('idea')} f--full`}>
        <label htmlFor="bf-idea">Your tattoo idea <span>*</span></label>
        <textarea
          id="bf-idea"
          name="idea"
          required
          placeholder="Describe what you have in mind — subject, mood, any lettering, and anything you definitely don't want."
        />
        <span className="f__err">{errors.idea}</span>
      </div>

      <div className="f f--full">
        <label htmlFor="bf-extra">Additional information</label>
        <textarea
          id="bf-extra"
          name="extra"
          style={{ minHeight: 88 }}
          placeholder="Existing tattoos in the area, availability, anything else we should know."
        />
      </div>

      <label
        className={`drop${over ? ' over' : ''}`}
        htmlFor="bf-file"
        data-cur=""
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={() => setOver(false)}
      >
        <input
          id="bf-file"
          name="files"
          type="file"
          accept="image/*,.pdf"
          multiple
          hidden
          onChange={(e) => {
            const n = e.currentTarget.files?.length ?? 0;
            setFileLabel(
              n ? `${n} ${n === 1 ? 'file' : 'files'} attached — click to change`
                : 'Upload inspiration or reference images — optional'
            );
          }}
        />
        <span>{fileLabel}</span>
        <Upload aria-hidden="true" />
      </label>

      <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {state === 'ok' && (
        <div className="form__state form__state--ok on" role="status">
          <Check aria-hidden="true" />
          <div><b>Enquiry received</b><p>{message}</p></div>
        </div>
      )}
      {state === 'error' && (
        <div className="form__state form__state--bad on" role="alert">
          <AlertCircle aria-hidden="true" />
          <div><b>Check the form</b><p>{message}</p></div>
        </div>
      )}

      <div className="form__foot">
        <p className="form__note">All appointments are subject to artist availability.</p>
        <Button variant="solid" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? (
            <>Sending <span className="spin" aria-hidden="true" /></>
          ) : (
            <>Send booking enquiry <Arrow /></>
          )}
        </Button>
      </div>
    </form>
  );
}
