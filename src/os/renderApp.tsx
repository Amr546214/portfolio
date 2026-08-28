import type { AppId } from './types';
import { AboutWindow } from '../components/windows/AboutWindow';
import { ExperienceWindow } from '../components/windows/ExperienceWindow';
import { SkillsWindow } from '../components/windows/SkillsWindow';
import { ProjectsWindow } from '../components/windows/ProjectsWindow';
import { EducationWindow } from '../components/windows/EducationWindow';
import { ContactWindow } from '../components/windows/ContactWindow';
import { ResumeWindow } from '../components/windows/ResumeWindow';
import { ReadmeWindow } from '../components/windows/ReadmeWindow';

export function renderApp(app: AppId) {
  switch (app) {
    case 'about': return <AboutWindow />;
    case 'experience': return <ExperienceWindow />;
    case 'skills': return <SkillsWindow />;
    case 'projects': return <ProjectsWindow />;
    case 'education': return <EducationWindow />;
    case 'contact': return <ContactWindow />;
    case 'resume': return <ResumeWindow />;
    case 'readme': return <ReadmeWindow />;
  }
}

export const APP_TITLES: Record<AppId, string> = {
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  education: 'Education',
  contact: 'Contact',
  resume: 'Resume',
  readme: 'README.md',
};
