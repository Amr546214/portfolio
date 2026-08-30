import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Search, FolderKanban, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../brand-icons';
import { useProjects } from '../../lib/hooks';
import { fetchProjectTechnologies, type Project, type ProjectTechnology } from '../../lib/services';

const ALL = 'All projects';
const FEATURED = 'Featured';

export function ProjectsWindow() {
  const { data: projects, loading } = useProjects();
  const [techMap, setTechMap] = useState<Record<string, ProjectTechnology[]>>({});
  const [filter, setFilter] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<ProjectTechnology[]>([]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  useMemo(() => {
    if (projects.length === 0) return;
    Promise.all(projects.map((p) => fetchProjectTechnologies(p.id))).then((results) => {
      const map: Record<string, ProjectTechnology[]> = {};
      projects.forEach((p, i) => { map[p.id] = results[i]; });
      setTechMap(map);
    });
  }, [projects]);

  const filtered = projects.filter((p) => {
    if (filter === ALL) {
      // no tag filter
    } else if (filter === FEATURED) {
      if (!p.featured) return false;
    } else {
      if (!p.tags.includes(filter)) return false;
    }
    if (query) {
      const q = query.toLowerCase();
      const techs = (techMap[p.id] ?? []).map((t) => t.technology).join(' ');
      if (!(p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || techs.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const openProject = (p: Project) => {
    setSelected(p);
    setSelectedTechs(techMap[p.id] ?? []);
  };

  if (loading) return <div className="p-8 text-white/50">Loading…</div>;

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0">
      {/* Sidebar */}
      <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.05] bg-black/25 overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-y-auto p-3">
        <p className="px-2 text-[10px] uppercase tracking-widest text-white/40 mt-1">Project Explorer</p>
        <p className="px-2 text-[11px] text-white/40 mt-1 mb-3 leading-snug">A curated view of my strongest work across platforms.</p>
        <p className="px-2 text-[10px] uppercase tracking-widest text-white/40 mt-2 mb-1">Quick access</p>
        <SidebarBtn active={filter === ALL} onClick={() => setFilter(ALL)} label={ALL} count={projects.length} />
        <SidebarBtn active={filter === FEATURED} onClick={() => setFilter(FEATURED)} label={FEATURED} count={projects.filter((p) => p.featured).length} icon={<Star className="w-3 h-3" />} />
        <p className="px-2 text-[10px] uppercase tracking-widest text-white/40 mt-4 mb-1">Tags</p>
        {tags.map((t) => (
          <SidebarBtn key={t} active={filter === t} onClick={() => setFilter(t)} label={t} count={projects.filter((p) => p.tags.includes(t)).length} />
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1a1c]/95 to-[#1a1a1c]/70 backdrop-blur px-6 py-3 border-b border-white/[0.05] flex items-center gap-3">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Project Explorer</p>
            <div className="flex-1" />
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="pl-7 pr-3 h-7 rounded-md text-[12px] bg-white/[0.05] border border-white/[0.06] focus:border-os-gold/60 focus:outline-none text-white placeholder-white/40 w-56"
              />
            </div>
          </div>
          <div className="px-6 py-6">
            <h2 className="text-2xl font-semibold text-white tracking-tight">{filter}</h2>
            <p className="text-[12px] text-white/45 mt-1">{filtered.length} project{filtered.length === 1 ? '' : 's'}</p>
            <div className={`mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ${selected ? '' : 'xl:grid-cols-3'}`}>
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} techCount={(techMap[p.id] ?? []).length} index={i} active={selected?.id === p.id} onOpen={() => openProject(p)} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-white/50 text-sm">No projects match this filter.</div>
              )}
            </div>
          </div>
        </div>

        {/* Detail */}
        <AnimatePresence>
          {selected && (
            <motion.aside
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="w-full md:w-[300px] shrink-0 border-t md:border-t-0 md:border-l border-white/[0.05] bg-black/30 overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">Project Explorer</p>
                  <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition"><X className="w-3.5 h-3.5" /></button>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white tracking-tight leading-tight">{selected.title}</h3>
                {selected.featured && <span className="mt-2 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-os-gold/15 text-os-gold border border-os-gold/30"><Star className="w-2.5 h-2.5" /> Featured</span>}
                <p className="mt-4 text-[12.5px] text-white/70 leading-relaxed">{selected.description}</p>
                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTechs.map((t) => (
                      <span key={t.id} className="px-2 py-0.5 text-[11px] rounded bg-white/[0.05] border border-white/[0.06] text-white/80">{t.technology}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[11px] rounded bg-os-gold/10 border border-os-gold/25 text-os-gold">{t}</span>
                    ))}
                  </div>
                </div>
                {(selected.github_url || selected.live_url) && (
                  <div className="mt-5 flex gap-2">
                    {selected.github_url && <a href={selected.github_url} target="_blank" rel="noreferrer" className="flex-1 h-8 rounded-lg bg-white/[0.05] border border-white/[0.06] text-[11px] text-white/80 grid place-items-center hover:bg-white/[0.08] transition">GitHub</a>}
                    {selected.live_url && <a href={selected.live_url} target="_blank" rel="noreferrer" className="flex-1 h-8 rounded-lg bg-os-gold/15 border border-os-gold/30 text-[11px] text-os-gold grid place-items-center hover:bg-os-gold/20 transition">Live Demo</a>}
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SidebarBtn({ active, onClick, label, count, icon }: { active: boolean; onClick: () => void; label: string; count: number; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] transition ${active ? 'bg-os-gold/15 text-os-gold' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'}`}
    >
      {icon ?? <span className="w-3 h-3 rounded-full border border-current opacity-50" />}
      <span className="flex-1 text-left truncate">{label}</span>
      <span className="text-[11px] text-white/40">{count}</span>
    </button>
  );
}

function ProjectCard({ project, techCount, index, active, onOpen }: { project: Project; techCount: number; index: number; active: boolean; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -3 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      className={`group relative text-left rounded-xl overflow-hidden border transition-colors cursor-pointer ${active ? 'border-os-gold/50 ring-1 ring-os-gold/30' : 'border-white/[0.06] hover:border-white/[0.14]'}`}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        {project.thumbnail_url ? (
          <img src={project.thumbnail_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <>
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: gradientFor(project.slug) }} />
            <div className="absolute inset-0 grid place-items-center">
              <FolderKanban className="w-10 h-10 text-white/25 group-hover:text-white/40 transition" />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        {project.featured && (
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-os-gold border border-os-gold/30 backdrop-blur"><Star className="w-2.5 h-2.5" /> Featured</span>
        )}
        <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white/70 border border-white/10 backdrop-blur">{techCount}</span>
        {/* Link buttons overlay */}
        {(project.live_url || project.github_url) && (
          <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="View source on GitHub"
                className="w-7 h-7 rounded-md bg-black/70 hover:bg-black/90 border border-white/10 text-white/80 hover:text-white grid place-items-center backdrop-blur transition"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Open live demo"
                className="w-7 h-7 rounded-md bg-os-gold/90 hover:bg-os-gold border border-os-gold/50 text-black grid place-items-center backdrop-blur transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-[13.5px] font-medium text-white truncate">{project.title}</p>
        <p className="text-[11px] text-white/50 truncate mt-0.5">{project.tags.join(' · ')}</p>
      </div>
    </motion.div>
  );
}

function gradientFor(slug: string): string {
  const map: Record<string, string> = {
    'verbivore-lms': 'radial-gradient(120% 100% at 0% 0%, #3a2a55 0%, #1a1a2e 60%)',
    'teamup-platform': 'radial-gradient(120% 100% at 100% 0%, #1e4d5a 0%, #10202a 60%)',
    'mav-mobile-app': 'radial-gradient(120% 100% at 50% 0%, #5a3320 0%, #1e1210 60%)',
    'skam-event-management': 'radial-gradient(120% 100% at 0% 100%, #4a3d1f 0%, #1c1a10 60%)',
    'ramadan-react-app': 'radial-gradient(120% 100% at 100% 100%, #245c3a 0%, #12241a 60%)',
    'admin-dashboard': 'radial-gradient(120% 100% at 50% 50%, #2a2e4a 0%, #12141f 60%)',
  };
  return map[slug] ?? 'radial-gradient(120% 100% at 50% 50%, #333 0%, #111 60%)';
}
