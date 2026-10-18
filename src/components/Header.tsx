import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X, Bookmark, LogOut } from "lucide-react";
import { setUser, useUser } from "@/lib/library";

const NAV = [
  { label: "Movies", c: "movies" }, { label: "Web Series", c: "series" }, { label: "Hollywood", c: "hollywood" },
  { label: "Bollywood", c: "bollywood" }, { label: "South Indian", c: "south" }, { label: "Anime", c: "anime" }, { label: "TV Shows", c: "tv" },
] as const;

export function Logo() {
  return <Link to="/" className="font-display text-3xl tracking-wider"><span className="text-primary">CINE</span>VERSE</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const user = useUser();
  const submit = (e: React.FormEvent) => { e.preventDefault(); setOpen(false); nav({ to: "/search", search: { q } }); };
  const linkCls = "whitespace-nowrap text-sm text-muted-foreground transition hover:text-foreground";
  const active = { className: "text-foreground font-semibold" };

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-b">
      <div className="flex h-16 items-center gap-6 px-4 sm:px-10">
        <Logo />
        <nav className="hidden items-center gap-4 xl:flex">
          <Link to="/" className={linkCls} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
          {NAV.map((n) => <Link key={n.c} to="/browse/$category" params={{ category: n.c }} className={linkCls} activeProps={active}>{n.label}</Link>)}
        </nav>
        <form onSubmit={submit} className="ml-auto hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 ring-1 ring-border focus-within:ring-primary md:flex">
          <Search className="size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles…" aria-label="Search titles" className="w-32 bg-transparent text-sm outline-none 2xl:w-56" />
        </form>
        <Link to="/watchlist" aria-label="My list" className="hidden md:block text-muted-foreground hover:text-foreground"><Bookmark className="size-5" /></Link>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={() => setUser(null)} aria-label="Log out" className="text-muted-foreground hover:text-foreground"><LogOut className="size-4" /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-1.5 text-sm hover:bg-secondary">Login</Link>
              <Link to="/signup" className="whitespace-nowrap rounded-md bg-gradient-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow">Sign Up</Link>
            </>
          )}
        </div>
        <button className="ml-auto md:ml-0 xl:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="animate-rise border-t px-4 pb-6 pt-4 xl:hidden">
          <form onSubmit={submit} className="mb-4 flex items-center gap-2 rounded-full bg-secondary px-3 py-2 md:hidden">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles…" className="flex-1 bg-transparent text-sm outline-none" />
          </form>
          <div className="grid grid-cols-2 gap-3" onClick={() => setOpen(false)}>
            <Link to="/" className={linkCls}>Home</Link>
            {NAV.map((n) => <Link key={n.c} to="/browse/$category" params={{ category: n.c }} className={linkCls}>{n.label}</Link>)}
            <Link to="/watchlist" className={linkCls}>My List</Link>
            {user ? <button onClick={() => setUser(null)} className={`${linkCls} text-left`}>Log out</button> : <>
              <Link to="/login" className={linkCls}>Login</Link>
              <Link to="/signup" className="text-sm font-semibold text-primary">Sign Up</Link>
            </>}
          </div>
        </div>
      )}
    </header>
  );
}
