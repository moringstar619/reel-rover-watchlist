import { Link } from "@tanstack/react-router";
import { Logo } from "./Header";

const SOCIAL = [
  ["Instagram", "https://instagram.com"], ["X", "https://x.com"], ["YouTube", "https://youtube.com"], ["Facebook", "https://facebook.com"],
];

export function Footer() {
  return (
    <footer className="mt-16 border-t px-4 py-12 sm:px-10">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Discover what to watch and where to stream it legally. CineVerse links only to official platforms.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">About Us</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
        </div>
        <div className="flex gap-3">
          {SOCIAL.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" className="rounded-full bg-secondary px-3 py-1.5 text-xs hover:bg-primary">{n}</a>)}
        </div>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} CineVerse. Titles and trademarks belong to their respective owners.</p>
    </footer>
  );
}
