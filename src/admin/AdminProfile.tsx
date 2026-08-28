import { useState, useEffect } from 'react';
import { fetchProfile, updateProfile, uploadFile } from '../lib/services';
import type { Profile } from '../lib/services';
import { AdminHeader, AdminCard, AdminInput, AdminTextarea, AdminButton } from './ui';

export function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchProfile().then(setProfile); }, []);

  const update = (field: keyof Profile, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await updateProfile(profile.id, {
      name: profile.name,
      short_name: profile.short_name,
      headline: profile.headline,
      short_bio: profile.short_bio,
      long_bio: profile.long_bio,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      availability: profile.availability,
      profile_image: profile.profile_image,
      resume_url: profile.resume_url,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    const url = await uploadFile('profile', 'avatar.jpg', file);
    if (url) { update('profile_image', url); setProfile({ ...profile, profile_image: url }); }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    const ext = (file.name.split('.').pop() || 'pdf').toLowerCase();
    const url = await uploadFile('CV', `resume.${ext}`, file);
    if (url) {
      const bumped = `${url}?t=${Date.now()}`;
      setProfile({ ...profile, resume_url: bumped });
      await updateProfile(profile.id, { resume_url: bumped });
    }
  };

  if (!profile) return <div className="text-white/50">Loading…</div>;

  return (
    <div>
      <AdminHeader title="Profile" subtitle="Your personal and contact information" action={
        <AdminButton onClick={handleSave}>{saving ? 'Saving…' : saved ? 'Saved!' : 'Save'}</AdminButton>
      } />
      <div className="space-y-4 max-w-2xl">
        <AdminCard>
          <div className="flex items-center gap-4 mb-4">
            {profile.profile_image ? (
              <img src={profile.profile_image} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-os-gold/20 grid place-items-center text-os-gold text-xs">No image</div>
            )}
            <label className="cursor-pointer">
              <span className="px-3 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/70 text-[13px] hover:bg-white/[0.08] transition inline-flex items-center">Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Name" value={profile.name} onChange={(v) => update('name', v)} />
            <AdminInput label="Short Name" value={profile.short_name} onChange={(v) => update('short_name', v)} />
          </div>
        </AdminCard>
        <AdminCard>
          <div className="space-y-3">
            <AdminInput label="Headline" value={profile.headline} onChange={(v) => update('headline', v)} />
            <AdminInput label="Short Bio" value={profile.short_bio} onChange={(v) => update('short_bio', v)} />
            <AdminTextarea label="Long Bio" value={profile.long_bio} onChange={(v) => update('long_bio', v)} rows={5} />
          </div>
        </AdminCard>
        <AdminCard>
          <div className="grid grid-cols-2 gap-3">
            <AdminInput label="Email" value={profile.email} onChange={(v) => update('email', v)} />
            <AdminInput label="Phone" value={profile.phone} onChange={(v) => update('phone', v)} />
            <AdminInput label="Location" value={profile.location} onChange={(v) => update('location', v)} />
            <AdminInput label="Availability" value={profile.availability} onChange={(v) => update('availability', v)} />
          </div>
        </AdminCard>
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-white/80 text-[13px] font-medium">Resume (CV)</div>
              {profile.resume_url ? (
                <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-os-gold/80 hover:text-os-gold text-[12px] truncate block">
                  View current file
                </a>
              ) : (
                <div className="text-white/40 text-[12px]">No file uploaded</div>
              )}
            </div>
            <label className="cursor-pointer shrink-0">
              <span className="px-3 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/70 text-[13px] hover:bg-white/[0.08] transition inline-flex items-center">
                {profile.resume_url ? 'Replace PDF' : 'Upload PDF'}
              </span>
              <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />
            </label>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
