import type { ReactNode } from 'react';

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-white/50 text-[13px] mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 ${className}`}>{children}</div>;
}

export function AdminInput({ label, value, onChange, type = 'text', placeholder = '' }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-white/60 mb-1 block">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-[13px] focus:border-os-gold/60 focus:outline-none"
      />
    </label>
  );
}

export function AdminTextarea({ label, value, onChange, rows = 3, placeholder = '' }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] text-white/60 mb-1 block">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-[13px] focus:border-os-gold/60 focus:outline-none resize-y"
      />
    </label>
  );
}

export function AdminButton({ children, onClick, variant = 'primary', type = 'button' }: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'ghost';
  type?: 'button' | 'submit';
}) {
  const styles = {
    primary: 'bg-os-gold/20 border border-os-gold/40 text-os-gold hover:bg-os-gold/30',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
    ghost: 'bg-white/[0.05] border border-white/[0.08] text-white/70 hover:bg-white/[0.08]',
  };
  return (
    <button type={type} onClick={onClick} className={`px-3 h-9 rounded-lg text-[13px] font-medium transition ${styles[variant]}`}>
      {children}
    </button>
  );
}

export function AdminToggle({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full transition relative ${checked ? 'bg-os-gold/60' : 'bg-white/15'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-4' : 'left-0.5'}`} />
      </button>
      <span className="text-[12px] text-white/70">{label}</span>
    </label>
  );
}
