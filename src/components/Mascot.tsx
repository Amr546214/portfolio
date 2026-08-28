import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { WindowState } from '../os/types';

type Props = {
  onOpen: () => void;
  activeWindow: WindowState | null;
};

export function Mascot({ onOpen, activeWindow }: Props) {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const hide = () => setShowBubble(false);
    const timer = setTimeout(hide, 2000);
    window.addEventListener('mousemove', hide, { once: true });
    window.addEventListener('pointerdown', hide, { once: true });
    window.addEventListener('keydown', hide, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', hide);
      window.removeEventListener('pointerdown', hide);
      window.removeEventListener('keydown', hide);
    };
  }, []);

  const animate = activeWindow
    ? { left: activeWindow.x + activeWindow.width - 46, top: activeWindow.y - 34, x: '-50%', y: '-50%' }
    : { left: '50%', top: 'auto' as const, bottom: 92, x: '-50%', y: '0%' };

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open README"
      animate={animate}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{ position: 'absolute' }}
      className="z-30"
    >
      <div className="animate-floaty relative">
        <svg width="68" height="80" viewBox="0 0 68 80" className="drop-shadow-[0_10px_20px_rgba(201,168,106,0.25)]">
          {/* Antenna */}
          <line x1="34" y1="10" x2="34" y2="4" stroke="#c9a86a" strokeWidth="1.5" />
          <circle cx="34" cy="3" r="2.2" fill="#c9a86a" />
          {/* Head */}
          <rect x="12" y="12" width="44" height="34" rx="10" fill="#1f1c17" stroke="#c9a86a" strokeWidth="1.2" />
          {/* Screen */}
          <rect x="16" y="16" width="36" height="26" rx="7" fill="#0e0d0b" />
          {/* Eyes */}
          <circle cx="26" cy="29" r="2.6" fill="#c9a86a">
            <animate attributeName="r" values="2.6;0.4;2.6" keyTimes="0;0.5;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="42" cy="29" r="2.6" fill="#c9a86a">
            <animate attributeName="r" values="2.6;0.4;2.6" keyTimes="0;0.5;1" dur="4s" repeatCount="indefinite" />
          </circle>
          {/* Smile */}
          <path d="M28 36 Q34 40 40 36" stroke="#c9a86a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {/* Body */}
          <rect x="18" y="48" width="32" height="22" rx="6" fill="#25211a" stroke="#c9a86a" strokeWidth="1.2" />
          {/* Body light */}
          <circle cx="34" cy="59" r="1.8" fill="#c9a86a">
            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mt-1 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-white/70 backdrop-blur text-center"
            >
              say hi
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
