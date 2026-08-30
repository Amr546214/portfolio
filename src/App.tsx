import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { AppId } from './os/types';
import { MenuBar } from './components/MenuBar';
import { DesktopIcons } from './components/DesktopIcons';
import { Dock } from './components/Dock';
import { WidgetPanel } from './components/WidgetPanel';
import { Window } from './components/Window';
import { Mascot } from './components/Mascot';
import { BootScreen } from './components/BootScreen';
import { MobileView } from './components/MobileView';
import { useWindowManager } from './os/useWindowManager';
import { useProfile } from './lib/hooks';
import { Admin } from './admin/Admin';
import { renderApp } from './os/renderApp';

function useIsMobile() {
  const [is, setIs] = useState(() => typeof window !== 'undefined' && window.innerWidth < 900);
  useEffect(() => {
    const onResize = () => setIs(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return is;
}

export default function App() {
  const wm = useWindowManager();
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#/admin');
  const peekRef = useRef<{ app: AppId; wasMinimized: boolean; didNotExist: boolean } | null>(null);
  const peekTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!booted) return;
    if (!isMobile && wm.windows.length === 0) {
      wm.open('about');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  if (isAdmin) return <Admin />;

  const activeApp = (() => {
    if (wm.windows.length === 0) return 'AmrOS';
    const top = [...wm.windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
    return top?.title ?? 'AmrOS';
  })();

  if (isMobile) {
    return (
      <>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
        <div className="h-full w-full relative">
          <BackgroundFX />
          <MobileView />
        </div>
      </>
    );
  }

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <div className="h-full w-full flex flex-col overflow-hidden">
        <MenuBar activeApp={activeApp} wm={wm} onOpen={wm.open} />
        <div className="relative flex-1 min-h-0 flex">
          <BackgroundFX />
          <DesktopIcons onOpen={wm.open} />

          <div className="flex-1 min-w-0 relative">
            {/* Hero title, centered within the middle area between icons and widget panel */}
            <HeroLayer />
            <AnimatePresence>
              {wm.windows.map((w) => (
                <Window key={w.id} state={w} wm={wm}>
                  {renderApp(w.app)}
                </Window>
              ))}
            </AnimatePresence>
            <Mascot
              onOpen={() => wm.open('readme')}
              activeWindow={[...wm.windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0] ?? null}
            />
          </div>

          <WidgetPanel onOpen={wm.open} />
        </div>
        <Dock
          onOpen={(app) => {
            peekRef.current = null;
            wm.open(app);
          }}
          openApps={wm.windows.map((w) => w.app)}
          minimizedApps={wm.windows.filter((w) => w.minimized).map((w) => w.app)}
          onPeekStart={(app) => {
            if (peekTimeout.current) { clearTimeout(peekTimeout.current); peekTimeout.current = null; }
            if (peekRef.current && peekRef.current.app !== app) {
              // committing previous peek's restore before starting new one
              const prev = peekRef.current;
              const w = wm.windows.find((x) => x.app === prev.app);
              if (w) {
                if (prev.didNotExist) wm.close(w.id);
                else if (prev.wasMinimized) wm.minimize(w.id);
              }
            }
            const existing = wm.windows.find((w) => w.app === app);
            peekRef.current = {
              app,
              wasMinimized: !!existing?.minimized,
              didNotExist: !existing,
            };
            wm.open(app);
          }}
          onPeekEnd={(app) => {
            if (peekTimeout.current) clearTimeout(peekTimeout.current);
            peekTimeout.current = setTimeout(() => {
              const info = peekRef.current;
              if (!info || info.app !== app) return;
              peekRef.current = null;
              const w = wm.windows.find((x) => x.app === app);
              if (!w) return;
              if (info.didNotExist) wm.close(w.id);
              else if (info.wasMinimized) wm.minimize(w.id);
            }, 120);
          }}
        />
      </div>
    </>
  );
}

function BackgroundFX() {
  return (
    <>
      {/* Radial gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_20%,rgba(201,168,106,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(90,70,40,0.20),transparent_70%)]" />
        {/* subtle ring */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-white/[0.025]" />
        <div className="absolute inset-0 noise opacity-[0.35] mix-blend-overlay" />
      </div>
    </>
  );
}

function HeroLayer() {
  const { data: profile } = useProfile();
  if (!profile) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 text-center z-0 select-none"
    >
      <p className="text-[10px] uppercase tracking-[0.4em] text-os-gold/60">portfolio · v1.0</p>
      <h1 className="mt-2 text-[64px] leading-[0.95] font-semibold tracking-tight">
        <span className="bg-gradient-to-br from-white via-white/80 to-os-gold bg-clip-text text-transparent">
          {profile.short_name}
        </span>
      </h1>
      <p className="mt-3 text-[13px] text-white/45">{profile.headline} · {profile.location}</p>
    </motion.div>
  );
}
