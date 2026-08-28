import { useState } from 'react';
import { useProfile } from '../lib/hooks';

type Props = {
  size?: number;
  className?: string;
  ring?: boolean;
};

export function Avatar({ size = 44, className = '', ring = true }: Props) {
  const { data: profile } = useProfile();
  const cacheBust = useState(() => Date.now())[0];
  const src = profile?.profile_image ? `${profile.profile_image}?t=${cacheBust}` : '';
  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden ${ring ? 'ring-1 ring-os-gold/40 shadow-[0_6px_20px_-6px_rgba(201,168,106,0.45)]' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={profile?.name ?? 'Profile'}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 22%' }}
        />
      ) : (
        <div className="w-full h-full bg-os-gold/20 grid place-items-center">
          <span className="text-os-gold/60 text-[10px] font-medium">
            {(profile?.name ?? 'AO').split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </span>
        </div>
      )}
      <div className="absolute inset-0 rounded-full ring-1 ring-white/10 pointer-events-none" />
    </div>
  );
}
