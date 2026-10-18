import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";

export const Route = createFileRoute("/terms")({
  head: () => meta("Terms of Service", "Terms for using CineVerse."),
  component: () => (
    <InfoPage title="Terms of Service">
      <p>CineVerse is provided for discovery purposes only. We link exclusively to official, licensed streaming services and never host or embed copyrighted content.</p>
      <p>Movie titles, names and trademarks belong to their respective owners. Platform availability may vary by region and change without notice.</p>
    </InfoPage>
  ),
});
