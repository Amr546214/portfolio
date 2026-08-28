import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../brand-icons';
import { Avatar } from '../Avatar';
import { useProfile, useSocialLinks } from '../../lib/hooks';

export function AboutWindow() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  if (!profile) return <div className="p-8 text-white/50">Loading…</div>;
  const github = socialLinks.find((s) => s.platform === 'github');
  const linkedin = socialLinks.find((s) => s.platform === 'linkedin');
  const whatsapp = socialLinks.find((s) => s.platform === 'whatsapp');
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-start gap-5">
        <Avatar size={92} />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-os-gold/80 font-medium">Profile</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white tracking-tight leading-[1.05]">
            {profile.name}
          </h1>
          <p className="mt-2 text-white/60 text-[15px]">{profile.headline}</p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-white/75 leading-relaxed text-[14.5px] max-w-[62ch]"
      >
        {profile.long_bio}
      </motion.p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md">
        <InfoRow icon={<MapPin className="w-3.5 h-3.5" />} label={profile.location} />
        <InfoRow icon={<Mail className="w-3.5 h-3.5" />} label={profile.email} href={`mailto:${profile.email}`} />
        {whatsapp && <InfoRow icon={<WhatsappIcon className="w-3.5 h-3.5" />} label="WhatsApp" href={whatsapp.url} />}
        {github && <InfoRow icon={<GithubIcon className="w-3.5 h-3.5" />} label={github.label} href={github.url} />}
        {linkedin && <InfoRow icon={<LinkedinIcon className="w-3.5 h-3.5" />} label={linkedin.label} href={linkedin.url} />}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = 'flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/[0.05]';
  const content = (
    <>
      <span className="text-os-gold">{icon}</span>
      <span className="text-[12.5px] text-white/80 truncate">{label}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls}>{content}</a>
    );
  }
  return <div className={cls}>{content}</div>;
}
