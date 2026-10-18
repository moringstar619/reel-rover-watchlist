import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, meta } from "@/components/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Get in touch with the CineVerse team."),
  component: Contact,
});

const field = "w-full rounded-lg bg-secondary px-3 py-2.5 ring-1 ring-border outline-none focus:ring-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <InfoPage title="Contact">
      {sent ? <p className="rounded-xl bg-secondary p-6">Thanks! Your email app should have opened with your message ready to send.</p> : (
        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault();
          const d = new FormData(e.currentTarget);
          window.location.href = `mailto:hello@cineverse.example?subject=${encodeURIComponent(`Message from ${d.get("name")}`)}&body=${encodeURIComponent(String(d.get("msg")))}`;
          setSent(true);
        }}>
          <input name="name" required placeholder="Your name" className={field} />
          <textarea name="msg" required rows={5} placeholder="Your message" className={field} />
          <button className="rounded-lg bg-gradient-primary px-5 py-2.5 font-semibold text-primary-foreground">Send message</button>
        </form>
      )}
    </InfoPage>
  );
}
