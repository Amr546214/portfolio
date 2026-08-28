import { useEffect, useRef, useState } from 'react';
import { Wifi, Search, Bell, BatteryFull } from 'lucide-react';
import type { AppId } from '../os/types';
import type { WindowManager } from '../os/useWindowManager';
import { useProfile, useSocialLinks } from '../lib/hooks';

type Props = {
  activeApp: string;
  wm: WindowManager;
  onOpen: (app: AppId) => void;
};

type MenuKey = 'File' | 'Edit' | 'View' | 'Window' | 'Help';

const APP_LABELS: Record<AppId, string> = {
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  education: 'Education',
  contact: 'Contact',
  resume: 'Resume',
  readme: 'README',
};

export function MenuBar({ activeApp, wm, onOpen }: Props) {
  const [now, setNow] = useState<string>(() => formatTime(new Date()));
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();

  useEffect(() => {
    const id = setInterval(() => setNow(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMenu(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const topWindow = [...wm.windows].filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0];
  const github = socialLinks.find((s) => s.platform === 'github');
  const linkedin = socialLinks.find((s) => s.platform === 'linkedin');

  const copy = async (text?: string) => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
    setOpenMenu(null);
  };

  const closeMenuAnd = (fn: () => void) => () => { fn(); setOpenMenu(null); };

  const menus: Record<MenuKey, MenuItem[]> = {
    File: [
      { type: 'submenu', label: 'New Window', items: (Object.keys(APP_LABELS) as AppId[]).map((app) => ({
        type: 'action', label: APP_LABELS[app], onClick: () => onOpen(app),
      })) },
      { type: 'separator' },
      { type: 'action', label: 'Close Window', shortcut: '⌘W', disabled: !topWindow, onClick: () => topWindow && wm.close(topWindow.id) },
      { type: 'action', label: 'Close All', disabled: wm.windows.length === 0, onClick: () => wm.windows.forEach((w) => wm.close(w.id)) },
    ],
    Edit: [
      { type: 'action', label: 'Copy Email', disabled: !profile?.email, onClick: () => copy(profile?.email) },
      { type: 'action', label: 'Copy Phone', disabled: !profile?.phone, onClick: () => copy(profile?.phone) },
      { type: 'action', label: 'Copy Location', disabled: !profile?.location, onClick: () => copy(profile?.location) },
      { type: 'separator' },
      { type: 'action', label: 'Copy Site URL', onClick: () => copy(window.location.href) },
    ],
    View: [
      { type: 'action', label: 'Toggle Fullscreen', shortcut: 'F', onClick: () => toggleFullscreen() },
      { type: 'action', label: 'Focus Next Window', disabled: wm.windows.length < 2, onClick: () => cycleFocus(wm, 1) },
      { type: 'action', label: 'Focus Previous Window', disabled: wm.windows.length < 2, onClick: () => cycleFocus(wm, -1) },
    ],
    Window: [
      { type: 'action', label: 'Minimize', shortcut: '⌘M', disabled: !topWindow, onClick: () => topWindow && wm.minimize(topWindow.id) },
      { type: 'action', label: 'Maximize', disabled: !topWindow, onClick: () => topWindow && wm.toggleMaximize(topWindow.id) },
      { type: 'action', label: 'Minimize All', disabled: wm.windows.length === 0, onClick: () => wm.windows.forEach((w) => wm.minimize(w.id)) },
      { type: 'separator' },
      ...(wm.windows.length > 0
        ? wm.windows.map<MenuItem>((w) => ({
            type: 'action',
            label: `${w.minimized ? '·  ' : '   '}${w.title}`,
            onClick: () => wm.focus(w.id),
          }))
        : [{ type: 'action', label: 'No open windows', disabled: true, onClick: () => {} } as MenuItem]),
    ],
    Help: [
      { type: 'action', label: 'About AmrOS', onClick: () => onOpen('about') },
      { type: 'action', label: 'README', onClick: () => onOpen('readme') },
      { type: 'action', label: 'Contact', onClick: () => onOpen('contact') },
      { type: 'separator' },
      { type: 'action', label: 'GitHub', disabled: !github, onClick: () => github && window.open(github.url, '_blank') },
      { type: 'action', label: 'LinkedIn', disabled: !linkedin, onClick: () => linkedin && window.open(linkedin.url, '_blank') },
    ],
  };

  const menuKeys: MenuKey[] = ['File', 'Edit', 'View', 'Window', 'Help'];

  return (
    <div ref={barRef} className="h-7 w-full flex items-center px-3 gap-4 text-[12px] text-white/85 border-b border-white/[0.06] bg-black/50 backdrop-blur-xl relative z-[1000]">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-os-gold shadow-[0_0_10px_rgba(201,168,106,0.7)]" />
        <span className="font-semibold tracking-wide">AmrOS</span>
      </div>
      <span className="font-semibold">{activeApp}</span>
      <div className="hidden md:flex items-center gap-1 text-white/70 relative">
        {menuKeys.map((m) => (
          <div key={m} className="relative">
            <button
              onClick={() => setOpenMenu((cur) => (cur === m ? null : m))}
              onMouseEnter={() => openMenu && setOpenMenu(m)}
              className={`px-2 h-6 rounded transition ${openMenu === m ? 'bg-white/10 text-white' : 'hover:text-white hover:bg-white/[0.05]'}`}
            >
              {m}
            </button>
            {openMenu === m && (
              <Dropdown items={menus[m]} onClose={() => setOpenMenu(null)} onAction={closeMenuAnd} />
            )}
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3 text-white/70">
        <span className="hidden sm:flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {profile?.availability ?? 'Available for work'}</span>
        <BatteryFull className="w-3.5 h-3.5" aria-hidden />
        <Wifi className="w-3.5 h-3.5" aria-hidden />
        <Search className="w-3.5 h-3.5" aria-hidden />
        <Bell className="w-3.5 h-3.5" aria-hidden />
        <span className="tabular-nums">{now}</span>
      </div>
    </div>
  );
}

type MenuItem =
  | { type: 'action'; label: string; shortcut?: string; disabled?: boolean; onClick: () => void }
  | { type: 'submenu'; label: string; items: MenuItem[] }
  | { type: 'separator' };

function Dropdown({
  items,
  onAction,
}: {
  items: MenuItem[];
  onClose: () => void;
  onAction: (fn: () => void) => () => void;
}) {
  const [openSub, setOpenSub] = useState<number | null>(null);
  return (
    <div className="absolute left-0 top-full mt-1 min-w-[200px] rounded-lg border border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-2xl py-1 z-[2000]">
      {items.map((it, i) => {
        if (it.type === 'separator') return <div key={i} className="my-1 border-t border-white/[0.06]" />;
        if (it.type === 'submenu') {
          return (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setOpenSub(i)}
              onMouseLeave={() => setOpenSub((cur) => (cur === i ? null : cur))}
            >
              <div className="flex items-center justify-between px-3 h-7 hover:bg-white/10 text-white/85 cursor-default">
                <span>{it.label}</span>
                <span className="text-white/40 text-[10px]">▸</span>
              </div>
              {openSub === i && (
                <div className="absolute left-full top-0 ml-1 min-w-[180px] rounded-lg border border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-2xl py-1">
                  {it.items.map((sub, j) => (
                    sub.type === 'action' ? (
                      <button
                        key={j}
                        disabled={sub.disabled}
                        onClick={onAction(sub.onClick)}
                        className={`w-full text-left px-3 h-7 flex items-center justify-between transition ${sub.disabled ? 'text-white/30 cursor-not-allowed' : 'text-white/85 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span>{sub.label}</span>
                        {sub.shortcut && <span className="text-white/40 text-[10px]">{sub.shortcut}</span>}
                      </button>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <button
            key={i}
            disabled={it.disabled}
            onClick={onAction(it.onClick)}
            className={`w-full text-left px-3 h-7 flex items-center justify-between transition ${it.disabled ? 'text-white/30 cursor-not-allowed' : 'text-white/85 hover:bg-white/10 hover:text-white'}`}
          >
            <span>{it.label}</span>
            {it.shortcut && <span className="text-white/40 text-[10px]">{it.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen().catch(() => {});
}

function cycleFocus(wm: WindowManager, dir: 1 | -1) {
  const sorted = [...wm.windows].sort((a, b) => a.z - b.z);
  if (sorted.length === 0) return;
  const idx = sorted.length - 1;
  const next = sorted[(idx + dir + sorted.length) % sorted.length];
  wm.focus(next.id);
}

function formatTime(d: Date) {
  const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}  ${time}`;
}
