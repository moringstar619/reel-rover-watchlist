import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { ALL_GENRES, ALL_LANGUAGES, PLATFORMS, filterTitles, type Filters } from "@/lib/catalog";
import { Grid } from "@/components/Row";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): Filters => ({
    q: typeof s.q === "string" ? s.q : undefined,
    genre: typeof s.genre === "string" ? s.genre : undefined,
    year: s.year ? String(s.year) : undefined,
    language: typeof s.language === "string" ? s.language : undefined,
    minRating: s.minRating ? Number(s.minRating) : undefined,
    platform: typeof s.platform === "string" ? s.platform : undefined,
    sort: s.sort === "newest" || s.sort === "rated" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search & Filter — CineVerse" },
      { name: "description", content: "Search movies and series by title, genre, year, language, rating and platform." },
      { property: "og:title", content: "Search — CineVerse" },
      { property: "og:description", content: "Find exactly what to watch next." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SearchPage,
});

const sel = "rounded-lg bg-secondary px-3 py-2 text-sm ring-1 ring-border outline-none focus:ring-primary";

function SearchPage() {
  const f = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const set = (patch: Partial<Filters>) => nav({ search: (p) => ({ ...p, ...patch }), replace: true });
  const results = filterTitles(f);
  const v = (x?: string | number) => (x === undefined ? "" : String(x));
  const u = (x: string) => x || undefined;

  return (
    <div className="px-4 pt-28 sm:px-10">
      <h1 className="font-display text-6xl tracking-wide">{f.platform ? PLATFORMS[f.platform as keyof typeof PLATFORMS]?.name ?? "Search" : "Search"}</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <input autoFocus value={v(f.q)} onChange={(e) => set({ q: u(e.target.value) })} placeholder="Movie or series title…" className={`${sel} min-w-60 flex-1`} aria-label="Title" />
        <select className={sel} value={v(f.genre)} onChange={(e) => set({ genre: u(e.target.value) })} aria-label="Genre">
          <option value="">All genres</option>{ALL_GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select className={sel} value={v(f.year)} onChange={(e) => set({ year: u(e.target.value) })} aria-label="Year">
          <option value="">Any year</option><option value="2020">2020s</option><option value="2010">2010s</option><option value="older">Before 2010</option>
        </select>
        <select className={sel} value={v(f.language)} onChange={(e) => set({ language: u(e.target.value) })} aria-label="Language">
          <option value="">All languages</option>{ALL_LANGUAGES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select className={sel} value={v(f.minRating)} onChange={(e) => set({ minRating: e.target.value ? Number(e.target.value) : undefined })} aria-label="Rating">
          <option value="">Any rating</option><option value="7">7+</option><option value="8">8+</option><option value="8.5">8.5+</option>
        </select>
        <select className={sel} value={v(f.platform)} onChange={(e) => set({ platform: u(e.target.value) })} aria-label="Platform">
          <option value="">All platforms</option>{Object.entries(PLATFORMS).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}
        </select>
        <select className={sel} value={f.sort ?? "popular"} onChange={(e) => set({ sort: e.target.value === "popular" ? undefined : (e.target.value as Filters["sort"]) })} aria-label="Sort">
          <option value="popular">Most popular</option><option value="newest">Newest</option><option value="rated">Highest rated</option>
        </select>
      </div>
      <p className="my-6 text-sm text-muted-foreground">{results.length} results</p>
      {results.length ? <Grid items={results} /> : (
        <div className="grid place-items-center rounded-2xl border border-dashed py-20 text-center">
          <SearchX className="size-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">No titles match your search</p>
          <p className="text-sm text-muted-foreground">Try a different spelling or clear some filters.</p>
          <Link to="/search" search={{}} className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Clear filters</Link>
        </div>
      )}
    </div>
  );
}
