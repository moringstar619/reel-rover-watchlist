import { Link } from "@tanstack/react-router";
import { Star, Plus, Check } from "lucide-react";
import { type Title } from "@/lib/catalog";
import { toggle, useList } from "@/lib/library";
import { Poster } from "./Poster";

export function MovieCard({ t }: { t: Title }) {
  const watch = useList("watchlist");
  const inList = watch.includes(t.id);
  return (
    <div className="group relative w-40 shrink-0 sm:w-48">
      <Link to="/title/$id" params={{ id: t.id }} className="block overflow-hidden rounded-xl shadow-card ring-1 ring-border transition duration-300 group-hover:-translate-y-1 group-hover:ring-primary/60">
        <Poster t={t} className="aspect-[2/3] transition duration-500 group-hover:scale-105" />
      </Link>
      <button
        aria-label={inList ? "Remove from watchlist" : "Add to watchlist"}
        onClick={() => toggle("watchlist", t.id)}
        className="absolute right-2 top-2 grid size-8 place-items-center rounded-full glass ring-1 ring-border transition hover:bg-primary"
      >
        {inList ? <Check className="size-4" /> : <Plus className="size-4" />}
      </button>
      <div className="mt-2 px-0.5">
        <p className="truncate text-sm font-semibold">{t.title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{t.year}</span><span>•</span><span className="truncate">{t.genres[0]}</span>
          <span className="ml-auto flex items-center gap-0.5 text-gold"><Star className="size-3 fill-current" />{t.rating}</span>
        </div>
      </div>
    </div>
  );
}
