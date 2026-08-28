'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { PortfolioFilter } from '@/types';

interface Ctx {
  filter: PortfolioFilter;
  setFilter: (f: PortfolioFilter) => void;
  prefill: { artist?: string; style?: string };
  setPrefill: (p: { artist?: string; style?: string }) => void;
}

const PortfolioCtx = createContext<Ctx | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<PortfolioFilter>('all');
  const [prefill, setPrefill] = useState<{ artist?: string; style?: string }>({});
  const value = useMemo(() => ({ filter, setFilter, prefill, setPrefill }), [filter, prefill]);
  return <PortfolioCtx.Provider value={value}>{children}</PortfolioCtx.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioCtx);
  if (!ctx) throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  return ctx;
}
