import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Title } from "@/lib/catalog";
import { MovieCard } from "./MovieCard";

export function Row({ title, items }: { title: string; items: Title[] }) {
  const ref = useRef<HTMLDivElement>(null);
  if (!items.length) return null;
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="group/row relative py-4">
      <h2 className="mb-3 px-4 font-display text-3xl tracking-wide sm:px-10">{title}</h2>
      <div ref={ref} className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth px-4 pb-2 pt-1 sm:px-10">
        {items.map((t) => <MovieCard key={t.id} t={t} />)}
      </div>
      {[-1, 1].map((d) => (
        <button key={d} aria-label={d < 0 ? "Scroll left" : "Scroll right"} onClick={() => scroll(d)}
          className={`absolute top-1/2 hidden -translate-y-1/2 rounded-full glass p-2 opacity-0 ring-1 ring-border transition hover:bg-primary group-hover/row:opacity-100 md:block ${d < 0 ? "left-2" : "right-2"}`}>
          {d < 0 ? <ChevronLeft /> : <ChevronRight />}
        </button>
      ))}
    </section>
  );
}

export function Grid({ items }: { items: Title[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 [&>*]:w-full">
      {items.map((t) => <MovieCard key={t.id} t={t} />)}
    </div>
  );
}
