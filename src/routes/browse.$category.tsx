import { createFileRoute, notFound } from "@tanstack/react-router";
import { CATALOG, CATEGORIES } from "@/lib/catalog";
import { Grid } from "@/components/Row";

export const Route = createFileRoute("/browse/$category")({
  loader: ({ params }) => {
    const c = CATEGORIES[params.category];
    if (!c) throw notFound();
    return { label: c.label, items: CATALOG.filter(c.filter).sort((a, b) => b.popularity - a.popularity) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.label ?? "Browse"} — CineVerse` },
      { name: "description", content: `Browse ${loaderData?.label ?? "titles"} and find where to stream them legally.` },
      { property: "og:title", content: `${loaderData?.label ?? "Browse"} — CineVerse` },
      { property: "og:description", content: `The best ${loaderData?.label ?? "titles"} on official streaming platforms.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Browse,
});

function Browse() {
  const { label, items } = Route.useLoaderData();
  return (
    <div className="px-4 pt-28 sm:px-10">
      <h1 className="font-display text-6xl tracking-wide">{label}</h1>
      <p className="mb-8 text-muted-foreground">{items.length} titles</p>
      <Grid items={items} />
    </div>
  );
}
