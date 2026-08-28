import { useProfile, useSocialLinks, useExperiences } from '../../lib/hooks';

export function ReadmeWindow() {
  const { data: profile } = useProfile();
  const { data: socialLinks } = useSocialLinks();
  const { data: experiences } = useExperiences();
  if (!profile) return <div className="p-8 text-white/50">Loading…</div>;
  const github = socialLinks.find((s) => s.platform === 'github');
  const linkedin = socialLinks.find((s) => s.platform === 'linkedin');
  return (
    <div className="p-8 font-mono text-[12.5px] leading-relaxed text-white/75">
      <pre className="whitespace-pre-wrap">
{`# ${profile.name}

> ${profile.headline}

## About
${profile.long_bio}

## Currently
${experiences.map((e) => `- ${e.position} @ ${e.company}${e.location ? ` (${e.location})` : ''}`).join('\n')}

## Contact
- Email:    ${profile.email}
- Phone:    ${profile.phone}
- Location: ${profile.location}
${github ? `- GitHub:   ${github.url}\n` : ''}${linkedin ? `- LinkedIn: ${linkedin.url}\n` : ''}
// End of file.
`}
      </pre>
    </div>
  );
}
