import { ExternalLink } from "lucide-react";

export function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300">
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
