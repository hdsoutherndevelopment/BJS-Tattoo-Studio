import { z } from 'zod';

const ukPhone = /^[+()\d\s-]{9,18}$/;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name').max(80),
  email: z.string().trim().email('Please enter a valid email address').max(160),
  phone: z.string().trim().regex(ukPhone, 'Please enter a valid UK phone number').max(24).optional().or(z.literal('')),
  artist: z.string().trim().max(40).optional().or(z.literal('')),
  style: z.string().trim().max(40).optional().or(z.literal('')),
  size: z.string().trim().max(40).optional().or(z.literal('')),
  placement: z.string().trim().max(120).optional().or(z.literal('')),
  budget: z.string().trim().max(40).optional().or(z.literal('')),
  date: z.string().trim().max(20).optional().or(z.literal('')),
  contact: z.string().trim().max(40).optional().or(z.literal('')),
  idea: z.string().trim().min(20, 'Tell us a little about the idea — 20 characters or more').max(4000),
  extra: z.string().trim().max(4000).optional().or(z.literal('')),
  /** Honeypot — checked in the route so bots get a normal-looking response. */
  company: z.string().max(200).optional().or(z.literal(''))
});

export type BookingInput = z.infer<typeof bookingSchema>;

/** Naive in-memory rate limit. Swap for Upstash/Vercel KV on a multi-instance deploy. */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  entry.count += 1;
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
