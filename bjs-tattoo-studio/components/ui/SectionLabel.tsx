export function SectionLabel({ children, plain }: { children: React.ReactNode; plain?: boolean }) {
  return <p className={`lbl${plain ? ' lbl--plain' : ''}`}>{children}</p>;
}

/** The brand full stop — a red diamond echoing the logo mark. */
export function Dot() {
  return <i className="pd" aria-hidden="true" />;
}
