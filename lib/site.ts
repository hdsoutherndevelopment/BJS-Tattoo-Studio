/**
 * Single source of truth for every business detail on the site.
 *
 * CONFIRM markers flag anything that was not taken directly from the public
 * business listing and must be verified with the studio before launch.
 */

export const site = {
  name: "BJ's Tattoo Studio",
  shortName: "BJ'S",
  tagline: 'Custom tattooing, bold ideas and exceptional craftsmanship in Southampton.',
  /* CONFIRM — demo establishment year, used in the hero ticker only. */
  established: '2006',
  /* `||` not `??`: an env var that exists but is blank must fall back too,
     otherwise `new URL('')` in lib/metadata.ts fails the production build. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '') || 'https://www.bjstattoostudio.co.uk',

  phone: { display: '023 8044 9910', href: 'tel:+442380449910', e164: '+442380449910' },
  /* CONFIRM — no public email address was listed; enquiries route through the form. */
  email: process.env.BUSINESS_EMAIL ?? '',

  address: {
    street: '59 Bridge Rd',
    locality: 'Southampton',
    postcode: 'SO19 7GR',
    country: 'GB',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=59+Bridge+Rd+Southampton+SO19+7GR'
  },

  /* Taken from the public listing. */
  hours: [
    { day: 'Monday', short: 'Mon', index: 1, opens: null, closes: null },
    { day: 'Tuesday', short: 'Tue', index: 2, opens: '09:30', closes: '18:00' },
    { day: 'Wednesday', short: 'Wed', index: 3, opens: '09:30', closes: '18:00' },
    { day: 'Thursday', short: 'Thu', index: 4, opens: '09:30', closes: '18:00' },
    { day: 'Friday', short: 'Fri', index: 5, opens: '09:30', closes: '18:00' },
    { day: 'Saturday', short: 'Sat', index: 6, opens: '09:30', closes: '17:00' },
    { day: 'Sunday', short: 'Sun', index: 0, opens: null, closes: null }
  ],

  /* CONFIRM — placeholder social handles for the concept build. */
  socials: {
    instagram: { handle: '@bjs.tattoo.studio', url: 'https://instagram.com/' },
    facebook: { url: 'https://facebook.com/' }
  },

  areasServed: [
    'Southampton', 'Woolston', 'Bitterne', 'Sholing', 'Itchen',
    'Netley', 'Hedge End', 'Eastleigh', 'Hamble', 'Portswood'
  ]
} as const;

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Artists', href: '#artists' },
  { label: 'Styles', href: '#styles' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Studio', href: '#studio' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' }
] as const;

/* DEMO CONTENT — fictional artist profiles for the concept build. ---------- */
export const artists = [
  {
    slug: 'bj',
    name: 'BJ',
    role: 'Founder / Tattoo Artist',
    motif: 'panther',
    tone: '',
    instagram: '@bj.tattoos',
    filter: 'black-grey',
    styles: ['Black & Grey', 'Traditional', 'Custom Pieces'],
    bio: "BJ opened the Bridge Road studio with one rule: no two pieces the same. Best known for heavy black and grey — portraits, religious work, large-scale sleeves — with a traditional streak that never left. Every piece starts with a pencil and a proper conversation."
  },
  {
    slug: 'alex',
    name: 'Alex',
    role: 'Tattoo Artist',
    motif: 'moth',
    tone: 't2',
    instagram: '@alex.inks',
    filter: 'fine-line',
    styles: ['Fine Line', 'Blackwork', 'Illustrative'],
    bio: 'Alex works small and precise — single-needle botanicals, delicate script and ornamental linework — then swings the other way into dense, high-contrast blackwork. A background in illustration means the drawing is always the priority.'
  },
  {
    slug: 'morgan',
    name: 'Morgan',
    role: 'Tattoo Artist',
    motif: 'snake',
    tone: 't4',
    instagram: '@morgan.makes',
    filter: 'colour',
    styles: ['Colour', 'Neo-Traditional', 'Custom Designs'],
    bio: 'Morgan is the colour specialist — bold neo-traditional animals, florals and folklore, packed with saturated palettes and clean, confident outlines. Ideal if you want something that reads from across the room.'
  }
] as const;

