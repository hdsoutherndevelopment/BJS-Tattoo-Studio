import type { Piece, PortfolioFilter } from '@/types';

export const filters: { label: string; value: PortfolioFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Black & Grey', value: 'black-grey' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Fine Line', value: 'fine-line' },
  { label: 'Blackwork', value: 'blackwork' },
  { label: 'Colour', value: 'colour' },
  { label: 'Custom', value: 'custom' }
];

const TONES = ['', 't2', 't3', 't4', 't5'] as const;

/**
 * DEMO CONTENT — placeholder portfolio pieces rendered as original SVG flash
 * artwork. Replace `motif` with `photo: '/portfolio/xxx.jpg'` once the studio
 * supplies photography; <Plate> renders a photograph over the artwork layer.
 */
const raw: Omit<Piece, 'tone'>[] = [
  { title: 'Ornamental Rose',    cat: 'fine-line',   style: 'Fine Line',       artist: 'Alex',   motif: 'rose',      ar: 3 / 4, rot: -3 },
  { title: "Reaper's Dagger",    cat: 'traditional', style: 'Traditional',     artist: 'BJ',     motif: 'dagger',    ar: 4 / 5, rot: 0 },
  { title: 'Serpent Coil',       cat: 'blackwork',   style: 'Blackwork',       artist: 'Alex',   motif: 'snake',     ar: 3 / 4, rot: 4 },
  { title: "Death's Head Moth",  cat: 'black-grey',  style: 'Black & Grey',    artist: 'BJ',     motif: 'moth',      ar: 1,     rot: 0 },
  { title: 'Memento Mori',       cat: 'black-grey',  style: 'Black & Grey',    artist: 'BJ',     motif: 'skull',     ar: 4 / 5, rot: -2 },
  { title: "Sailor's Swallow",   cat: 'traditional', style: 'Traditional',     artist: 'Morgan', motif: 'swallow',   ar: 1,     rot: 5 },
  { title: 'All-Seeing',         cat: 'blackwork',   style: 'Blackwork',       artist: 'Alex',   motif: 'eye',       ar: 4 / 3, rot: 0 },
  { title: 'Solent Anchor',      cat: 'traditional', style: 'Traditional',     artist: 'BJ',     motif: 'anchor',    ar: 3 / 4, rot: -4 },
  { title: 'Night Panther',      cat: 'colour',      style: 'Neo-Traditional', artist: 'Morgan', motif: 'panther',   ar: 4 / 5, rot: 0 },
  { title: 'Heart & Banner',     cat: 'traditional', style: 'Traditional',     artist: 'Morgan', motif: 'heart',     ar: 1,     rot: 3 },
  { title: 'Sword & Laurel',     cat: 'blackwork',   style: 'Blackwork',       artist: 'Alex',   motif: 'sword',     ar: 3 / 4, rot: 0 },
  { title: 'Ornamental Drop',    cat: 'fine-line',   style: 'Fine Line',       artist: 'Alex',   motif: 'ornament',  ar: 4 / 5, rot: 0 },
  { title: 'Machine Study',      cat: 'custom',      style: 'Custom',          artist: 'BJ',     motif: 'machine',   ar: 1,     rot: -3 },
  { title: 'Papilio',            cat: 'colour',      style: 'Neo-Traditional', artist: 'Morgan', motif: 'butterfly', ar: 3 / 4, rot: 0 },
  { title: 'Solent Sail',        cat: 'custom',      style: 'Custom',          artist: 'BJ',     motif: 'ship',      ar: 4 / 3, rot: 2 },
  { title: 'Harbour Light',      cat: 'custom',      style: 'Custom',          artist: 'Morgan', motif: 'lantern',   ar: 4 / 5, rot: 0 },
  { title: 'Blackwork Bloom',    cat: 'blackwork',   style: 'Blackwork',       artist: 'Alex',   motif: 'rose',      ar: 1,     rot: 6 },
  { title: 'Single Needle Moth', cat: 'fine-line',   style: 'Fine Line',       artist: 'Alex',   motif: 'moth',      ar: 3 / 4, rot: -2 }
];

export const pieces: Piece[] = raw.map((p, i) => ({ ...p, tone: TONES[i % TONES.length] }));

export const socialMotifs = [
  'rose', 'dagger', 'moth', 'snake', 'swallow', 'eye',
  'skull', 'heart', 'butterfly', 'anchor', 'panther', 'ornament'
] as const;
