import type { BookingInput } from './validation';
import { site } from './site';

export const resendEnabled = Boolean(process.env.RESEND_API_KEY && process.env.BUSINESS_EMAIL);

const row = (label: string, value?: string | null) =>
  value ? `<tr><td style="padding:6px 14px 6px 0;color:#777;font:12px/1.5 Arial">${label}</td><td style="padding:6px 0;font:14px/1.5 Arial;color:#111">${value}</td></tr>` : '';

export async function notifyStudio(input: BookingInput) {
  if (!resendEnabled) return { sent: false as const };

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const html = `
    <div style="font:14px/1.6 Arial,sans-serif;color:#111">
      <h2 style="font:700 18px Arial;margin:0 0 4px">New booking enquiry — ${site.name}</h2>
      <p style="margin:0 0 18px;color:#666;font-size:12px">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} · via the website booking form</p>
      <table style="border-collapse:collapse">
        ${row('Name', input.name)}
        ${row('Email', input.email)}
        ${row('Phone', input.phone)}
        ${row('Preferred artist', input.artist)}
        ${row('Style', input.style)}
        ${row('Approx size', input.size)}
        ${row('Placement', input.placement)}
        ${row('Budget', input.budget)}
        ${row('Preferred date', input.date)}
        ${row('Best contact', input.contact)}
      </table>
      <h3 style="font:700 14px Arial;margin:20px 0 6px">Tattoo idea</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(input.idea)}</p>
      ${input.extra ? `<h3 style="font:700 14px Arial;margin:20px 0 6px">Additional information</h3><p style="white-space:pre-wrap;margin:0">${escapeHtml(input.extra)}</p>` : ''}
    </div>`;

  await resend.emails.send({
    from: `${site.name} <bookings@${new URL(site.url).hostname.replace(/^www\./, '')}>`,
    to: process.env.BUSINESS_EMAIL!,
    replyTo: input.email,
    subject: `Booking enquiry — ${input.name}${input.style ? ` (${input.style})` : ''}`,
    html
  });

  /* Customer confirmation */
  await resend.emails.send({
    from: `${site.name} <bookings@${new URL(site.url).hostname.replace(/^www\./, '')}>`,
    to: input.email,
    subject: `We've got your enquiry — ${site.name}`,
    html: `<div style="font:14px/1.7 Arial,sans-serif;color:#111">
      <p>Hi ${escapeHtml(input.name.split(' ')[0])},</p>
      <p>Thanks for getting in touch with ${site.name}. We've received your enquiry and one of the artists will come back to you within one working day to talk through the idea.</p>
      <p>If it's urgent, give the studio a ring on <strong>${site.phone.display}</strong>.</p>
      <p style="color:#666;font-size:12px;margin-top:24px">${site.address.street}, ${site.address.locality} ${site.address.postcode}<br>All appointments are subject to artist availability.</p>
    </div>`
  });

  return { sent: true as const };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
