import { useSyncExternalStore } from "react";

type Key = "watchlist" | "favorites" | "recent";
const listeners = new Set<() => void>();
const cache: Partial<Record<Key, string[]>> = {};
const EMPTY: string[] = [];

function read(key: Key): string[] {
  if (typeof window === "undefined") return EMPTY;
  if (!cache[key]) {
    try { cache[key] = JSON.parse(localStorage.getItem(`cineverse:${key}`) || "[]"); }
    catch { cache[key] = []; }
  }
  return cache[key]!;
}
function write(key: Key, v: string[]) {
  cache[key] = v;
  try { localStorage.setItem(`cineverse:${key}`, JSON.stringify(v)); } catch { /* storage unavailable */ }
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };

export function useList(key: Key) {
  return useSyncExternalStore(subscribe, () => read(key), () => EMPTY);
}
export function toggle(key: Key, id: string) {
  const cur = read(key);
  write(key, cur.includes(id) ? cur.filter((x) => x !== id) : [id, ...cur]);
}
export function pushRecent(id: string) {
  write("recent", [id, ...read("recent").filter((x) => x !== id)].slice(0, 12));
}

export interface DemoUser { name: string; email: string }
let userCache: DemoUser | null | undefined;
function readUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  if (userCache === undefined) {
    try { userCache = JSON.parse(localStorage.getItem("cineverse:user") || "null"); } catch { userCache = null; }
  }
  return userCache ?? null;
}
export function useUser() { return useSyncExternalStore(subscribe, readUser, () => null); }
export function setUser(u: DemoUser | null) {
  userCache = u;
  try { u ? localStorage.setItem("cineverse:user", JSON.stringify(u)) : localStorage.removeItem("cineverse:user"); } catch { /* */ }
  listeners.forEach((l) => l());
}
