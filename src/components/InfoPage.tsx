import type { ReactNode } from "react";

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-28">
      <h1 className="font-display text-6xl tracking-wide">{title}</h1>
      <div className="mt-6 space-y-4 text-foreground/85 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold">{children}</div>
    </div>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — CineVerse` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — CineVerse` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
});
