import type { BookingInput } from './validation';

/**
 * Supabase is optional at build time. When the env vars are absent the site
 * runs in demo mode: the form still validates and reports success, but no
 * enquiry is stored. See supabase/schema.sql for the table definition.
 */
export const supabaseEnabled = Boolean(
  process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)
);

export async function saveEnquiry(input: BookingInput, source = 'website') {
  if (!supabaseEnabled) return { stored: false as const };

  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(
    process.env.SUPABASE_URL!,
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)!,
    { auth: { persistSession: false } }
  );

  const { error } = await client.from('enquiries').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    preferred_artist: input.artist || null,
    tattoo_style: input.style || null,
    approx_size: input.size || null,
    placement: input.placement || null,
    budget: input.budget || null,
    preferred_date: input.date || null,
    contact_method: input.contact || null,
    idea: input.idea,
    additional_info: input.extra || null,
    source
  });

  if (error) throw new Error(error.message);
  return { stored: true as const };
}
