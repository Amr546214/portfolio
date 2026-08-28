import { useState, useEffect } from 'react';
import { fetchAllProjects, createProject, updateProject, deleteProject, uploadFile, fetchProjectTechnologies, addProjectTechnology, removeProjectTechnology } from '../lib/services';
import type { Project, ProjectTechnology } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminTextarea, AdminButton, AdminToggle } from './ui';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [techs, setTechs] = useState<ProjectTechnology[]>([]);
  const [newTech, setNewTech] = useState('');

  const load = () => { fetchAllProjects().then(setItems); };
  useEffect(load, []);

  const blank: Project = {
    id: '', title: '', slug: '', short_description: '', description: '',
    thumbnail_url: null, live_url: null, github_url: null, featured: false,
    tags: [], display_order: items.length, is_visible: true,
    created_at: '', updated_at: '',
  };

  const openEditor = async (p: Project) => {
    setEditing(p);
    setCreating(!p.id);
    if (p.id) {
      const t = await fetchProjectTechnologies(p.id);
      setTechs(t);
    } else {
      setTechs([]);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    let savedId = editing.id;
    if (editing.id) {
      await updateProject(editing.id, editing);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, updated_at: _ua, ...data } = editing;
      const created = await createProject(data);
      if (created) savedId = created.id;
    }
    setEditing(null);
    setCreating(false);
    load();
    if (savedId) {
      // technologies are managed in the editor
    }
  };

  const handleAddTech = async () => {
    if (!editing?.id || !newTech.trim()) return;
    await addProjectTechnology(editing.id, newTech.trim(), techs.length);
    setNewTech('');
    const t = await fetchProjectTechnologies(editing.id);
    setTechs(t);
  };

  const handleRemoveTech = async (techId: string) => {
    await removeProjectTechnology(techId);
    if (editing?.id) {
      const t = await fetchProjectTechnologies(editing.id);
      setTechs(t);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const url = await uploadFile('projects', `${editing.slug || 'temp'}-thumb.jpg`, file);
    if (url) setEditing({ ...editing, thumbnail_url: url });
  };

  return (
    <div>
      <AdminHeader title="Projects" subtitle={`${items.length} projects`} action={
        <AdminButton onClick={() => openEditor(blank)}><Plus className="w-3.5 h-3.5 inline mr-1" />Add</AdminButton>
      } />
      <div className="space-y-2 max-w-2xl">
        {items.map((p) => (
          <AdminCard key={p.id} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-white text-[14px] font-medium">{p.title}{p.featured ? ' ★' : ''}</p>
              <p className="text-white/50 text-[12px]">{p.slug}{!p.is_visible ? ' · Hidden' : ''}</p>
            </div>
            <button onClick={() => openEditor(p)} className="text-white/50 hover:text-white transition"><Pencil className="w-4 h-4" /></button>
            <button onClick={async () => { await deleteProject(p.id); load(); }} className="text-red-400/60 hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
          </AdminCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="glass rounded-2xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg">{creating ? 'Add Project' : 'Edit Project'}</h2>
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
              <AdminInput label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
            </div>
            <AdminInput label="Short Description" value={editing.short_description} onChange={(v) => setEditing({ ...editing, short_description: v })} />
            <AdminTextarea label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} rows={4} />
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="GitHub URL" value={editing.github_url ?? ''} onChange={(v) => setEditing({ ...editing, github_url: v || null })} />
              <AdminInput label="Live URL" value={editing.live_url ?? ''} onChange={(v) => setEditing({ ...editing, live_url: v || null })} />
            </div>
            <AdminInput label="Tags (comma-separated)" value={editing.tags.join(', ')} onChange={(v) => setEditing({ ...editing, tags: v.split(',').map((s) => s.trim()).filter(Boolean) })} />
            <AdminInput label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) })} />
            <div className="flex gap-4">
              <AdminToggle label="Featured" checked={editing.featured} onChange={(v) => setEditing({ ...editing, featured: v })} />
              <AdminToggle label="Visible" checked={editing.is_visible} onChange={(v) => setEditing({ ...editing, is_visible: v })} />
            </div>
            <div>
              <span className="text-[12px] text-white/60 mb-1 block">Thumbnail</span>
              <div className="flex items-center gap-3">
                {editing.thumbnail_url && <img src={editing.thumbnail_url} alt="Thumb" className="w-16 h-10 rounded object-cover" />}
                <label className="cursor-pointer">
                  <span className="px-3 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/70 text-[13px] hover:bg-white/[0.08] transition inline-flex items-center">Upload</span>
                  <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                </label>
              </div>
            </div>
            {editing.id && (
              <div>
                <span className="text-[12px] text-white/60 mb-1 block">Technologies</span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {techs.map((t) => (
                    <span key={t.id} className="px-2 py-0.5 text-[11px] rounded bg-white/[0.05] border border-white/[0.06] text-white/80 flex items-center gap-1">
                      {t.technology}
                      <button onClick={() => handleRemoveTech(t.id)} className="text-red-400/60 hover:text-red-400">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={newTech} onChange={(e) => setNewTech(e.target.value)} placeholder="Add technology" className="flex-1 h-8 px-2 rounded bg-white/[0.05] border border-white/[0.08] text-white text-[12px] focus:border-os-gold/60 focus:outline-none" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }} />
                  <AdminButton variant="ghost" onClick={handleAddTech}>Add</AdminButton>
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <AdminButton onClick={handleSave}>Save</AdminButton>
              <AdminButton variant="ghost" onClick={() => { setEditing(null); setCreating(false); }}>Cancel</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
