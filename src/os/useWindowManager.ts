import { useCallback, useState } from 'react';
import type { AppId, WindowState } from './types';

const DEFAULT_SIZE: Record<AppId, { w: number; h: number; title: string }> = {
  about: { w: 720, h: 520, title: 'About' },
  experience: { w: 820, h: 560, title: 'Experience' },
  skills: { w: 720, h: 520, title: 'Skills' },
  projects: { w: 960, h: 600, title: 'Projects' },
  education: { w: 640, h: 460, title: 'Education' },
  contact: { w: 600, h: 480, title: 'Contact' },
  resume: { w: 820, h: 620, title: 'Resume' },
  readme: { w: 640, h: 500, title: 'README.md' },
};

let idCounter = 1;
let zCounter = 10;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const focus = useCallback((id: string) => {
    setWindows((ws) => {
      const top = ++zCounter;
      return ws.map((w) => (w.id === id ? { ...w, z: top, minimized: false } : w));
    });
  }, []);

  const open = useCallback((app: AppId) => {
    setWindows((ws) => {
      const existing = ws.find((w) => w.app === app);
      if (existing) {
        const top = ++zCounter;
        return ws.map((w) => (w.id === existing.id ? { ...w, z: top, minimized: false } : w));
      }
      const def = DEFAULT_SIZE[app];
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
      const width = Math.min(def.w, vw - 120);
      const height = Math.min(def.h, vh - 160);
      const offset = ws.length * 26;
      const x = Math.max(80, Math.min(vw - width - 320, 180 + offset));
      const y = Math.max(60, Math.min(vh - height - 120, 90 + offset));
      const id = `w${idCounter++}`;
      return [
        ...ws,
        { id, app, title: def.title, x, y, width, height, z: ++zCounter, minimized: false, maximized: false },
      ];
    });
  }, []);

  const close = useCallback((id: string) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prev) {
          return { ...w, maximized: false, ...w.prev, prev: undefined };
        }
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          ...w,
          maximized: true,
          prev: { x: w.x, y: w.y, width: w.width, height: w.height },
          x: 40,
          y: 60,
          width: vw - 80,
          height: vh - 140,
        };
      })
    );
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  return { windows, open, close, focus, minimize, toggleMaximize, move };
}

export type WindowManager = ReturnType<typeof useWindowManager>;
