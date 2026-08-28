import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, User, Briefcase, Code2, FolderKanban, GraduationCap, Mail, FileText, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './brand-icons';
import { Avatar } from './Avatar';
import { useProfile, useSocialLinks } from '../lib/hooks';
import { AboutWindow } from './windows/AboutWindow';
import { ExperienceWindow } from './windows/ExperienceWindow';
import { SkillsWindow } from './windows/SkillsWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { EducationWindow } from './windows/EducationWindow';
import { ContactWindow } from './windows/ContactWindow';
import { ReadmeWindow } from './windows/ReadmeWindow';
import type { AppId } from '../os/types';

const APPS: { app: AppId; label: string; Icon: typeof User }[] = [
  { app: 'about', label: 'About', Icon: User },
  { app: 'experience', label: 'Work', Icon: Briefcase },
  { app: 'skills', label: 'Skills', Icon: Code2 },
  { app: 'projects', label: 'Projects', Icon: FolderKanban },
  { app: 'education', label: 'Edu', Icon: GraduationCap },
  { app: 'contact', label: 'Contact', Icon: Mail },
  { app: 'readme', label: 'README', Icon: FileText },
];

export function MobileView() {
  const [open, setOpen] = useState<AppId | null>(null);
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const github = socialLinks.find((s) => s.platform === 'github');
  const linkedin = socialLinks.find((s) => s.platform === 'linkedin');
  const whatsapp = socialLinks.find((s) => s.platform === 'whatsapp');

  return (
    <div className="min-h-full w-full overflow-y-auto pb-16">
      {/* Status bar */}
      <div className="h-7 px-4 flex items-center justify-between text-[11px] text-white/70">
        <span className="font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-os-gold" /> AmrOS</span>
        <span className="tabular-nums">{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
      </div>

      {open ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="px-2">
          <button onClick={() => setOpen(null)} className="mx-2 my-2 flex items-center gap-1.5 text-[13px] text-os-gold">
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          <div className="rounded-2xl overflow-hidden glass-strong shadow-window min-h-[70vh]">
            {open === 'about' && <AboutWindow />}
            {open === 'experience' && <ExperienceWindow />}
            {open === 'skills' && <SkillsWindow />}
            {open === 'projects' && <div className="h-[80vh]"><ProjectsWindow /></div>}
            {open === 'education' && <EducationWindow />}
            {open === 'contact' && <ContactWindow />}
            {open === 'readme' && <ReadmeWindow />}
          </div>
        </motion.div>
      ) : (
        <div className="px-6 pt-6">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
            <Avatar size={72} />
            <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-os-gold/80">Portfolio</p>
            <h1 className="mt-2 text-2xl font-semibold text-white tracking-tight leading-[1.05]">{profile?.name ?? ''}</h1>
            <p className="mt-1 text-white/60 text-[14px]">{profile?.headline ?? ''}</p>
            <p className="mt-1 text-white/45 text-[12px]">{profile?.short_bio ?? ''}</p>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-white/55">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile?.location ?? ''}</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {profile?.availability ?? 'Available'}</span>
            </div>
            </div>
          </motion.div>

          {/* CTA */}
          <div className="mt-5 flex gap-2">
            <a href={`mailto:${profile?.email ?? ''}`} className="flex-1 h-11 rounded-xl bg-os-gold/15 border border-os-gold/40 text-os-gold text-[13px] font-medium grid place-items-center">Email me</a>
            {github && <a href={github.url} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl tile grid place-items-center"><GithubIcon className="w-4 h-4 text-white/85" /></a>}
            {linkedin && <a href={linkedin.url} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl tile grid place-items-center"><LinkedinIcon className="w-4 h-4 text-white/85" /></a>}
            {whatsapp && <a href={whatsapp.url} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl tile grid place-items-center"><WhatsappIcon className="w-4 h-4 text-white/85" /></a>}
          </div>

          {/* App grid */}
          <p className="mt-8 text-[10px] uppercase tracking-widest text-white/40">Apps</p>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {APPS.map(({ app, label, Icon }, i) => (
              <motion.button
                key={app}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setOpen(app)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="tile w-14 h-14 rounded-2xl grid place-items-center">
                  <Icon className="w-5 h-5 text-os-gold" strokeWidth={1.7} />
                </div>
                <span className="text-[11px] text-white/70">{label}</span>
              </motion.button>
            ))}
          </div>

          <p className="mt-8 text-[11px] text-white/35 text-center">Best experienced on desktop · AmrOS 1.0</p>
        </div>
      )}
    </div>
  );
}
