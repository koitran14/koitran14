"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check, Clipboard, Cloud, CloudOff, Flower2, Leaf, Lock, Snowflake, Sun, X } from "lucide-react";
import { UNLOCKS, wealth, type Farm } from "@/lib/farm/farmwork";
import type { Sync } from "./use-farm";
import type { Player } from "@/lib/farm/cloud";
import { Tile } from "./ui";
import { farmMoment, type Season } from "@/lib/farm/time";

function Panel({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="absolute right-3 top-[68px] z-10 w-[min(340px,calc(100vw-24px))]" role="region" aria-label={title} style={{ colorScheme: "light" }}>{/* the panel is always light: on a dark-mode page native fields turned dark grey with black text */}
      <Tile className="max-h-[calc(100vh-90px)] overflow-y-auto p-4 font-sans">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[16px] font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`} className="grid h-11 w-11 place-items-center rounded-xl text-zinc-500 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        {children}
      </Tile>
    </div>
  );
}

/** Spend harvested produce on the island's unlockable items. */
export function ShopPanel({ farm, onBuy, onClose }: { farm: Farm; onBuy: (id: string) => void; onClose: () => void }) {
  const have = wealth(farm.inv);
  return (
    <Panel title="Farm shop" onClose={onClose}>
      <p className="mb-3 text-[13px] text-zinc-600">
        You have <b className="text-zinc-900">{have} points</b>. Each crop is worth 1, each egg 3.
      </p>
      <ul className="flex flex-col gap-2">
        {UNLOCKS.map((u) => {
          const owned = farm.unlocked.includes(u.id), short = u.price - have;
          return (
            <li key={u.id} className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-3 py-2">
              <div>
                <p className="text-[14px] font-semibold">{u.name}</p>
                <p className="text-[12px] text-zinc-500">{owned ? "On your island" : short > 0 ? `${u.price} points · ${short} more to go` : `${u.price} points`}</p>
              </div>
              {owned ? (
                <span className="flex items-center gap-1 text-[13px] font-semibold text-green-700"><Check className="h-4 w-4" aria-hidden />Owned</span>
              ) : (
                <button type="button" disabled={short > 0} onClick={() => onBuy(u.id)}
                  className="flex min-h-[44px] items-center gap-1 rounded-xl bg-green-600 px-3 text-[13px] font-bold text-white disabled:bg-zinc-200 disabled:text-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                  {short > 0 && <Lock className="h-4 w-4" aria-hidden />}Buy
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

type Account = {
  player: Player | null; sync: Sync; notice: string | null;
  sendCode: (email: string) => Promise<{ error: string } | null>;
  verify: (email: string, code: string) => Promise<Player | { error: string }>;
  signOut: () => Promise<void>;
};

const SEASON_ICON: Record<Season, typeof Sun> = { xuan: Flower2, ha: Sun, thu: Leaf, dong: Snowflake };
const SEASON_TINT: Record<Season, string> = { xuan: "#FBE0EA", ha: "#FFF0C2", thu: "#FBE1C4", dong: "#DCE8F7" };
const SYNC_TEXT: Record<Sync, string> = { saving: "Saving…", saved: "Saved online", offline: "Couldn't reach the server: saved in this browser for now" };
const INPUT = "min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-blue-500";
const BUTTON = "min-h-[44px] w-full rounded-xl bg-green-600 px-3 text-[14px] font-bold text-white disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

/** The door to the farm: an email, then the code it receives (or the email's button). A first visit starts an empty farm. */
export function EmailGate({ account, checking, season, hour }: { account: Account; checking: boolean; season: Season; hour: number }) {
  const [email, setEmail] = useState(""), [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false), [error, setError] = useState<string | null>(null);
  const run = async (f: () => Promise<void>) => { setBusy(true); setError(null); try { await f(); } finally { setBusy(false); } };

  const send = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const r = await account.sendCode(email.trim());
    if (r) setError(r.error); else setSent(true);
  }); };
  const confirm = (c: string) => run(async () => {
    const r = await account.verify(email.trim(), c);
    if ("error" in r) setError(r.error);
  });
  // digits only. Supabase sends 6 to 10 digits (the project's OTP length): a code that arrives whole (pasted, or filled
  // from the email by the phone) confirms itself; one typed digit by digit waits for Confirm, as we can't know its length
  const onCode = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 10);
    const whole = d.length >= 6 && d.length - code.length > 1;
    setCode(d); if (whole && !busy) confirm(d);
  };
  const paste = async () => { try { onCode(await navigator.clipboard.readText()); } catch { setError("Couldn't read the clipboard: type the code instead."); } };

  const Icon = SEASON_ICON[season];
  return (
    // the farm stays in view behind the welcome: a sign at its edge, not a wall in front of it. The scene underneath
    // takes no clicks until the email is confirmed; a light shade at the bottom keeps the card's edge readable.
    <div className="absolute inset-0 z-10 flex items-end justify-center sm:justify-start sm:p-6" style={{ colorScheme: "light", background: "linear-gradient(to top, rgba(24,22,30,.32), rgba(24,22,30,0) 55%)" }}>
      <div className="w-full rounded-t-[28px] bg-white px-6 pb-7 pt-6 font-sans text-zinc-900 sm:w-[400px] sm:rounded-[28px]" style={{ boxShadow: "0 18px 50px rgba(30,40,60,.22)" }}>
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: SEASON_TINT[season] }}><Icon className="h-5 w-5 text-zinc-800" aria-hidden /></span>
          <div>
            <h2 className="text-[21px] font-bold leading-tight">Welcome to Khôi&rsquo;s farm</h2>
            <p className="text-[13px] text-zinc-600">It&rsquo;s {farmMoment(season, hour)} there right now.</p>
          </div>
        </div>
        {checking ? <p className="text-[14px] text-zinc-600" role="status">Opening your farm…</p> : !sent ? (
          <form onSubmit={send} className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-zinc-700" htmlFor="farm-email">Your email</label>
            <input id="farm-email" type="email" required autoFocus autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
            <button type="submit" className={BUTTON} disabled={busy}>{busy ? "Sending…" : "Send me a code"}</button>
            <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">No password: we email you a code. Your first visit starts a new farm, and it&rsquo;s there on every device you sign in on.</p>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); confirm(code); }} className="flex flex-col gap-2">
            <p className="mb-1 text-[14px] text-zinc-600">We sent a code to <b className="text-zinc-900">{email}</b>. Type it here, or press the button in the email.</p>
            <label className="sr-only" htmlFor="farm-code">Code</label>
            <div className="flex gap-2">
              <input id="farm-code" autoFocus inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,10}" maxLength={10} required placeholder="Code" value={code} onChange={(e) => onCode(e.target.value)} className={`${INPUT} text-center font-mono text-[20px] tracking-[0.4em]`} />
              <button type="button" onClick={paste} className="flex min-h-[44px] shrink-0 items-center gap-1 rounded-xl border border-zinc-300 bg-white px-3 text-[13px] font-semibold text-zinc-700 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
                <Clipboard className="h-4 w-4" aria-hidden />Paste
              </button>
            </div>
            <button type="submit" className={BUTTON} disabled={busy}>{busy ? "Checking…" : "Open my farm"}</button>
            <button type="button" className="min-h-[44px] text-[13px] text-zinc-600 underline" onClick={() => { setSent(false); setCode(""); setError(null); }}>Use a different email</button>
          </form>
        )}
        {(error ?? account.notice) && <p className="mt-2 text-[13px] text-red-600" role="alert">{error ?? account.notice}</p>}
      </div>
    </div>
  );
}

/** The signed-in player's save status and sign-out. */
export function AccountPanel({ account, onClose }: { account: Account; onClose: () => void }) {
  const { player, sync } = account;
  const [busy, setBusy] = useState(false);
  const SyncIcon = sync === "offline" ? CloudOff : Cloud;
  return (
    <Panel title="Your farm" onClose={onClose}>
      <p className="mb-3 flex items-center gap-2 text-[13px] text-zinc-600" role="status"><SyncIcon className="h-4 w-4" aria-hidden />{SYNC_TEXT[sync]}</p>
      {player && <p className="mb-3 text-[14px]">Signed in as <b>{player.email}</b>. Open the farm on any device with this email to carry on.</p>}
      <button type="button" className={`${BUTTON} bg-zinc-700`} disabled={busy} onClick={async () => { setBusy(true); await account.signOut(); }}>Sign out</button>
    </Panel>
  );
}
