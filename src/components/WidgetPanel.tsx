import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Code2, Briefcase, FolderKanban, User, GraduationCap, ArrowUpRight, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './brand-icons';
import { Avatar } from './Avatar';
import type { AppId } from '../os/types';
import { useProfile, useSocialLinks } from '../lib/hooks';

const TIPS = [
  { icon: Cpu, title: 'Real-time & Supabase', body: 'Ask me about RLS, Edge Functions, and realtime scoring built for SKAM.', cta: 'Open Projects', target: 'projects' as AppId },
  { icon: Briefcase, title: 'Currently building', body: 'Frontend Developer Intern at Verbivore OÜ — production LMS in Next.js.', cta: 'See Experience', target: 'experience' as AppId },
  { icon: FolderKanban, title: 'Featured work', body: 'Verbivore LMS, TeamUP, and SKAM are the projects I’m proudest of.', cta: 'Open Projects', target: 'projects' as AppId },
];

const SHORTCUTS: { app: AppId; label: string; Icon: typeof User }[] = [
  { app: 'about', label: 'About', Icon: User },
  { app: 'experience', label: 'Work', Icon: Briefcase },
  { app: 'skills', label: 'Skills', Icon: Code2 },
  { app: 'projects', label: 'Projects', Icon: FolderKanban },
  { app: 'education', label: 'Edu', Icon: GraduationCap },
  { app: 'contact', label: 'Contact', Icon: Mail },
];

export function WidgetPanel({ onOpen }: { onOpen: (a: AppId) => void }) {
  const [tipIdx, setTipIdx] = useState(0);
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  useEffect(() => {
    const id = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const Tip = TIPS[tipIdx];
  const TipIcon = Tip.icon;

  const githubLink = socialLinks.find((s) => s.platform === 'github');
  const linkedinLink = socialLinks.find((s) => s.platform === 'linkedin');
  const emailLink = socialLinks.find((s) => s.platform === 'email');

  return (
    <aside className="hidden lg:flex flex-col gap-3 w-[280px] shrink-0 p-3 pt-4 h-full overflow-y-auto z-10">
      {/* Profile widget */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <Avatar size={44} />
          <div className="min-w-0">
            <p className="text-[13px] text-white font-medium truncate">{profile?.short_name ?? ''}</p>
            <p className="text-[11px] text-white/55 truncate">{profile?.headline ?? ''}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-white/60">
          <MapPin className="w-3 h-3" /> {profile?.location ?? ''}
        </div>
        <div className="mt-3 flex gap-2">
          {githubLink && <a href={githubLink.url} target="_blank" rel="noreferrer" className="tile w-full h-8 rounded-lg grid place-items-center hover:brightness-125 transition"><GithubIcon className="w-3.5 h-3.5 text-white/80" /></a>}
          {linkedinLink && <a href={linkedinLink.url} target="_blank" rel="noreferrer" className="tile w-full h-8 rounded-lg grid place-items-center hover:brightness-125 transition"><LinkedinIcon className="w-3.5 h-3.5 text-white/80" /></a>}
          {emailLink && <a href={emailLink.url} className="tile w-full h-8 rounded-lg grid place-items-center hover:brightness-125 transition"><Mail className="w-3.5 h-3.5 text-white/80" /></a>}
        </div>
      </motion.div>

      {/* Tips carousel */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }} className="glass rounded-2xl p-4 min-h-[168px] relative overflow-hidden">
        <p className="text-[10px] uppercase tracking-widest text-os-gold/80 font-medium">AmrOS tips</p>
        <AnimatePresence mode="wait">
          <motion.div key={tipIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-2">
            <div className="flex items-center gap-2">
              <TipIcon className="w-4 h-4 text-os-gold" />
              <p className="text-[13px] font-medium text-white">{Tip.title}</p>
            </div>
            <p className="text-[11.5px] text-white/60 mt-1.5 leading-relaxed">{Tip.body}</p>
            <button onClick={() => onOpen(Tip.target)} className="mt-3 text-[11px] text-os-gold hover:underline flex items-center gap-1">
              {Tip.cta} <ArrowUpRight className="w-3 h-3" />
            </button>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {TIPS.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all ${i === tipIdx ? 'w-4 bg-os-gold' : 'w-1 bg-white/20'}`} />
          ))}
        </div>
      </motion.div>

      {/* Shortcuts */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.26 }} className="glass rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium mb-3">Shortcuts</p>
        <div className="grid grid-cols-2 gap-2">
          {SHORTCUTS.map(({ app, label, Icon }) => (
            <button key={app} onClick={() => onOpen(app)} className="tile rounded-lg h-10 px-2 flex items-center gap-2 hover:brightness-125 transition text-left">
              <span className="w-6 h-6 rounded-md grid place-items-center bg-black/30"><Icon className="w-3.5 h-3.5 text-os-gold" /></span>
              <span className="text-[12px] text-white/80">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Activity log */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.34 }} className="glass rounded-2xl p-4 font-mono">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] text-white/70 font-sans">System log</p>
        </div>
        <ul className="text-[10.5px] leading-relaxed text-white/45 space-y-0.5">
          <li>14:40:11 <span className="text-white/70">boot ok</span></li>
          <li>14:40:12 mount /home/amr</li>
          <li>14:40:13 <span className="text-os-gold">shell started</span></li>
          <li>14:40:14 net: available</li>
          <li>14:40:15 <span className="text-emerald-300">ready</span></li>
        </ul>
      </motion.div>
    </aside>
  );
}
