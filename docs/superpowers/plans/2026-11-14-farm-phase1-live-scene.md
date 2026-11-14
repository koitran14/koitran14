# Homepage farm mode, phase 1 (live scene) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A button on the homepage opens a full-window 3D voxel farm island that follows the real season and the visitor's clock, with the Khôi character walking the paths and waving when clicked; no accounts, no game yet.

**Architecture:** Assets are authored as voxel scripts, turned into bevelled merged-face meshes by Blender, and committed as `.glb`. The page lazy-loads one client component (`FarmMode`) that renders an orthographic React Three Fiber scene: the season's island, the character split into jointed parts, chickens and particles. All time, layout and path logic lives in small pure modules under `lib/farm/` with node tests. The 3D parts are checked in the browser preview.

**Tech Stack:** Next.js 14 App Router, React 18, `three@0.175`, `@react-three/fiber@8` (already installed), `GLTFLoader` from `three/examples/jsm`, Blender 5.3 (authoring only), `node:test` with the repo's `loadTs` helper pattern.

**Spec:** `docs/superpowers/specs/2026-11-13-homepage-3d-farm-design.md` (approved 2026-11-14). The spec and this plan currently live in the session scratchpad. Task 1 copies both into the repo.

## Global Constraints

- No new npm dependencies. Load glTF with `three/examples/jsm/loaders/GLTFLoader.js` through R3F `useLoader`. Do not add `@react-three/drei`.
- Mode 1 (the current homepage) stays the default. The farm code and models load only after the visitor presses the button (`next/dynamic`, `ssr: false`).
- Season always follows the real date: Xuân months 2–4, Hạ 5–7, Thu 8–10, Đông 11–1. There is no manual season switch.
- Light and the calendar follow the visitor's own clock.
- Voxel edge `S = 0.05` world units. glTF coordinates equal voxel coordinates × `S`, with y up and +z facing the viewer.
- Camera: orthographic, yaw 25°, looking 33° below the horizon. The frame is the island's 16:9 box, 15 world units wide.
- Island base footprint: 32 × 24 cells, 6 voxels per cell. The upper terrace is rows 0–9 at voxel height 12; the lower level is rows 10–23 at height 0. The stream runs in voxel columns 90–101.
- Respect `prefers-reduced-motion`: no particles, no walking, and the character stays idle.
- Every clickable thing has a touch target of at least 44 px.
- UI copy is English, sentence case, matching the rest of the site. The calendar uses English day and month names but Vietnamese season names (Xuân, Hạ, Thu, Đông). This is Claude's call; the owner can change it.
- Work happens on branch `feat/homepage-3d-farm` in its own worktree. A repo hook blocks edits on `main`.

## Review Focus

1. **Season boundaries:** 31 Jan must give Đông and 1 Feb must give Xuân, judged by the visitor's local date. December and January are Đông. Owner: Task 2 test `season boundaries`.
2. **Resizing and portrait phones:** rotating the phone or resizing the window must refit the camera, and the whole island width must stay visible in portrait. Owner: Task 3 test `fitOrtho portrait keeps full width`, plus the Task 8 browser check.
3. **Hour rollover:** at 17:59 → 18:00 the lamps and barn windows turn on, and at 23:59 → 00:00 the calendar date advances without a reload. Owner: Task 2 test `lamps switch at 18 and 6`, plus Task 5's per-minute tick.
4. **A model fails to load:** a 404 or offline `.glb` must show a short message and the exit button must still close the mode; the homepage must not crash. Owner: Task 4 error boundary and its browser check.
5. **Leaving the mode:** Escape, the exit button and the browser Back button all close it, page scrolling comes back, and focus returns to the open button. Owner: Task 4 browser check.

---

### Task 1: Worktree, spec, and asset tools in the repo

