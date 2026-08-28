import { Download, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';
import { useProfile } from '../../lib/hooks';

export function ResumeWindow() {
  const { data: profile } = useProfile();
  const url = profile?.resume_url ?? '';
  const [downloading, setDownloading] = useState(false);

  if (!profile) return <div className="p-6 text-white/50">Loading…</div>;

  if (!url) {
    return (
      <div className="h-full grid place-items-center p-8 text-center">
        <div>
          <FileText className="w-10 h-10 text-os-gold/60 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-white/70 text-sm">No resume uploaded yet.</p>
          <p className="text-white/40 text-xs mt-1">Upload one from the admin panel.</p>
        </div>
      </div>
    );
  }

  const fileName = `${(profile.short_name || profile.name || 'resume').replace(/\s+/g, '_')}_CV.pdf`;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('download failed', err);
      window.open(url, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 text-white/70 text-[12px]">
          <FileText className="w-4 h-4 text-os-gold" strokeWidth={1.7} />
          <span>Resume · {profile.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white/70 hover:text-white text-[12px] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open
          </a>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-os-gold/90 hover:bg-os-gold text-black text-[12px] font-medium transition disabled:opacity-60"
          >
            <Download className="w-3.5 h-3.5" />
            {downloading ? 'Downloading…' : 'Download'}
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 bg-black/60">
        <iframe
          src={`${url}#toolbar=0&navpanes=0`}
          title="Resume"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
