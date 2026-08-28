import { useState, useEffect } from 'react';
import { fetchAllEducation, createEducation, updateEducation, deleteEducation } from '../lib/services';
import type { Education } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminTextarea, AdminButton, AdminToggle } from './ui';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminEducation() {
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Education | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => { fetchAllEducation().then(setItems); };
  useEffect(load, []);

  const blank: Education = {
    id: '', institution: '', degree: '', field: '', start_date: '', end_date: '',
    description: '', gpa: '', display_order: items.length, is_visible: true,
    created_at: '', updated_at: '',
  };

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateEducation(editing.id, editing);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, updated_at: _ua, ...data } = editing;
      await createEducation(data);
    }
    setEditing(null);
    setCreating(false);
    load();
  };

  return (
    <div>
      <AdminHeader title="Education" subtitle={`${items.length} entries`} action={
        <AdminButton onClick={() => { setEditing(blank); setCreating(true); }}><Plus className="w-3.5 h-3.5 inline mr-1" />Add</AdminButton>
      } />
      <div className="space-y-2 max-w-2xl">
        {items.map((e) => (
          <AdminCard key={e.id} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-white text-[14px] font-medium">{e.degree}</p>
              <p className="text-white/50 text-[12px]">{e.institution}{!e.is_visible ? ' · Hidden' : ''}</p>
            </div>
            <button onClick={() => setEditing(e)} className="text-white/50 hover:text-white transition"><Pencil className="w-4 h-4" /></button>
            <button onClick={async () => { await deleteEducation(e.id); load(); }} className="text-red-400/60 hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
          </AdminCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="glass rounded-2xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg">{creating ? 'Add Education' : 'Edit Education'}</h2>
            <AdminInput label="Institution" value={editing.institution} onChange={(v) => setEditing({ ...editing, institution: v })} />
            <AdminInput label="Degree" value={editing.degree} onChange={(v) => setEditing({ ...editing, degree: v })} />
            <AdminInput label="Field" value={editing.field} onChange={(v) => setEditing({ ...editing, field: v })} />
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="Start Date" value={editing.start_date} onChange={(v) => setEditing({ ...editing, start_date: v })} />
              <AdminInput label="End Date" value={editing.end_date} onChange={(v) => setEditing({ ...editing, end_date: v })} />
            </div>
            <AdminInput label="GPA" value={editing.gpa} onChange={(v) => setEditing({ ...editing, gpa: v })} />
            <AdminTextarea label="Description / Certifications" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} rows={2} />
            <AdminInput label="Display Order" type="number" value={String(editing.display_order)} onChange={(v) => setEditing({ ...editing, display_order: Number(v) })} />
            <AdminToggle label="Visible" checked={editing.is_visible} onChange={(v) => setEditing({ ...editing, is_visible: v })} />
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
