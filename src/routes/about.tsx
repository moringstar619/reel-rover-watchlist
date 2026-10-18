import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us", "CineVerse helps you discover movies and series and find where to watch them legally."),
  component: () => (
    <InfoPage title="About Us">
      <p>CineVerse is a streaming discovery guide. We don't host or stream any content — we help you decide what to watch and point you to the official service that carries it.</p>
      <p>Our catalog spans Hollywood, Bollywood, South Indian cinema, anime and acclaimed web series.</p>
    </InfoPage>
  ),
});
