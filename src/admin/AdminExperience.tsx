import { useState, useEffect } from 'react';
import { fetchAllExperiences, createExperience, updateExperience, deleteExperience } from '../lib/services';
import type { Experience } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminTextarea, AdminButton, AdminToggle } from './ui';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { fetchAllExperiences().then(setItems); };
  useEffect(load, []);

  const blank: Experience = {
    id: '', company: '', position: '', location: '', start_date: '', end_date: '',
    is_current: false, description: '', technologies: [], display_order: items.length,
    is_visible: true, created_at: '', updated_at: '',
  };

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateExperience(editing.id, editing);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, updated_at: _ua, ...data } = editing;
      await createExperience(data);
    }
    setEditing(null);
    setCreating(false);
    load();
  };

  return (
    <div>
      <AdminHeader title="Experience" subtitle={`${items.length} entries`} action={
        <AdminButton onClick={() => { setEditing(blank); setCreating(true); }}><Plus className="w-3.5 h-3.5 inline mr-1" />Add</AdminButton>
      } />
      <div className="space-y-2 max-w-2xl">
        {items.map((e) => (
          <AdminCard key={e.id} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-white text-[14px] font-medium">{e.position} @ {e.company}</p>
              <p className="text-white/50 text-[12px]">{e.start_date} — {e.end_date}{!e.is_visible ? ' · Hidden' : ''}</p>
            </div>
            <button onClick={() => setEditing(e)} className="text-white/50 hover:text-white transition"><Pencil className="w-4 h-4" /></button>
            <button onClick={async () => { await deleteExperience(e.id); load(); }} className="text-red-400/60 hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
          </AdminCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="glass rounded-2xl p-6 w-full max-w-md space-y-3 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg">{creating ? 'Add Experience' : 'Edit Experience'}</h2>
            <AdminInput label="Position" value={editing.position} onChange={(v) => setEditing({ ...editing, position: v })} />
            <AdminInput label="Company" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
            <AdminInput label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="Start Date" value={editing.start_date} onChange={(v) => setEditing({ ...editing, start_date: v })} />
              <AdminInput label="End Date" value={editing.end_date} onChange={(v) => setEditing({ ...editing, end_date: v })} />
            </div>
            <AdminTextarea label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} rows={4} />
            <AdminInput label="Technologies (comma-separated)" value={editing.technologies.join(', ')} onChange={(v) => setEditing({ ...editing, technologies: v.split(',').map((s) => s.trim()).filter(Boolean) })} />
            <AdminInput label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) })} />
            <div className="flex gap-4">
              <AdminToggle label="Current" checked={editing.is_current} onChange={(v) => setEditing({ ...editing, is_current: v })} />
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
