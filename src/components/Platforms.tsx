import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PLATFORMS, type PlatformId } from "@/lib/catalog";

export function PlatformBadge({ id }: { id: PlatformId }) {
  const p = PLATFORMS[id];
  return (
    <a href={p.url} target="_blank" rel="noreferrer" style={{ background: p.color }}
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-primary-foreground ring-1 ring-border transition hover:-translate-y-0.5 hover:brightness-110">
      {p.name} <ExternalLink className="size-3.5" />
    </a>
  );
}

export function PlatformStrip() {
  return (
    <section className="px-4 py-6 sm:px-10">
      <h2 className="mb-3 font-display text-3xl tracking-wide">Browse by Platform</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {(Object.keys(PLATFORMS) as PlatformId[]).map((id) => {
          const p = PLATFORMS[id];
          return (
            <div key={id} className="group relative overflow-hidden rounded-xl ring-1 ring-border transition hover:-translate-y-1 hover:shadow-glow" style={{ background: `linear-gradient(135deg, ${p.color}, oklch(0.12 0 0))` }}>
              <Link to="/search" search={{ platform: id }} className="block px-4 py-6 font-display text-2xl tracking-wide text-primary-foreground">{p.name}</Link>
              <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`} className="absolute right-2 top-2 rounded-full glass p-1.5 text-primary-foreground opacity-70 hover:opacity-100">
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
