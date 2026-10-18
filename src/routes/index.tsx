import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Info, Star, Plus, Check } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CATALOG, SECTIONS, getTitle, trailerUrl } from "@/lib/catalog";
import { toggle, useList } from "@/lib/library";
import { Row } from "@/components/Row";
import { PlatformStrip } from "@/components/Platforms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineVerse — Discover Movies & Series to Stream" },
      { name: "description", content: "Find trending movies, web series and anime, and see which official platform streams them." },
      { property: "og:title", content: "CineVerse — Discover Movies & Series" },
      { property: "og:description", content: "Trending, top rated and new releases across Netflix, Prime Video, Disney+ and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const f = getTitle("dune-part-two")!;
  const watch = useList("watchlist");
  const recent = useList("recent").map(getTitle).filter(Boolean) as typeof CATALOG;
  const inList = watch.includes(f.id);
  return (
    <>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="relative max-w-2xl px-4 pb-20 sm:px-10">
          <p className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-highlight">Featured Tonight</p>
          <h1 className="animate-rise mt-2 font-display text-7xl leading-[0.9] tracking-wide sm:text-9xl">{f.title}</h1>
          <div className="animate-rise mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-bold text-gold"><Star className="size-4 fill-current" />{f.rating} IMDb</span>
            <span>{f.year}</span><span>{f.genres.join(" · ")}</span>
          </div>
          <p className="animate-rise mt-4 max-w-lg text-foreground/85">{f.synopsis}</p>
          <div className="animate-rise mt-6 flex flex-wrap gap-3">
            <Link to="/title/$id" params={{ id: f.id }} hash="watch" className="flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-105">
              <Play className="size-5 fill-current" /> Watch Now
            </Link>
            <a href={trailerUrl(f)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg glass px-6 py-3 font-semibold ring-1 ring-border hover:bg-secondary">
              <Play className="size-5" /> Watch Trailer
            </a>
            <Link to="/title/$id" params={{ id: f.id }} className="flex items-center gap-2 rounded-lg glass px-6 py-3 font-semibold ring-1 ring-border hover:bg-secondary">
              <Info className="size-5" /> More Info
            </Link>
            <button onClick={() => toggle("watchlist", f.id)} aria-label="Toggle watchlist" className="grid size-12 place-items-center rounded-full glass ring-1 ring-border hover:bg-secondary">
              {inList ? <Check /> : <Plus />}
            </button>
          </div>
        </div>
      </section>
      <PlatformStrip />
      {recent.length > 0 && <Row title="Recently Viewed" items={recent} />}
      {SECTIONS.map((s) => <Row key={s.title} {...s} />)}
    </>
  );
}
