import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSkills } from '../../lib/hooks';

export function SkillsWindow() {
  const { data: skills, loading } = useSkills();

  const groups = useMemo(() => {
    const map = new Map<string, typeof skills>();
    skills.forEach((s) => {
      const arr = map.get(s.category) ?? [];
      arr.push(s);
      map.set(s.category, arr);
    });
    return Array.from(map.entries()).map(([label, items]) => ({ label, items }));
  }, [skills]);

  if (loading) return <div className="p-8 text-white/50">Loading…</div>;

  return (
    <div className="p-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Toolkit</p>
      <h2 className="mt-1 text-2xl font-semibold text-white tracking-tight">Skills & Technologies</h2>
      <p className="text-white/50 text-[13px] mt-1">The stack I reach for daily</p>

      <div className="mt-8 space-y-6">
        {groups.map((group, gi) => (
          <motion.section
            key={group.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.06 }}
          >
            <div className="flex items-center gap-3">
              <h3 className="text-[12px] uppercase tracking-widest text-os-gold/90 font-medium">{group.label}</h3>
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-white/40">{group.items.length}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item, i) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: gi * 0.06 + i * 0.02 }}
                  className={`px-2.5 py-1 rounded-lg border text-[12px] transition cursor-default ${item.is_featured ? 'bg-os-gold/10 border-os-gold/30 text-os-gold' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.06] text-white/85'}`}
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
