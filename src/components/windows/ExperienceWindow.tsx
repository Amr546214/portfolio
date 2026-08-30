import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useExperiences } from '../../lib/hooks';

export function ExperienceWindow() {
  const { data: experiences, loading } = useExperiences();
  if (loading) return <div className="p-8 text-white/50">Loading…</div>;
  return (
    <div className="p-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Career</p>
      <h2 className="mt-1 text-2xl font-semibold text-white tracking-tight">Experience</h2>
      <p className="text-white/50 text-[13px] mt-1">{experiences.length} roles · Full-time & internship</p>

      <div className="relative mt-8 pl-6">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-os-gold/40 via-white/10 to-transparent" />
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="relative pb-8 last:pb-2"
          >
            <span className="absolute -left-[18px] top-1.5 w-3 h-3 rounded-full bg-os-gold shadow-[0_0_12px_rgba(201,168,106,0.7)] ring-4 ring-os-bg" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-white text-[15px] font-medium leading-tight">{exp.position}</h3>
                <p className="text-os-gold text-[13px] mt-0.5">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </p>
              </div>
              <span className="text-[11px] text-white/45 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.05] flex items-center gap-1 shrink-0 self-start"><Briefcase className="w-3 h-3" />{exp.start_date} — {exp.end_date}</span>
            </div>
            <p className="mt-3 text-[13px] text-white/70 leading-relaxed">{exp.description}</p>
            {exp.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-[11px] rounded bg-white/[0.05] border border-white/[0.06] text-white/70">{tech}</span>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