export const styles = [
  { n: '01', name: 'Black & Grey', copy: 'Detailed shading and timeless monochrome work.', motif: 'skull', tone: '', filter: 'black-grey' },
  { n: '02', name: 'Fine Line', copy: 'Delicate, precise and minimalist designs.', motif: 'ornament', tone: 't2', filter: 'fine-line' },
  { n: '03', name: 'Traditional', copy: 'Bold outlines, strong colour and classic tattoo aesthetics.', motif: 'swallow', tone: 't3', filter: 'traditional' },
  { n: '04', name: 'Blackwork', copy: 'High-contrast designs using bold black ink.', motif: 'sword', tone: '', filter: 'blackwork' },
  { n: '05', name: 'Neo-Traditional', copy: 'Modern interpretations of traditional tattooing.', motif: 'butterfly', tone: 't4', filter: 'colour' },
  { n: '06', name: 'Custom', copy: 'Unique designs created specifically for you.', motif: 'machine', tone: 't5', filter: 'custom' }
] as const;

/* DEMO PRICING — illustrative figures only. Replace with confirmed rates. --- */
export const pricing = [
  { tier: 'Minimum charge', from: '£80', copy: "Covers setup, sterile equipment and the artist's time for the smallest pieces." },
  { tier: 'Small tattoo', from: '£100', copy: 'Simple linework or lettering, roughly palm-sized or under.' },
  { tier: 'Medium tattoo', from: '£180', copy: 'More detail, shading or colour — typically a two to three hour sitting.' },
  { tier: 'Large tattoo', from: '£300', copy: 'Statement pieces with full shading, usually booked across a longer session.' },
  { tier: 'Half day session', from: '£450', copy: 'Around four hours in the chair — ideal for panels and sleeve progress.' },
  { tier: 'Full day session', from: '£750', copy: 'A full day booked to you, for large-scale and multi-session work.' }
] as const;

export const whyUs = [
  { icon: 'star', title: 'Experienced artists', copy: 'Professional artists with individual styles, so the work suits your idea rather than the other way round.' },
  { icon: 'pen', title: 'Custom designs', copy: "Artwork created specifically for each client and drawn to fit the placement it's going on." },
  { icon: 'shield', title: 'Professional studio', copy: 'A clean, comfortable and welcoming environment with proper hygiene standards, every single time.' },
  { icon: 'zoom', title: 'Attention to detail', copy: 'Every tattoo receives careful consideration — line weight, spacing, how it will age and how it sits on the body.' },
  { icon: 'chat', title: 'Personal consultation', copy: "Discuss your idea before committing. No pressure, no deposit taken until you're happy with the plan." }
] as const;

/* DEMO CONTENT — illustrative reviews. Swap for real Google reviews. -------- */
export const testimonials = [
  { name: 'Rachel M.', style: 'Black & Grey', quote: 'Absolutely love the finished piece. BJ understood exactly what I wanted and made the whole experience comfortable from start to finish.' },
  { name: 'Dan H.', style: 'Fine Line', quote: 'First tattoo and I was nervous walking in. They talked me through every step, no rush at all, and the linework is razor sharp.' },
  { name: 'Sophie T.', style: 'Neo-Traditional', quote: "Brought in a half-finished idea and a bad phone photo. Morgan turned it into something far better than I'd pictured. Booked my next one already." },
  { name: 'Marcus B.', style: 'Cover-up', quote: 'Had an old, badly done tattoo covered. Honest advice about what was possible, and the result is genuinely better than I hoped for.' },
  { name: 'Priya K.', style: 'Blackwork', quote: 'Spotless studio, proper professionals, and the aftercare advice actually worked. Healed beautifully with no issues at all.' },
  { name: 'Liam O.', style: 'Custom Sleeve', quote: 'Six sessions into a full sleeve and every one has been a good day out. They take real pride in the work and it shows.' }
] as const;

