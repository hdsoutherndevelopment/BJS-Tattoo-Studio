import { NextResponse } from 'next/server';
import { bookingSchema, rateLimit } from '@/lib/validation';
import { saveEnquiry, supabaseEnabled } from '@/lib/supabase';
import { notifyStudio, resendEnabled } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Please check the highlighted fields',
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  /* Honeypot filled — pretend everything is fine and drop it. */
  if (parsed.data.company) return NextResponse.json({ ok: true, demo: false });

  /* Rate limit real submissions only, so a visitor fixing validation errors is
     never locked out. Swap for Upstash/Vercel KV on a multi-instance deploy. */
  if (!rateLimit(`booking:${ip}`, 6).ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many enquiries from this connection. Please try again shortly' },
      { status: 429 }
    );
  }

  /* Demo mode: no backend configured, so nothing is stored or sent. */
  const live = supabaseEnabled || resendEnabled;
  if (!live) return NextResponse.json({ ok: true, demo: true });

  try {
    await saveEnquiry(parsed.data);
    await notifyStudio(parsed.data);
    return NextResponse.json({ ok: true, demo: false });
  } catch (error) {
    console.error('[booking]', error);
    return NextResponse.json(
      { ok: false, message: 'We could not send that enquiry' },
      { status: 500 }
    );
  }
}