**Files:**
- Create: `docs/superpowers/specs/2026-11-13-homepage-3d-farm-design.md` (copy from scratchpad)
- Create: `docs/superpowers/plans/2026-11-14-farm-phase1-live-scene.md` (this file)
- Create: `tools/voxel/figures.mjs`, `tools/voxel/blender_build.py`, `tools/voxel/farm_build.py` (copy from the scratchpad's `voxel/` folder)
- Modify: `package.json` (add `"test": "node --test tests/"`)

**Interfaces:**
- Produces: `tools/voxel/` scripts that later tasks extend. The run command is `blender -b -P tools/voxel/<script>.py -- tools/voxel`.

- [ ] **Step 1:** Create the worktree with superpowers:using-git-worktrees, on branch `feat/homepage-3d-farm`.
- [ ] **Step 2:** Copy the spec, this plan and the three voxel scripts to the paths above. In `farm_build.py` and `blender_build.py`, change only the `OUT` handling, so that `-- tools/voxel` reads `figures.json` from there and writes into `public/models/farm/`.
- [ ] **Step 3:** Add the `test` script, then run `npm test`.
  Expected: the existing `tests/blog-alerts.test.cjs` passes.
- [ ] **Step 4:** Commit: `chore: add farm spec, plan and voxel authoring scripts`.

### Task 2: Time logic (season, daylight, calendar)

**Files:**
- Create: `lib/farm/time.ts`
- Test: `tests/farm-time.test.cjs` (uses the same `loadTs` helper as `tests/blog-alerts.test.cjs`)

**Interfaces:**
- Produces:
  - `type Season = "xuan" | "ha" | "thu" | "dong"`
  - `seasonOf(d: Date): Season`
  - `SEASON_NAME: Record<Season, string>`, mapping to `Xuân`, `Hạ`, `Thu`, `Đông`
  - `daylight(hour: number): { day: number; dusk: number; lampsOn: boolean }`, where `day` is 0..1 sun strength and `dusk` is 0..1 orange tint
  - `calendarLines(d: Date): [string, string]`

- [ ] **Step 1: Write the failing tests**

```js
test('season boundaries', () => {
  assert.equal(seasonOf(new Date(2026, 0, 31)), 'dong');
  assert.equal(seasonOf(new Date(2026, 1, 1)), 'xuan');
  assert.equal(seasonOf(new Date(2026, 4, 1)), 'ha');
  assert.equal(seasonOf(new Date(2026, 7, 1)), 'thu');
  assert.equal(seasonOf(new Date(2026, 10, 1)), 'dong');
  assert.equal(seasonOf(new Date(2026, 11, 31)), 'dong');
});
test('lamps switch at 18 and 6', () => {
  assert.equal(daylight(17.99).lampsOn, false);
  assert.equal(daylight(18).lampsOn, true);
  assert.equal(daylight(5.99).lampsOn, true);
  assert.equal(daylight(6).lampsOn, false);
  assert.equal(daylight(12).day, 1);
  assert.equal(daylight(0).day, 0);
});
test('calendar lines', () => {
  assert.deepEqual(calendarLines(new Date(2026, 10, 13, 14, 5)), ['Fri, 13 Nov', 'Đông · 14:05']);
});
```

- [ ] **Step 2:** Run `npm test`.
  Expected: FAIL, because `lib/farm/time.ts` is missing.
- [ ] **Step 3:** Implement `lib/farm/time.ts`.
  - `day = max(0, sin((hour − 6) / 12 · π))`.
  - `dusk` peaks at 6 and at 18, and falls linearly to 0 within ±1.5 h of each.
  - `lampsOn = hour >= 18 || hour < 6`.
  - Format the calendar with fixed English day and month arrays (not `toLocaleString`, which differs between browsers).
- [ ] **Step 4:** Run `npm test`.
  Expected: PASS.
- [ ] **Step 5:** Commit: `feat(farm): season, daylight and calendar logic`.

### Task 3: Layout logic (camera fit, walk path)

**Files:**
- Create: `lib/farm/layout.ts`
- Test: `tests/farm-layout.test.cjs`

**Interfaces:**
- Produces:
  - `S = 0.05`
  - `FRAME_W = 15`
  - `fitOrtho(aspect: number): { halfW: number; halfH: number }`
  - `CAMERA = { yawDeg: 25, pitchDeg: 33, target: [4.8, 0.3, 3.6] }`, where the target is the island centre in world units
  - `WALK: [number, number, number][]`: voxel waypoints of a closed loop
  - `walkAt(t: number): { pos: [number, number, number]; heading: number }`, where `t` is in [0, 1) along the loop, `pos` is in world units, and `heading` is the y-rotation in radians

- [ ] **Step 1: Write the failing tests**

```js
test('fitOrtho landscape uses the 16:9 frame height', () => {
  const r = fitOrtho(21 / 9);
  assert.equal(r.halfH, 15 * 9 / 16 / 2);
  assert.ok(Math.abs(r.halfW - r.halfH * 21 / 9) < 1e-9);
});
test('fitOrtho portrait keeps full width', () => {
  assert.equal(fitOrtho(9 / 16).halfW, 7.5);
});
test('walk loop is closed and starts at the barn door', () => {
  const a = walkAt(0).pos, b = walkAt(1 - 1e-9).pos;
  assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 1e-6);
  assert.deepEqual(a.map(v => +v.toFixed(4)), [1.2, 0.6, 2.2]);
});
```

- [ ] **Step 2:** Run `npm test`.
  Expected: FAIL.
- [ ] **Step 3:** Implement `lib/farm/layout.ts`.
  - `fitOrtho`: when `aspect >= 16/9`, set `halfH = 15·9/16/2` and `halfW = halfH·aspect`; otherwise set `halfW = 7.5` and `halfH = halfW/aspect`.
  - `WALK` in voxel coordinates, matching `farm_build.py`: barn door `[24,12,44]` → `[77,12,46]` → stairs top `[77,12,58]` → stairs foot `[77,0,72]` → `[77,0,104]` → bridge `[96,2,105]` → `[130,0,105]` → `[155,0,120]`, then back along the same points to the door.
  - `walkAt` interpolates linearly by segment length.
- [ ] **Step 4:** Run `npm test`.
  Expected: PASS.
- [ ] **Step 5:** Commit: `feat(farm): camera fit and walk path`.

### Task 4: Export models; farm mode shell on the homepage

**Files:**
- Modify: `tools/voxel/figures.mjs`. Tag every voxel with a part.
- Modify: `tools/voxel/blender_build.py`. Add `export_parts(fig, path)`.
- Modify: `tools/voxel/farm_build.py`. With `--export`, skip the character, chickens and air particles, and write `island-<season>.glb`, `khoi-<season>.glb` and `chicken.glb`.
- Create: `public/models/farm/*.glb` (9 files)
- Create: `components/farm/farm-mode.tsx`, `components/farm/island.tsx`
- Modify: `app/(root)/page.tsx`. Add the open button below the hero text, and load `FarmMode` dynamically.
- Test: `tests/farm-assets.test.cjs`

**Interfaces:**
- Consumes: `seasonOf` (Task 2), `fitOrtho`, `CAMERA`, `S` (Task 3).
- Produces:
  - Every `khoi-<season>.glb` has one root node `khoi` with child nodes `head`, `body`, `armL`, `armR`, `legL`, `legR`.
  - Each part's origin sits at its joint, in voxels before ×S: hips `y=8` for legs, shoulders `y=12.5` for arms, neck `y=14` for head, `0` for body.
  - Material names are the hex colours, for example `#FFE9A8` for the barn windows and `#FFF1C2` for the lamp heads. Task 5 relies on these names.
  - `<FarmMode onClose={() => void} />`
  - `<Island season={Season} />`

- [ ] **Step 1: Write the failing test.** It reads each glb's JSON chunk: the bytes at offset 20, with the length taken from the uint32 at offset 12.

```js
test('character models expose jointed parts', () => {
  for (const s of ['xuan', 'ha', 'thu', 'dong']) {
    const names = glbJson(`public/models/farm/khoi-${s}.glb`).nodes.map(n => n.name);
    for (const part of ['khoi', 'head', 'body', 'armL', 'armR', 'legL', 'legR']) assert.ok(names.includes(part), `${s} ${part}`);
  }
});
test('island models exist and stay under 2 MB', () => {
  for (const s of ['xuan', 'ha', 'thu', 'dong']) assert.ok(fs.statSync(`public/models/farm/island-${s}.glb`).size < 2 * 1024 * 1024, s);
});
test('island keeps window and lamp materials', () => {
  const mats = glbJson('public/models/farm/island-dong.glb').materials.map(m => m.name);
  assert.ok(mats.includes('#FFE9A8') && mats.includes('#FFF1C2'));
});
```

- [ ] **Step 2:** Run `npm test`.
  Expected: FAIL, because the models are missing.
- [ ] **Step 3: Tag the voxels.** In `figures.mjs`, give each output voxel a 5th field, `part`. Classify after building, from the final post-stretch coordinates:
  - `y >= 14` is `head`. This includes hair, hats and Xuân's raised arm.
  - `y <= 7` is `legL` when `x < 0`, otherwise `legR`.
  - `x <= -7` is `armL` and `x >= 6` is `armR`. Held items in front of the torso (`z >= 4`) go to the arm on their side.
  - Everything else is `body`.
- [ ] **Step 4: Export the parts.** Write `export_parts(fig, path)` in `blender_build.py`: one mesh object per part, built with `build_figure`, its vertices shifted by `-pivot` and its location set to the pivot, all parented to an empty named `khoi`. Then run Blender with `--export` for all 4 seasons, plus `chicken.glb`, the 4×4×5-voxel chicken from `farm_build.py`.
- [ ] **Step 5:** Run `npm test`.
  Expected: PASS.
- [ ] **Step 6: Build `FarmMode`.**
  - A fixed full-window overlay with `role="dialog"`, `aria-modal`, and the label "Khôi's farm". It locks body scroll while open.
  - Escape and a top-right "Back to homepage" button call `onClose`. Opening pushes a history entry, so the browser Back button closes it too.
  - Focus returns to the open button on close.
  - The R3F `<Canvas orthographic shadows>` gets its camera from `fitOrtho(width/height)` and `CAMERA`, and recomputes on resize.
  - The background colour is the season's world colour from `farm_build.py` `PAL`.
  - `<Suspense>` shows "Loading the farm…". An error boundary shows "Couldn't load the farm. Try again later." with the back button still working.
- [ ] **Step 7: Build `Island`.** It loads `/models/farm/island-${season}.glb` with `useLoader(GLTFLoader, …)`, and turns on `castShadow` / `receiveShadow` for every mesh.
- [ ] **Step 8: Add the open button.** On the homepage, add a button labelled "Visit my farm" next to the hero text, with `next/dynamic(() => import('@/components/farm/farm-mode'), { ssr: false })`. Don't fetch anything until the visitor clicks.
- [ ] **Step 9: Check in the browser.** Run `preview_start dev`.
  - Before the click, the network panel shows no `.glb` and no `farm-mode` chunk.
  - After the click, the island for today's season fills the window.
  - Escape, the exit button and Back each close the mode; scrolling and focus come back.
  - Temporarily rename one `.glb`: the error message shows and the exit button still works. Then restore the file.
- [ ] **Step 10:** Commit: `feat(farm): exported models and farm mode shell`.

### Task 5: Light, calendar and night lights

**Files:**
- Create: `components/farm/sky.tsx`, `components/farm/calendar-hud.tsx`
- Modify: `components/farm/farm-mode.tsx`, `components/farm/island.tsx`

**Interfaces:**
- Consumes: `daylight`, `calendarLines`, `seasonOf` (Task 2), and the material names `#FFE9A8` and `#FFF1C2` (Task 4).
- Produces: `useClock(): Date`, which re-renders once a minute, aligned to the minute.

- [ ] **Step 1: Build `Sky`.** It holds a directional sun with shadows plus a hemisphere light.
  - Sun intensity is `0.15 + 0.75·day`, and its angle follows the hour as in the prototype.
  - The background colour mixes the season's world colour, an orange `#F7B98A` scaled by `dusk·0.5`, and night navy `#26304F` scaled by `1 − min(1, day + dusk/2)`.
- [ ] **Step 2:** In `Island`, when `lampsOn`, set `emissive` on the `#FFE9A8` and `#FFF1C2` materials to `#FFB84A`, and add one warm point light near the barn. When the lamps are off, set both back to black.
- [ ] **Step 3: Build `CalendarHud`.** A top-left card showing the two `calendarLines`, with `aria-live="polite"`. It reads `useClock()`.
- [ ] **Step 4: Check in the browser.** In the preview console, override `Date` (`const real = Date; Date = class extends real { constructor(...a){ super(...(a.length ? a : [2026,10,13,18,1])) } }`) and reopen the farm. The lamps and windows glow and the sky is navy. Then restore `Date`.
- [ ] **Step 5:** Commit: `feat(farm): daylight, calendar and night lights`.

### Task 6: Character walks and waves

**Files:**
- Create: `components/farm/khoi.tsx`
- Modify: `components/farm/farm-mode.tsx`

**Interfaces:**
- Consumes: `walkAt`, `S` (Task 3), and the `khoi-<season>.glb` part nodes (Task 4).
- Produces: `<Khoi season={Season} reducedMotion={boolean} />`

- [ ] **Step 1: Walking.** Load the glb and use `scale 0.55`, as in the renders. Advance `t` by `delta / 40`, so one loop takes 40 s. Set the position and heading from `walkAt(t)`. Swing `legL` and `legR` by ±0.5 rad, and `armL` and `armR` against them by ±0.3 rad, at 8 rad/s, with a 0.02-unit bob.
- [ ] **Step 2: Waving.** Clicking or tapping the character (an invisible hit box at least 44 px on screen at the current zoom) stops the walk and turns him toward the camera (heading = −25°). `armL` then waves (rotation z oscillating 2.4 ± 0.4 rad) for 2 s before he resumes walking. Xuân waves with `armL`, because the raised arm is part of `head`.
- [ ] **Step 2b: Seasonal chore (spec 4.3).** At the field-gate waypoint `[77,0,104]`, he stops for 4 s facing the field (heading −90°) and does a small seasonal motion with the item he holds in that season's model.
  - Xuân: tilts forward as if watering.
  - Hạ: bends to pick, with the arm swinging down.
  - Thu: lifts and lowers both arms as if carrying.
  - Đông: pats the snowball with both arms.

  A small rotation on the arm parts is enough. Props beyond the ones already in the models belong to phase 2.
- [ ] **Step 3: Reduced motion.** When `reducedMotion` is true, he stands at `walkAt(0.35)` facing the camera, and clicks still wave.
- [ ] **Step 4: Check in the browser.** He walks the loop over the stairs and the bridge without sinking into the ground or floating. Clicking makes him wave. With reduced-motion emulation on, he stands still.
- [ ] **Step 5:** Commit: `feat(farm): character walks the paths and waves`.

### Task 7: Free-range chickens and season particles

**Files:**
- Create: `components/farm/chickens.tsx`, `components/farm/particles.tsx`
- Modify: `components/farm/farm-mode.tsx`

**Interfaces:**
- Consumes: `chicken.glb` (Task 4), `S` (Task 3), `Season`, `daylight` (Task 2).
- Produces:
  - `<Chickens lampsOn={boolean} reducedMotion={boolean} />`
  - `<Particles season={Season} reducedMotion={boolean} />`

- [ ] **Step 1: Chickens.** Five chickens wander inside the lower-right lawn rectangle, voxels x 106–186, z 70–126. Keep them out of the stream and fields, which the spec forbids. Each one picks a random target within 12 voxels every 3–6 s and walks there at 6 voxels/s, hopping slightly.
  - When `lampsOn`, they walk to the coop door at voxel `[158, 0, 86]` and hide.
  - With reduced motion, they stand still.
- [ ] **Step 2: Particles.** One `InstancedMesh` of 70 cubes, each 0.15 voxel × S × 3, falling slowly with a sideways drift and wrapping from the bottom to the top. Colours: xuân `#F7B6CF`, thu `#EE8034`, dong `#FFFFFF`; none in summer. With reduced motion, render none.
- [ ] **Step 3: Check in the browser.** The chickens never cross the stream or enter the fields. The particle colour matches today's season. Setting the clock to 19:00 (as in Task 5) sends the chickens to the coop.
- [ ] **Step 4:** Commit: `feat(farm): free-range chickens and seasonal particles`.

### Task 8: Phones, performance and final check

**Files:**
- Modify: `components/farm/farm-mode.tsx`, as needed

- [ ] **Step 1:** Check the mobile preset (375×812).
  - The whole island width is visible, and the empty space above and below is the sky colour.
  - The exit button is at least 44×44 px.
  - Rotating to landscape refits the camera.
- [ ] **Step 2:** Run the performance check.
  - Over a 10 s performance recording with the farm open on the mobile preset, the frame rate should hold at 30 fps or more.
  - The homepage's own JS before the click should be unchanged from `main`: compare the `next build` route sizes for `/`.
- [ ] **Step 3:** Run `npm test` and `npm run lint`.
  Expected: both pass.
- [ ] **Step 4:** Commit: `perf(farm): mobile fit and final checks`, then hand off with superpowers:finishing-a-development-branch.

## Left for later plans

- Phase 2: the mini-game (harvest, eggs, incubation; progress in local storage).
- Phase 3: Supabase Auth with Google, guest merge, ticket ledger, reading claims, streaks, unlocks, island extensions.
- Phase 4: free decoration on the grid, inventory, the full crop, tree, flower and pet set.
