import { useState, useEffect } from 'react';
import { fetchAllSkills, createSkill, updateSkill, deleteSkill } from '../lib/services';
import type { Skill } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminTextarea, AdminButton, AdminToggle } from './ui';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { fetchAllSkills().then(setSkills); };
  useEffect(load, []);

  const blank: Skill = {
    id: '', name: '', category: '', description: '', icon: '',
    display_order: skills.length, is_featured: false, is_visible: true,
    created_at: '', updated_at: '',
  };

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateSkill(editing.id, editing);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, updated_at: _ua, ...data } = editing;
      await createSkill(data);
    }
    setEditing(null);
    setCreating(false);
    load();
  };

  return (
    <div>
      <AdminHeader title="Skills" subtitle={`${skills.length} skills`} action={
        <AdminButton onClick={() => { setEditing(blank); setCreating(true); }}><Plus className="w-3.5 h-3.5 inline mr-1" />Add Skill</AdminButton>
      } />
      <div className="space-y-2 max-w-2xl">
        {skills.map((s) => (
          <AdminCard key={s.id} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-white text-[14px] font-medium">{s.name}</p>
              <p className="text-white/50 text-[12px]">{s.category} · Order: {s.display_order}{s.is_featured ? ' · Featured' : ''}{!s.is_visible ? ' · Hidden' : ''}</p>
            </div>
            <button onClick={() => setEditing(s)} className="text-white/50 hover:text-white transition"><Pencil className="w-4 h-4" /></button>
            <button onClick={async () => { await deleteSkill(s.id); load(); }} className="text-red-400/60 hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
          </AdminCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="glass rounded-2xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg">{creating ? 'Add Skill' : 'Edit Skill'}</h2>
            <AdminInput label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <AdminInput label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} />
            <AdminTextarea label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} rows={2} />
            <AdminInput label="Icon" value={editing.icon} onChange={(v) => setEditing({ ...editing, icon: v })} />
            <AdminInput label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) })} />
            <div className="flex gap-4">
              <AdminToggle label="Featured" checked={editing.is_featured} onChange={(v) => setEditing({ ...editing, is_featured: v })} />
              <AdminToggle label="Visible" checked={editing.is_visible} onChange={(v) => setEditing({ ...editing, is_visible: v })} />
            </div>
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
