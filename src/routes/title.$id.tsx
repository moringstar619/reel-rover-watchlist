import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play, Plus, Check, Heart, Star } from "lucide-react";
import { CATALOG, getTitle, trailerUrl } from "@/lib/catalog";
import { pushRecent, toggle, useList } from "@/lib/library";
import { Poster } from "@/components/Poster";
import { PlatformBadge } from "@/components/Platforms";
import { Row } from "@/components/Row";

export const Route = createFileRoute("/title/$id")({
  loader: ({ params }) => {
    const t = getTitle(params.id);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData: t }) => ({
    meta: t ? [
      { title: `${t.title} (${t.year}) — CineVerse` },
      { name: "description", content: t.synopsis },
      { property: "og:title", content: `${t.title} (${t.year})` },
      { property: "og:description", content: t.synopsis },
      { property: "og:type", content: "video.movie" },
      { name: "twitter:card", content: "summary" },
    ] : [{ title: "Title not found — CineVerse" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center pt-24 text-center">
      <div><p className="font-display text-5xl">Title not found</p><Link to="/" className="text-primary">Back home</Link></div>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const t = Route.useLoaderData();
  const watch = useList("watchlist");
  const favs = useList("favorites");
  useEffect(() => pushRecent(t.id), [t.id]);
  const similar = CATALOG.filter((x) => x.id !== t.id && x.genres.some((g) => t.genres.includes(g))).slice(0, 12);
  const btn = "flex items-center gap-2 rounded-lg px-5 py-3 font-semibold ring-1 ring-border transition hover:bg-secondary";

  return (
    <>
      <section className="relative overflow-hidden pt-16">
        <Poster t={t} className="absolute inset-0 scale-110 opacity-60 blur-2xl [&>*:last-child]:hidden" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="relative flex flex-col gap-8 px-4 py-12 sm:px-10 md:flex-row">
          <Poster t={t} className="aspect-[2/3] w-56 shrink-0 rounded-2xl shadow-card ring-1 ring-border md:w-72" />
          <div className="animate-rise max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-highlight">{t.type === "series" ? "Series" : "Movie"} · {t.language}</p>
            <h1 className="mt-2 font-display text-6xl leading-none tracking-wide sm:text-8xl">{t.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-bold text-gold"><Star className="size-4 fill-current" />{t.rating}/10</span>
              <span>Released {new Date(t.released).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              {t.genres.map((g) => <span key={g} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-foreground">{g}</span>)}
            </div>
            <p className="mt-5 text-lg text-foreground/90">{t.synopsis}</p>
            <dl className="mt-5 grid gap-2 text-sm">
              <div><dt className="inline text-muted-foreground">{t.type === "series" ? "Creator: " : "Director: "}</dt><dd className="inline">{t.director}</dd></div>
              <div><dt className="inline text-muted-foreground">Cast: </dt><dd className="inline">{t.cast.join(", ")}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={trailerUrl(t)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 font-bold text-primary-foreground shadow-glow"><Play className="size-5 fill-current" /> Watch Trailer</a>
              <button onClick={() => toggle("watchlist", t.id)} className={btn}>{watch.includes(t.id) ? <Check className="size-5" /> : <Plus className="size-5" />}{watch.includes(t.id) ? "In Watchlist" : "Add to Watchlist"}</button>
              <button onClick={() => toggle("favorites", t.id)} className={btn}><Heart className={`size-5 ${favs.includes(t.id) ? "fill-primary text-primary" : ""}`} />{favs.includes(t.id) ? "Favorited" : "Favorite"}</button>
            </div>
            <div id="watch" className="mt-8 scroll-mt-24">
              <p className="mb-3 text-sm font-semibold text-muted-foreground">Watch legally on</p>
              <div className="flex flex-wrap gap-3">{t.platforms.map((p) => <PlatformBadge key={p} id={p} />)}</div>
              <p className="mt-2 text-xs text-muted-foreground">Availability varies by region. Opens the official service.</p>
            </div>
          </div>
        </div>
      </section>
      <Row title="More Like This" items={similar} />
    </>
  );
}
