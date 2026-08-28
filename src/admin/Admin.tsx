import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { signIn, signOut } from '../lib/services';
import { AdminProfile } from './AdminProfile';
import { AdminSkills } from './AdminSkills';
import { AdminExperience } from './AdminExperience';
import { AdminEducation } from './AdminEducation';
import { AdminProjects } from './AdminProjects';
import { AdminSocialLinks } from './AdminSocialLinks';
import { User, LogOut, Briefcase, Code2, FolderKanban, GraduationCap, Mail, Link2, Settings } from 'lucide-react';

type Tab = 'profile' | 'skills' | 'experience' | 'education' | 'projects' | 'social';

const TABS: { id: Tab; label: string; Icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', Icon: User },
  { id: 'skills', label: 'Skills', Icon: Code2 },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'education', label: 'Education', Icon: GraduationCap },
  { id: 'projects', label: 'Projects', Icon: FolderKanban },
  { id: 'social', label: 'Social Links', Icon: Link2 },
];

export function Admin() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('profile');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn(email, password);
    if (!result) setError('Invalid credentials');
  };

  const handleLogout = async () => {
    await signOut();
    setAuthed(false);
  };

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-[#0e0e10] text-white/50">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0e0e10] p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm glass rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-os-gold" />
            <h1 className="text-xl font-semibold text-white">Admin Login</h1>
          </div>
          {error && <p className="text-red-400 text-[13px]">{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-[14px] focus:border-os-gold/60 focus:outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-10 px-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white text-[14px] focus:border-os-gold/60 focus:outline-none"
            required
          />
          <button type="submit" className="w-full h-10 rounded-lg bg-os-gold/20 border border-os-gold/40 text-os-gold font-medium text-[14px] hover:bg-os-gold/30 transition">
            Sign In
          </button>
          <a href="#/" className="block text-center text-[12px] text-white/40 hover:text-white/60 transition">← Back to portfolio</a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/[0.06] bg-black/30 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-os-gold" />
          <span className="text-white font-semibold text-[15px]">Admin Panel</span>
        </div>
        <nav className="space-y-1 flex-1">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition ${tab === id ? 'bg-os-gold/15 text-os-gold' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="space-y-1 pt-4 border-t border-white/[0.06]">
          <a href="#/" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/60 hover:bg-white/[0.05] hover:text-white transition">
            <Mail className="w-4 h-4" /> View Portfolio
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-red-400/80 hover:bg-red-500/10 transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {tab === 'profile' && <AdminProfile />}
        {tab === 'skills' && <AdminSkills />}
        {tab === 'experience' && <AdminExperience />}
        {tab === 'education' && <AdminEducation />}
        {tab === 'projects' && <AdminProjects />}
        {tab === 'social' && <AdminSocialLinks />}
      </main>
    </div>
  );
}
