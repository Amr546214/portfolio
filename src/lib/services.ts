import { supabase } from './supabase';
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from './database.types';

export type Profile = Tables<'profile'>;
export type SocialLink = Tables<'social_links'>;
export type Skill = Tables<'skills'>;
export type Experience = Tables<'experiences'>;
export type Education = Tables<'education'>;
export type Project = Tables<'projects'>;
export type ProjectImage = Tables<'project_images'>;
export type ProjectTechnology = Tables<'project_technologies'>;

export type ProjectWithDetails = Project & {
  project_images: ProjectImage[];
  project_technologies: ProjectTechnology[];
};

// ============ PROFILE ============
export async function fetchProfile(): Promise<Profile | null> {
  const { data, error } = await supabase.from('profile').select('*').limit(1).single();
  if (error) {
    console.error('fetchProfile:', error);
    return null;
  }
  return data;
}

export async function updateProfile(id: string, updates: TablesUpdate<'profile'>): Promise<Profile | null> {
  const { data, error } = await supabase.from('profile').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateProfile:', error); return null; }
  return data;
}

// ============ SOCIAL LINKS ============
export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchSocialLinks:', error); return []; }
  return data;
}

export async function fetchAllSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchAllSocialLinks:', error); return []; }
  return data;
}

export async function createSocialLink(link: TablesInsert<'social_links'>): Promise<SocialLink | null> {
  const { data, error } = await supabase.from('social_links').insert(link).select().single();
  if (error) { console.error('createSocialLink:', error); return null; }
  return data;
}

export async function updateSocialLink(id: string, updates: TablesUpdate<'social_links'>): Promise<SocialLink | null> {
  const { data, error } = await supabase.from('social_links').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateSocialLink:', error); return null; }
  return data;
}

export async function deleteSocialLink(id: string): Promise<boolean> {
  const { error } = await supabase.from('social_links').delete().eq('id', id);
  if (error) { console.error('deleteSocialLink:', error); return false; }
  return true;
}

// ============ SKILLS ============
export async function fetchSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchSkills:', error); return []; }
  return data;
}

export async function fetchAllSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchAllSkills:', error); return []; }
  return data;
}

export async function createSkill(skill: TablesInsert<'skills'>): Promise<Skill | null> {
  const { data, error } = await supabase.from('skills').insert(skill).select().single();
  if (error) { console.error('createSkill:', error); return null; }
  return data;
}

export async function updateSkill(id: string, updates: TablesUpdate<'skills'>): Promise<Skill | null> {
  const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateSkill:', error); return null; }
  return data;
}

export async function deleteSkill(id: string): Promise<boolean> {
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) { console.error('deleteSkill:', error); return false; }
  return true;
}

// ============ EXPERIENCES ============
export async function fetchExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchExperiences:', error); return []; }
  return data;
}

export async function fetchAllExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchAllExperiences:', error); return []; }
  return data;
}

export async function createExperience(exp: TablesInsert<'experiences'>): Promise<Experience | null> {
  const { data, error } = await supabase.from('experiences').insert(exp).select().single();
  if (error) { console.error('createExperience:', error); return null; }
  return data;
}

export async function updateExperience(id: string, updates: TablesUpdate<'experiences'>): Promise<Experience | null> {
  const { data, error } = await supabase.from('experiences').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateExperience:', error); return null; }
  return data;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) { console.error('deleteExperience:', error); return false; }
  return true;
}

// ============ EDUCATION ============
export async function fetchEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchEducation:', error); return []; }
  return data;
}

export async function fetchAllEducation(): Promise<Education[]> {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchAllEducation:', error); return []; }
  return data;
}

export async function createEducation(edu: TablesInsert<'education'>): Promise<Education | null> {
  const { data, error } = await supabase.from('education').insert(edu).select().single();
  if (error) { console.error('createEducation:', error); return null; }
  return data;
}

export async function updateEducation(id: string, updates: TablesUpdate<'education'>): Promise<Education | null> {
  const { data, error } = await supabase.from('education').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateEducation:', error); return null; }
  return data;
}

export async function deleteEducation(id: string): Promise<boolean> {
  const { error } = await supabase.from('education').delete().eq('id', id);
  if (error) { console.error('deleteEducation:', error); return false; }
  return true;
}

// ============ PROJECTS ============
export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchProjects:', error); return []; }
  return data;
}

export async function fetchAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchAllProjects:', error); return []; }
  return data;
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectWithDetails | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (*),
      project_technologies (*)
    `)
    .eq('slug', slug)
    .eq('is_visible', true)
    .single();
  if (error) { console.error('fetchProjectBySlug:', error); return null; }
  return data as ProjectWithDetails;
}

export async function createProject(project: TablesInsert<'projects'>): Promise<Project | null> {
  const { data, error } = await supabase.from('projects').insert(project).select().single();
  if (error) { console.error('createProject:', error); return null; }
  return data;
}

export async function updateProject(id: string, updates: TablesUpdate<'projects'>): Promise<Project | null> {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
  if (error) { console.error('updateProject:', error); return null; }
  return data;
}

export async function deleteProject(id: string): Promise<boolean> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) { console.error('deleteProject:', error); return false; }
  return true;
}

// ============ PROJECT TECHNOLOGIES ============
export async function fetchProjectTechnologies(projectId: string): Promise<ProjectTechnology[]> {
  const { data, error } = await supabase
    .from('project_technologies')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchProjectTechnologies:', error); return []; }
  return data;
}

export async function addProjectTechnology(projectId: string, technology: string, displayOrder: number = 0): Promise<boolean> {
  const { error } = await supabase
    .from('project_technologies')
    .insert({ project_id: projectId, technology, display_order: displayOrder });
  if (error) { console.error('addProjectTechnology:', error); return false; }
  return true;
}

export async function removeProjectTechnology(id: string): Promise<boolean> {
  const { error } = await supabase.from('project_technologies').delete().eq('id', id);
  if (error) { console.error('removeProjectTechnology:', error); return false; }
  return true;
}

// ============ PROJECT IMAGES ============
export async function fetchProjectImages(projectId: string): Promise<ProjectImage[]> {
  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('display_order', { ascending: true });
  if (error) { console.error('fetchProjectImages:', error); return []; }
  return data;
}

export async function addProjectImage(projectId: string, imageUrl: string, altText: string = '', displayOrder: number = 0): Promise<boolean> {
  const { error } = await supabase
    .from('project_images')
    .insert({ project_id: projectId, image_url: imageUrl, alt_text: altText, display_order: displayOrder });
  if (error) { console.error('addProjectImage:', error); return false; }
  return true;
}

export async function removeProjectImage(id: string): Promise<boolean> {
  const { error } = await supabase.from('project_images').delete().eq('id', id);
  if (error) { console.error('removeProjectImage:', error); return false; }
  return true;
}

// ============ STORAGE ============
export async function uploadFile(bucket: string, path: string, file: File): Promise<string | null> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) { console.error('uploadFile:', error); return null; }
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export async function removeFile(bucket: string, path: string): Promise<boolean> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) { console.error('removeFile:', error); return false; }
  return true;
}

// ============ AUTH ============
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { console.error('signIn:', error); return null; }
  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
