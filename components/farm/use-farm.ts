"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { layEggs, loadFarm, newFarm, saveFarm, type Farm } from "@/lib/farm/farmwork";
import { currentPlayer, loadCloud, logEvent, saveCloud, sendCode, signOut, takeEmailLink, verifyCode, verifyLink, type Player } from "@/lib/farm/cloud";

const KEY = "farm-progress-v1";
const OWNER = "farm-owner-v1";   // whose farm the browser copy is: it only ever stands in for that player's cloud save
const CLOUD_DELAY = 2000;

/** checking: looking for a session; out: ask for the email first; in: playing. */
export type Gate = "checking" | "out" | "in";
export type Sync = "saving" | "saved" | "offline";

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string | null) => { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch { /* blocked */ } };
const parse = (state: unknown) => loadFarm(JSON.stringify(state), Date.now());   // the cloud row is untrusted input too

// the email link is one-time: verify it once per page load, even when React runs the mount effect twice
let linkOnce: Promise<Player | { error: string } | null> | null = null;
const linkSignIn = () => (linkOnce ??= (async () => { const h = takeEmailLink(); return h ? verifyLink(h) : null; })());

/** The player's farm, saved to their Supabase row (plus a browser copy for when the server can't be reached).
 *  Nobody plays before confirming an email. Hens lay while it is day. */
export function useFarm(night: boolean) {
  const [farm, setFarm] = useState<Farm>(() => newFarm(Date.now()));
  const [gate, setGate] = useState<Gate>("checking");
  const [player, setPlayer] = useState<Player | null>(null);
  const [sync, setSync] = useState<Sync>("saved");
  const [notice, setNotice] = useState<string | null>(null);
  const [, setTick] = useState(0);

  /** Open a player's farm: their saved row, a new empty farm the first time, or this browser's copy of their farm when
   *  the server can't be reached. The player is set last, so autosave never runs on the wrong farm. */
  const enter = useCallback(async (p: Player, how: "session" | "code" | "link") => {
    const state = await loadCloud(p.id);
    const copy = read(OWNER) === p.id ? loadFarm(read(KEY), Date.now()) : null;
    const first = state === null;
    const next = state === undefined ? (copy ?? newFarm(Date.now())) : first ? newFarm(Date.now()) : parse(state);
    write(OWNER, p.id); write(KEY, saveFarm(next));
    setFarm(next); setPlayer(p); setGate("in");
    if (state === undefined) setSync("offline");
    else if (first) setSync((await saveCloud(p.id, next)) ? "saved" : "offline");
    if (how !== "session") logEvent("sign_in", { method: how, first });
    logEvent("farm_open", { width: window.innerWidth, height: window.innerHeight, touch: matchMedia("(pointer: coarse)").matches });
  }, []);

  useEffect(() => {
    let live = true;
    (async () => {
      const r = await linkSignIn();
      if (!live) return;
      if (r) {
        linkOnce = Promise.resolve(null);   // handled: reopening the farm must not replay it
        if (!("error" in r)) { await enter(r, "link"); return; }
        setNotice(r.error);
      }
      const p = await currentPlayer();
      if (!live) return;
      if (p) await enter(p, "session"); else setGate("out");
    })();
    return () => { live = false; };
  }, [enter]);

  useEffect(() => {   // every change: the browser copy at once, the cloud a moment later
    if (!player) return;
    write(KEY, saveFarm(farm));
    setSync("saving");
    const id = setTimeout(async () => setSync((await saveCloud(player.id, farm)) ? "saved" : "offline"), CLOUD_DELAY);
    return () => clearTimeout(id);
  }, [farm, player]);

  useEffect(() => {   // crops ripen and hens lay in real time; re-check every few seconds
    if (gate !== "in") return;
    const id = setInterval(() => { setTick((t) => t + 1); setFarm((f) => layEggs(f, Date.now(), !night, Math.random)); }, 5000);
    return () => clearInterval(id);
  }, [night, gate]);

  const busy = useRef(false);
  const account = {
    gate, player, sync, notice, clearNotice: () => setNotice(null),
    sendCode,
    async verify(email: string, code: string) {
      const r = await verifyCode(email, code);
      if (!("error" in r)) await enter(r, "code");
      return r;
    },
    async signOut() {
      if (busy.current) return; busy.current = true;
      logEvent("sign_out");
      await signOut();
      write(OWNER, null); write(KEY, null);   // the next person on this browser starts from nothing
      setPlayer(null); setFarm(newFarm(Date.now())); setGate("out");
      busy.current = false;
    },
  };
  return { farm, setFarm, account };
}
