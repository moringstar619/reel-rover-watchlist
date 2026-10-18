import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Privacy Policy", "How CineVerse handles your data."),
  component: () => (
    <InfoPage title="Privacy Policy">
      <p>Your watchlist, favorites, recently viewed titles and demo account are stored only in your browser's local storage. Nothing is sent to our servers.</p>
      <h2>Third-party links</h2>
      <p>When you open a streaming platform or trailer, that service's own privacy policy applies.</p>
    </InfoPage>
  ),
});