export const aftercare = [
  'Keep the tattoo clean — wash gently with unscented soap and clean hands.',
  "Follow your artist's instructions on wrapping and how long to leave the dressing on.",
  'Avoid unnecessary touching, picking or scratching while it settles.',
  'Keep the area moisturised as instructed — thin layers, not thick ones.',
  'Avoid excessive sun exposure while healing, and use high SPF on it afterwards.',
  'Avoid swimming, baths and saunas while healing — showers are fine.',
  "Contact the studio if you have any concerns. We'd always rather you asked."
] as const;

export const faqs = [
  { q: 'How do I book a tattoo?', a: 'Send a booking enquiry through this site with your idea, rough size and placement, or call the studio during opening hours. An artist will come back to you to arrange a consultation, or book you straight in for smaller pieces.' },
  { q: 'Do I need a consultation?', a: 'For custom, large or cover-up work — yes. It lets us talk through the idea, placement and sizing before any drawing starts, and it is the point where we agree a realistic price and timeline. Smaller, simpler pieces can often be booked without one.' },
  { q: 'How much does a tattoo cost?', a: 'It depends on the artist, the design, the size and the placement. There is a studio minimum charge for the smallest pieces, and half or full day rates for larger work. Your final price is confirmed at consultation before anything is booked.' },
  { q: 'Do you take walk-ins?', a: 'Walk-ins are welcome whenever an artist has availability, and you will usually have more luck earlier in the week. Booking ahead is the only way to guarantee a slot with a specific artist.' },
  { q: 'Can I bring my own design?', a: 'Please do. Drawings, photos, screenshots, a written description — anything helps. Your artist will adapt it so it sits well on the body, reads clearly and ages properly, and will always show you the design before the needle goes anywhere near you.' },
  { q: 'Can you modify an existing design?', a: 'Yes. We can rework, extend or reinterpret a design you have found, and we will usually suggest changes so it is not a straight copy of someone else’s tattoo. Bring it to a consultation and we will talk it through.' },
  { q: 'How old do I need to be?', a: 'You must be 18 or over to be tattooed in the UK. Photo ID is required. There are no exceptions, and parental consent does not change the law.' },
  { q: 'How long does a tattoo take?', a: 'Anything from twenty minutes for something small to multiple full-day sessions for a sleeve or back piece. Your artist will give you a realistic estimate at consultation, including how many sittings it is likely to need.' },
  { q: 'Do you accept deposits?', a: 'A deposit secures your appointment and comes off the final cost of the tattoo. It covers the artist’s design time, so it is non-refundable if you cancel at short notice — give us reasonable notice and we will happily move your booking.' },
  { q: 'What should I do before my appointment?', a: 'Eat a proper meal beforehand, drink plenty of water, and get a decent night’s sleep. Do not drink alcohol the night before or the day of your appointment. Bring photo ID, and bring headphones or something to occupy you if it is a long sitting.' },
  { q: 'What should I wear?', a: 'Something loose and comfortable that gives easy access to the area being tattooed, and that you do not mind getting a little ink on. If it is somewhere awkward to reach, let us know when you book so you can dress accordingly.' },
  { q: 'Do you offer cover-ups?', a: 'Yes. Cover-ups and reworks always start with a consultation so the artist can look at the existing tattoo — its size, colour, age and how heavily it was applied — and explain honestly what is realistically achievable. Sometimes that means laser fading first.' }
] as const;

export const bookingSteps = [
  { n: '01', title: 'Send the enquiry', copy: 'Idea, rough size, placement and any reference you already have.' },
  { n: '02', title: 'We come back to you', copy: 'An artist reviews it and suggests the right approach and a rough guide price.' },
  { n: '03', title: 'Consultation', copy: 'In studio or over the phone — we finalise the design, sizing and timings.' },
  { n: '04', title: 'Book the chair', copy: 'A deposit secures your date and comes off the final cost of the tattoo.' }
] as const;

export const studioPoints = [
  'Fully licensed and registered with the local authority',
  'Single-use needles and sterile, sealed equipment',
  'Private stations with comfortable seating for long sessions',
  'Relaxed, welcoming space — first tattoos very much included',
  'Street parking on Bridge Road and good bus links'
] as const;
