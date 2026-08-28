import { useEffect, useState, useCallback, useRef } from 'react';
import {
  fetchProfile,
  fetchSocialLinks,
  fetchSkills,
  fetchExperiences,
  fetchEducation,
  fetchProjects,
  fetchProjectBySlug,
  type Profile,
  type SocialLink,
  type Skill,
  type Experience,
  type Education,
  type Project,
  type ProjectWithDetails,
} from './services';

type State<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

type ListState<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

function useList<T>(fetcher: () => Promise<T[]>): ListState<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let active = true;
    fetcherRef.current()
      .then((d) => { if (active) { setData(d); setError(null); } })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [nonce]);

  return { data, loading, error, refetch: () => { setLoading(true); setNonce(n => n + 1); } };
}

function useSingle<T>(fetcher: () => Promise<T | null>): State<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let active = true;
    fetcherRef.current()
      .then((d) => { if (active) { setData(d); setError(null); } })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [nonce]);

  return { data, loading, error, refetch: () => { setLoading(true); setNonce(n => n + 1); } };
}

export function useProfile() {
  return useSingle<Profile>(fetchProfile);
}

export function useSocialLinks() {
  return useList<SocialLink>(fetchSocialLinks);
}

export function useSkills() {
  return useList<Skill>(fetchSkills);
}

export function useExperiences() {
  return useList<Experience>(fetchExperiences);
}

export function useEducation() {
  return useList<Education>(fetchEducation);
}

export function useProjects() {
  return useList<Project>(fetchProjects);
}

export function useProject(slug: string | null) {
  const [data, setData] = useState<ProjectWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    fetchProjectBySlug(slug)
      .then((d) => { if (active) { setData(d); setError(null); } })
      .catch((e) => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  return { data, loading, error };
}

export function useAllData() {
  const profile = useProfile();
  const socialLinks = useSocialLinks();
  const skills = useSkills();
  const experiences = useExperiences();
  const education = useEducation();
  const projects = useProjects();

  const loading = profile.loading || socialLinks.loading || skills.loading || experiences.loading || education.loading || projects.loading;
  const error = profile.error || socialLinks.error || skills.error || experiences.error || education.error || projects.error;

  const refetch = useCallback(() => {
    profile.refetch();
    socialLinks.refetch();
    skills.refetch();
    experiences.refetch();
    education.refetch();
    projects.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    profile: profile.data,
    socialLinks: socialLinks.data,
    skills: skills.data,
    experiences: experiences.data,
    education: education.data,
    projects: projects.data,
    loading,
    error,
    refetch,
  };
}
