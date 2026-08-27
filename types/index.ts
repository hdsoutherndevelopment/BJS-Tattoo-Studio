export type PortfolioFilter =
  | 'all' | 'black-grey' | 'traditional' | 'fine-line' | 'blackwork' | 'colour' | 'custom';

export type Motif =
  | 'dagger' | 'rose' | 'snake' | 'moth' | 'skull' | 'swallow' | 'eye' | 'anchor'
  | 'panther' | 'heart' | 'sword' | 'ornament' | 'machine' | 'butterfly' | 'ship' | 'lantern';

export type Tone = '' | 't2' | 't3' | 't4' | 't5';

export interface Piece {
  title: string;
  cat: Exclude<PortfolioFilter, 'all'>;
  style: string;
  artist: string;
  motif: Motif;
  /** width / height */
  ar: number;
  rot: number;
  tone: Tone;
  /** Optional photograph layered over the artwork ground. */
  photo?: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  artist?: string;
  style?: string;
  size?: string;
  placement?: string;
  budget?: string;
  date?: string;
  contact?: string;
  idea: string;
  extra?: string;
  company?: string;
}
