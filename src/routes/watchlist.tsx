import { createFileRoute, Link } from "@tanstack/react-router";
import { getTitle, type Title } from "@/lib/catalog";
import { useList } from "@/lib/library";
import { Grid } from "@/components/Row";

export const Route = createFileRoute("/watchlist")({
  head: () => ({
    meta: [
      { title: "My List — CineVerse" },
      { name: "description", content: "Your watchlist, favorites and recently viewed titles." },
      { property: "og:title", content: "My List — CineVerse" },
      { property: "og:description", content: "Everything you saved to watch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyList,
});

const resolve = (ids: string[]) => ids.map(getTitle).filter(Boolean) as Title[];

function Section({ title, ids, empty }: { title: string; ids: string[]; empty: string }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 font-display text-4xl tracking-wide">{title} <span className="text-lg text-muted-foreground">({ids.length})</span></h2>
      {ids.length ? <Grid items={resolve(ids)} /> : (
        <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">{empty} <Link to="/" className="text-primary">Browse titles</Link></p>
      )}
    </section>
  );
}

function MyList() {
  const w = useList("watchlist"), f = useList("favorites"), r = useList("recent");
  return (
    <div className="px-4 pt-28 sm:px-10">
      <h1 className="mb-8 font-display text-6xl tracking-wide">My List</h1>
      <Section title="Watchlist" ids={w} empty="Tap + on any title to save it here." />
      <Section title="Favorites" ids={f} empty="Heart a title on its page to favorite it." />
      <Section title="Recently Viewed" ids={r} empty="Titles you open will appear here." />
    </div>
  );
}
