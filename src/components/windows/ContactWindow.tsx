import { Mail, MapPin, Copy, ArrowUpRight, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../brand-icons';
import { useProfile, useSocialLinks } from '../../lib/hooks';
import { useState } from 'react';

export function ContactWindow() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const [copied, setCopied] = useState(false);

  const github = socialLinks.find((s) => s.platform === 'github');
  const linkedin = socialLinks.find((s) => s.platform === 'linkedin');
  const whatsapp = socialLinks.find((s) => s.platform === 'whatsapp');

  const copyEmail = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  };

  if (!profile) return <div className="p-8 text-white/50">Loading…</div>;

  return (
    <div className="p-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-os-gold/80">Say hi</p>
      <h2 className="mt-1 text-3xl font-semibold text-white tracking-tight">Let's build something.</h2>
      <p className="text-white/60 text-[14px] mt-2 max-w-md">
        {profile.availability}. The fastest way to reach me is email.
      </p>

      <div className="mt-8 space-y-2">
        <button onClick={copyEmail} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-os-gold/12 hover:bg-os-gold/18 border border-os-gold/30 transition group">
          <Mail className="w-4 h-4 text-os-gold" />
          <span className="text-[14px] text-white font-medium">{profile.email}</span>
          <span className="ml-auto text-[12px] text-white/60 flex items-center gap-1">
            {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
          </span>
        </button>

        {whatsapp && <ContactLink icon={<WhatsappIcon className="w-4 h-4" />} label="WhatsApp" href={whatsapp.url} external />}
        {github && <ContactLink icon={<GithubIcon className="w-4 h-4" />} label={github.label} href={github.url} external />}
        {linkedin && <ContactLink icon={<LinkedinIcon className="w-4 h-4" />} label={linkedin.label} href={linkedin.url} external />}
        <ContactLink icon={<MapPin className="w-4 h-4" />} label={profile.location} />
      </div>
    </div>
  );
}

function ContactLink({ icon, label, href, external }: { icon: React.ReactNode; label: string; href?: string; external?: boolean }) {
  const cls = 'w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition';
  const inner = (
    <>
      <span className="text-os-gold">{icon}</span>
      <span className="text-[13.5px] text-white/85">{label}</span>
      {external && <ArrowUpRight className="ml-auto w-3.5 h-3.5 text-white/40" />}
    </>
  );
  if (!href) return <div className={cls}>{inner}</div>;
  return (
    <a href={href} target={external ? '_blank' : undefined} rel="noreferrer" className={cls}>{inner}</a>
  );
}
