// Accounts and cloud save for the farm (spec 4.5), Supabase Auth with email only: no password, no Google. A player signs
// in with the code the email carries, or its button (a one-time link), and the farm lives in their row of farm_saves.
// Every call fails soft: without Supabase (env missing, offline) the caller is told, nothing throws.
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import type { Farm } from "./farmwork";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL, KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let client: SupabaseClient | null = null;
function sb(): SupabaseClient | null {
  if (!URL || !KEY || typeof window === "undefined") return null;
  return (client ??= createClient(URL, KEY, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "farm-auth" } }));
}
export const cloudAvailable = () => !!URL && !!KEY;

export type Player = { id: string; email: string };
const player = (u: User): Player | null => (u.is_anonymous || !u.email ? null : { id: u.id, email: u.email });
const UNAVAILABLE = "Signing in isn't available right now. Please try again later.";

/** The signed-in player, or null (never signed in, signed out, or an old guest session from before sign-in was required). */
export async function currentPlayer(): Promise<Player | null> {
  const s = sb(); if (!s) return null;
  try {
    const { data } = await s.auth.getSession();
    return data.session ? player(data.session.user) : null;
  } catch { return null; }
}

/** The player's saved farm: the state, null when there is no row yet, or undefined when the cloud could not be read. */
export async function loadCloud(id: string): Promise<unknown | null | undefined> {
  const s = sb(); if (!s) return undefined;
  const { data, error } = await s.from("farm_saves").select("state").eq("user_id", id).maybeSingle();
  return error ? undefined : (data?.state ?? null);
}

export async function saveCloud(id: string, farm: Farm): Promise<boolean> {
  const s = sb(); if (!s) return false;
  const { error } = await s.from("farm_saves").upsert({ user_id: id, state: farm, updated_at: new Date().toISOString() });
  return !error;
}

/** Email a sign-in code (and a one-tap link). Creates the account on a first sign-in. */
export async function sendCode(email: string): Promise<{ error: string } | null> {
  const s = sb(); if (!s) return { error: UNAVAILABLE };
  // the email's button comes back to this site ({{ .RedirectTo }} in the templates); must be in Supabase's redirect allow-list
  const { error } = await s.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: window.location.origin } });
  return error ? { error: error.message } : null;
}

/** The code from the email. */
export async function verifyCode(email: string, code: string): Promise<Player | { error: string }> {
  const s = sb(); if (!s) return { error: UNAVAILABLE };
  const { data, error } = await s.auth.verifyOtp({ email, token: code, type: "email" });
  const p = data?.user && player(data.user);
  return error || !p ? { error: error?.message ?? "That code didn't work." } : p;
}

/** The button in the email: ?farm_token=<token hash>&farm_type=email. Read once and wiped from the address bar, so the
 *  one-time token never sits in history. */
export function takeEmailLink(): string | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search), hash = q.get("farm_token");
  if (!hash) return null;
  q.delete("farm_token"); q.delete("farm_type");
  window.history.replaceState(window.history.state, "", window.location.pathname + (q.toString() ? `?${q}` : "") + window.location.hash);
  return hash;
}

/** Sign in with the email's button: works on any device, no email address in the link. */
export async function verifyLink(hash: string): Promise<Player | { error: string }> {
  const s = sb(); if (!s) return { error: UNAVAILABLE };
  const { data, error } = await s.auth.verifyOtp({ token_hash: hash, type: "email" });
  const p = data?.user && player(data.user);
  return error || !p ? { error: "That sign-in link has expired or was already used. Ask for a new code." } : p;
}

export async function signOut(): Promise<void> {
  await sb()?.auth.signOut().catch(() => undefined);
}

/** Usage log (table farm_events): one row per thing a signed-in player does. Fire-and-forget; a lost row never matters. */
export function logEvent(event: string, data: Record<string, unknown> = {}): void {
  sb()?.from("farm_events").insert({ event, data }).then(() => undefined, () => undefined);
}
