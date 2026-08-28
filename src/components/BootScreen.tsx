import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useProfile } from '../lib/hooks';

const STEPS = [
  'BIOS · AmrOS 1.0',
  'mount /home/amr',
  'load profile.json',
  'link supabase.rt',
  'ready — welcome',
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [gone, setGone] = useState(false);
  const { data: profile } = useProfile();
  const initials = (profile?.name ?? 'AO').split(' ').map((w) => w[0]).slice(0, 2).join('');
  const cacheBust = useState(() => Date.now())[0];

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          clearInterval(id);
          setTimeout(() => { setGone(true); setTimeout(onDone, 550); }, 500);
          return s;
        }
        return s + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-os-bg grid place-items-center"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-3xl tile-gold grid place-items-center shadow-icon overflow-hidden"
            >
              {profile?.profile_image ? (
                <img
                  src={`${profile.profile_image}?t=${cacheBust}`}
                  alt={profile.name ?? 'Profile'}
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
              ) : (
                <span className="font-mono text-2xl text-os-gold font-semibold">{initials}</span>
              )}
            </motion.div>
            <div className="w-56">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.35 }}
                  className="h-full bg-gradient-to-r from-os-gold/60 to-os-gold"
                />
              </div>
              <p className="mt-3 text-center text-[11px] font-mono text-white/50">{STEPS[step]}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
