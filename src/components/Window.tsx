import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { WindowState } from '../os/types';
import type { WindowManager } from '../os/useWindowManager';

type Props = {
  state: WindowState;
  wm: WindowManager;
  children: ReactNode;
  sidebar?: ReactNode;
  toolbar?: ReactNode;
};

export function Window({ state, wm, children, sidebar, toolbar }: Props) {
  const dragOrigin = useRef<{ x: number; y: number } | null>(null);

  if (state.minimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        position: 'absolute',
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: state.z,
      }}
      onMouseDown={() => wm.focus(state.id)}
      className="rounded-xl overflow-hidden glass-strong shadow-window flex flex-col select-none"
      role="dialog"
      aria-label={state.title}
    >
      {/* Title bar */}
      <div
        className="h-9 flex items-center px-3 gap-2 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-transparent cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          dragOrigin.current = { x: e.clientX - state.x, y: e.clientY - state.y };
        }}
        onPointerMove={(e) => {
          if (!dragOrigin.current) return;
          const nx = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOrigin.current.x));
          const ny = Math.max(28, Math.min(window.innerHeight - 40, e.clientY - dragOrigin.current.y));
          wm.move(state.id, nx, ny);
        }}
        onPointerUp={() => (dragOrigin.current = null)}
        onDoubleClick={() => wm.toggleMaximize(state.id)}
      >
        <div className="group/tl flex items-center gap-1.5">
          <button
            aria-label="Close"
            onClick={() => wm.close(state.id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition grid place-items-center text-[#4d0000]"
          >
            <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 group-hover/tl:opacity-100 transition" aria-hidden>
              <path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
          </button>
          <button
            aria-label="Minimize"
            onClick={() => wm.minimize(state.id)}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition grid place-items-center text-[#5a3a00]"
          >
            <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 group-hover/tl:opacity-100 transition" aria-hidden>
              <path d="M2 5 L8 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button
            aria-label={state.maximized ? 'Restore' : 'Maximize'}
            onClick={() => wm.toggleMaximize(state.id)}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition grid place-items-center text-[#0a3d0f]"
          >
            {state.maximized ? (
              <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 group-hover/tl:opacity-100 transition" aria-hidden>
                <path d="M6 2 L2 2 L2 6 Z M4 8 L8 8 L8 4 Z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="w-2 h-2 opacity-0 group-hover/tl:opacity-100 transition" aria-hidden>
                <path d="M2 6 L2 2 L6 2 Z M8 4 L8 8 L4 8 Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex-1 text-center text-[12px] text-white/60 font-medium tracking-wide">
          {state.title}
        </div>
        <div className="w-14" />
      </div>

      {toolbar && (
        <div className="h-11 flex items-center px-3 gap-2 border-b border-white/[0.05] bg-black/20">
          {toolbar}
        </div>
      )}

      <div className="flex-1 min-h-0 flex">
        {sidebar && (
          <aside className="w-52 shrink-0 border-r border-white/[0.05] bg-black/25 overflow-y-auto">
            {sidebar}
          </aside>
        )}
        <div className="flex-1 min-w-0 overflow-y-auto">{children}</div>
      </div>
    </motion.div>
  );
}
