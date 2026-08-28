import { motion } from 'framer-motion';
import { User, Briefcase, FolderKanban, Code2, Mail, FileText, GraduationCap, FileDown } from 'lucide-react';
import type { AppId } from '../os/types';

const DOCK: { app: AppId; label: string; Icon: typeof User }[] = [
  { app: 'about', label: 'About', Icon: User },
  { app: 'experience', label: 'Experience', Icon: Briefcase },
  { app: 'skills', label: 'Skills', Icon: Code2 },
  { app: 'projects', label: 'Projects', Icon: FolderKanban },
  { app: 'education', label: 'Education', Icon: GraduationCap },
  { app: 'contact', label: 'Contact', Icon: Mail },
  { app: 'resume', label: 'Resume', Icon: FileDown },
  { app: 'readme', label: 'README', Icon: FileText },
];

type Props = {
  onOpen: (app: AppId) => void;
  openApps: AppId[];
  minimizedApps?: AppId[];
  onPeekStart?: (app: AppId) => void;
  onPeekEnd?: (app: AppId) => void;
};

export function Dock({ onOpen, openApps, minimizedApps = [], onPeekStart, onPeekEnd }: Props) {
  return (
    <div className="pointer-events-none fixed bottom-3 left-0 right-0 flex justify-center z-[900]">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 26 }}
        className="pointer-events-auto glass-strong shadow-dock rounded-2xl px-2 py-2 flex items-end gap-1.5 relative"
      >
        {DOCK.map(({ app, label, Icon }) => {
          const isOpen = openApps.includes(app);
          const isMinimized = minimizedApps.includes(app);
          return (
            <button
              key={app}
              onClick={() => onOpen(app)}
              onMouseEnter={() => onPeekStart?.(app)}
              onMouseLeave={() => onPeekEnd?.(app)}
              aria-label={label}
              className="group relative flex flex-col items-center"
            >
              <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition text-[11px] px-2 py-0.5 rounded-md bg-black/80 border border-white/10 text-white whitespace-nowrap pointer-events-none">
                {label}
              </span>
              <motion.div
                whileHover={{ y: -8, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="tile w-11 h-11 rounded-xl grid place-items-center"
              >
                <Icon className="w-5 h-5 text-os-gold" strokeWidth={1.7} />
              </motion.div>
              <span className={`w-1.5 h-1.5 rounded-full mt-1 transition ${isOpen ? (isMinimized ? 'bg-transparent ring-1 ring-os-gold' : 'bg-os-gold') : 'bg-transparent'}`} />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
