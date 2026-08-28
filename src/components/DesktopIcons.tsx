import { motion } from 'framer-motion';
import { User, Briefcase, FolderKanban, GraduationCap } from 'lucide-react';
import type { AppId } from '../os/types';

const ICONS: { app: AppId; label: string; Icon: typeof User }[] = [
  { app: 'about', label: 'About me', Icon: User },
  { app: 'experience', label: 'Experience', Icon: Briefcase },
  { app: 'projects', label: 'Projects', Icon: FolderKanban },
  { app: 'education', label: 'Education', Icon: GraduationCap },
];

export function DesktopIcons({ onOpen }: { onOpen: (app: AppId) => void }) {
  return (
    <div className="absolute left-4 top-10 flex flex-col gap-3 z-10">
      {ICONS.map(({ app, label, Icon }, i) => (
        <motion.button
          key={app}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 260, damping: 22 }}
          onClick={() => onOpen(app)}
          className="group w-[76px] flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label={`Open ${label}`}
        >
          <div className="tile w-14 h-14 rounded-2xl grid place-items-center group-hover:brightness-125 group-hover:-translate-y-0.5 transition">
            <Icon className="w-6 h-6 text-os-gold" strokeWidth={1.6} />
          </div>
          <span className="text-[11px] text-white/70 group-hover:text-white transition">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
