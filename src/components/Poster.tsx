import type { Title } from "@/lib/catalog";

/** Generated key-art poster (no unlicensed artwork). Colors derive from each title's hue. */
export function Poster({ t, className = "" }: { t: Title; className?: string }) {
  const h = t.hue;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 80% at 30% 15%, oklch(0.55 0.18 ${h}) 0%, transparent 55%),
          radial-gradient(90% 70% at 85% 90%, oklch(0.45 0.2 ${(h + 140) % 360}) 0%, transparent 60%),
          linear-gradient(160deg, oklch(0.22 0.06 ${h}), oklch(0.1 0.02 ${h}))`,
      }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0 14px, oklch(1 0 0 / .08) 14px 15px)" }} />
      <div className="absolute -right-6 top-6 size-28 rounded-full blur-2xl" style={{ background: `oklch(0.7 0.2 ${(h + 40) % 360} / .5)` }} />
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
        <p className="font-display text-2xl leading-none tracking-wide text-foreground drop-shadow">{t.title}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.director}</p>
      </div>
    </div>
  );
}
