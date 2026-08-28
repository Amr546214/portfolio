import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { SocialLink } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminButton, AdminToggle } from './ui';
import { Plus, Trash2, Pencil } from 'lucide-react';

export function AdminSocialLinks() {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('social_links').select('*').order('display_order');
    if (data) setItems(data as SocialLink[]);
  };
  useEffect(() => { load(); }, []);

  const blank: SocialLink = {
    id: '', platform: '', label: '', url: '', icon: '',
    display_order: items.length, is_visible: true,
    created_at: '', updated_at: '',
  };

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await supabase.from('social_links').update(editing).eq('id', editing.id);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, created_at: _ca, updated_at: _ua, ...data } = editing;
      await supabase.from('social_links').insert(data);
    }
    setEditing(null);
    setCreating(false);
    load();
  };

  return (
    <div>
      <AdminHeader title="Social Links" subtitle={`${items.length} links`} action={
        <AdminButton onClick={() => { setEditing(blank); setCreating(true); }}><Plus className="w-3.5 h-3.5 inline mr-1" />Add</AdminButton>
      } />
      <div className="space-y-2 max-w-2xl">
        {items.map((s) => (
          <AdminCard key={s.id} className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-white text-[14px] font-medium">{s.platform}</p>
              <p className="text-white/50 text-[12px]">{s.label} · {s.url}{!s.is_visible ? ' · Hidden' : ''}</p>
            </div>
            <button onClick={() => setEditing(s)} className="text-white/50 hover:text-white transition"><Pencil className="w-4 h-4" /></button>
            <button onClick={async () => { await supabase.from('social_links').delete().eq('id', s.id); load(); }} className="text-red-400/60 hover:text-red-400 transition"><Trash2 className="w-4 h-4" /></button>
          </AdminCard>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4" onClick={() => { setEditing(null); setCreating(false); }}>
          <div className="glass rounded-2xl p-6 w-full max-w-md space-y-3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-white font-semibold text-lg">{creating ? 'Add Link' : 'Edit Link'}</h2>
            <AdminInput label="Platform" value={editing.platform} onChange={(v) => setEditing({ ...editing, platform: v })} placeholder="github, linkedin, email, phone..." />
            <AdminInput label="Label" value={editing.label} onChange={(v) => setEditing({ ...editing, label: v })} />
            <AdminInput label="URL" value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} />
            <AdminInput label="Icon (optional)" value={editing.icon} onChange={(v) => setEditing({ ...editing, icon: v })} />
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
