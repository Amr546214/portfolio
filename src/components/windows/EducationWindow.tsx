import { GraduationCap, Award } from 'lucide-react';
import { useEducation } from '../../lib/hooks';

export function EducationWindow() {
  const { data: education, loading } = useEducation();
  if (loading) return <div className="p-8 text-white/50">Loading…</div>;
  const certs = education.flatMap((e) => e.description ? e.description.split(',').map((s) => s.trim()).filter(Boolean) : []);
  return (
    <div className="p-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Academic</p>
      <h2 className="mt-1 text-2xl font-semibold text-white tracking-tight">Education</h2>

      <div className="mt-6 space-y-3">
        {education.map((e) => (
          <div key={e.id} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <div className="flex items-start gap-3">
              <div className="tile-gold w-10 h-10 rounded-lg grid place-items-center shrink-0"><GraduationCap className="w-5 h-5 text-os-gold" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-[15px] font-medium leading-tight">{e.degree}</h3>
                <p className="text-os-gold text-[13px] mt-0.5">{e.institution}</p>
                <div className="mt-2 flex items-center gap-2 text-[12px] text-white/55">
                  <span>{e.start_date} — {e.end_date}</span>
                  {e.gpa && (<>
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span>GPA · {e.gpa}</span>
                  </>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certs.length > 0 && (
        <>
          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-white/40">Certifications</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {certs.map((c) => (
              <div key={c} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                <Award className="w-4 h-4 text-os-gold" />
                <span className="text-[13px] text-white/80">{c}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
