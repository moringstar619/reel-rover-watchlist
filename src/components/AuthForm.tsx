import { Link, useNavigate } from "@tanstack/react-router";
import { setUser } from "@/lib/library";

const field = "w-full rounded-lg bg-secondary px-3 py-2.5 ring-1 ring-border outline-none focus:ring-primary";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const nav = useNavigate();
  return (
    <div className="grid min-h-screen place-items-center px-4 pt-16">
      <form className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-8 shadow-card ring-1 ring-border" onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const email = String(d.get("email"));
        setUser({ email, name: String(d.get("name") || email.split("@")[0]) });
        nav({ to: "/" });
      }}>
        <h1 className="font-display text-5xl tracking-wide">{mode === "login" ? "Welcome back" : "Join CineVerse"}</h1>
        {mode === "signup" && <input name="name" required placeholder="Full name" className={field} />}
        <input name="email" type="email" required placeholder="Email" className={field} />
        <input name="password" type="password" required minLength={6} placeholder="Password" className={field} />
        <button className="w-full rounded-lg bg-gradient-primary py-2.5 font-semibold text-primary-foreground shadow-glow">{mode === "login" ? "Login" : "Create account"}</button>
        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? <>New here? <Link to="/signup" className="text-primary">Sign up</Link></> : <>Have an account? <Link to="/login" className="text-primary">Login</Link></>}
        </p>
        <p className="text-center text-xs text-muted-foreground">Demo account — saved on this device only.</p>
      </form>
    </div>
  );
}
