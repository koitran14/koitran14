# Spike: the farm island (base 32 x 24 cells, 6 voxels per cell) in the chosen voxel style, one render per season.
# Farming is the focus: a fenced field of 15 beds fills the lower-left; chickens, well and hay on the right;
# barn + silo on the upper-left, orchard on the upper-right.
# Usage (from the repo root): blender -b -P tools/voxel/farm_build.py -- tools/voxel [season ...]
import bpy, json, math, os, random, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blender_build as bb

OUT = bb.OUT
ARGS = sys.argv[sys.argv.index("--") + 2:]
C = 6                      # voxels per grid cell
IW, ID = 32 * C, 24 * C    # island footprint in voxels: 32 x 24 fills 16:9 at this camera
UPZ = 10 * C               # rows 0..9 are the upper terrace
UPH = 12                   # terrace height in voxels
SX0, SX1 = 15 * C, 17 * C  # stream columns
SX0 = 90; SX1 = 102
STX0, STX1 = 72, 82        # stairs / main path columns

PAL = {
    "xuan": dict(grass="#A6D886", grass2="#B0DE92", leaf=["#F7B6CF", "#FBCFE0"], crops=["carrot", "radish", "strawberry"], water="#8FD0EE", snow=False, air="#F7B6CF", world="#FBE9F0", flowers=["#FFB3CC", "#FFD86B", "#FFFFFF"]),
    "ha": dict(grass="#7FCB5E", grass2="#89D168", leaf=["#5DB34A", "#6FC257"], crops=["tomato", "corn", "melon"], water="#6CC6EC", snow=False, air=None, world="#E3F4FF", flowers=["#FFD23F", "#FF8A5B", "#FFFFFF"]),
    "thu": dict(grass="#CDBF77", grass2="#D5C680", leaf=["#F08A3E", "#F5B042"], crops=["pumpkin", "potato", "cabbage"], water="#8CC3D6", snow=False, air="#EE8034", world="#FBEBD6", flowers=["#E9853C", "#F5B042", "#B7AEF0"]),
    "dong": dict(grass="#F2F5FA", grass2="#EBF0F7", leaf=None, crops=["snow", "spinach", "snow"], water="#CFE7F2", snow=True, air="#FFFFFF", world="#DDE7F4", flowers=[]),
}
ROOF = "#B4473C"

def build(season, rng):
    P = PAL[season]; V = {}; snow = P["snow"]
    def put(x, y, z, c): V[(x, y, z)] = c
    def box(x0, x1, y0, y1, z0, z1, c):
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                for z in range(z0, z1 + 1):
                    put(x, y, z, c(x, y, z) if callable(c) else c)
    def rbox(x0, x1, y0, y1, z0, z1, r, c):
        cx, cy, cz = (x0 + x1 + 1) / 2, (y0 + y1 + 1) / 2, (z0 + z1 + 1) / 2
        hx, hy, hz = (x1 + 1 - x0) / 2 - r, (y1 + 1 - y0) / 2 - r, (z1 + 1 - z0) / 2 - r
        for x in range(x0, x1 + 1):
            for y in range(y0, y1 + 1):
                for z in range(z0, z1 + 1):
                    q = [max(abs(x + .5 - cx) - hx, 0), max(abs(y + .5 - cy) - hy, 0), max(abs(z + .5 - cz) - hz, 0)]
                    if math.sqrt(sum(a * a for a in q)) <= r + 0.01:
                        put(x, y, z, c(x, y, z) if callable(c) else c)
    WOOD, WOODD, STONE, STONED = "#C9965E", "#A87A48", "#B8B2A8", "#9A948A"
    SNOWC = "#FFFFFF"
    def cap(y, x0, x1, z0, z1):  # snow on top of things in winter
        if snow: box(x0, x1, y, y, z0, z1, SNOWC)

    # ---- ground ----
    chips = {(0, 0), (1, 0), (31, 0), (12, 0), (13, 0), (24, 0), (0, 23), (6, 23), (7, 23), (21, 23), (31, 22), (31, 23), (0, 12), (31, 13)}
    for cx_ in range(32):
        for cz_ in range(24):
            if (cx_, cz_) in chips: continue
            for x in range(cx_ * C, cx_ * C + C):
                for z in range(cz_ * C, cz_ * C + C):
                    t = UPH if z < UPZ else 0
                    stream = SX0 <= x < SX1
                    t2 = t - 3 if stream else t
                    for y in range(-14, t2):
                        if y >= t2 - 2 and not stream: c = P["grass2"] if (x // 12 + z // 12) % 2 else P["grass"]
                        elif y >= -6: c = "#A9774E"
                        else: c = "#8C8478"
                        put(x, y, z, c)
                    if stream: put(x, t2, z, P["water"]); put(x, t2 - 1, z, P["water"])
    FALL = "#E7F4FB" if snow else "#7CC4E8"
    box(SX0, SX1 - 1, -2, UPH - 3, UPZ, UPZ, FALL)
    box(SX0, SX1 - 1, -22, -3, ID, ID, FALL)
    rbox(SX0 - 2, SX1 + 1, -26, -22, ID - 1, ID + 4, 1, "#F3FAFD")
    # spring source: an uneven pile of rocks with the water coming out of the gap
    for (x0, x1, y0, y1, z0, z1) in ((SX0 - 9, SX0 - 1, UPH - 1, UPH + 7, 0, 7), (SX1, SX1 + 8, UPH - 1, UPH + 5, 0, 6), (SX0 - 3, SX1 + 2, UPH + 5, UPH + 10, 0, 4), (SX1 + 4, SX1 + 10, UPH - 1, UPH + 2, 6, 10), (SX0 - 12, SX0 - 7, UPH - 1, UPH + 2, 7, 11)):
        rbox(x0, x1, y0, y1, z0, z1, 1, STONE if (x0 + z0) % 2 else STONED)
    cap(UPH + 11, SX0 - 2, SX1 + 1, 1, 3)

    PATH = "#E2E6EE" if snow else "#E9D6B0"
    # ---- upper terrace: barn + silo (left), orchard + bench (right) ----
    box(6, 42, UPH, UPH + 18, 16, 34, "#D9604C")
    for x in (6, 42): box(x, x, UPH, UPH + 18, 34, 34, "#FFFFFF")
    box(20, 28, UPH, UPH + 11, 34, 34, "#F6EBDD"); box(23, 25, UPH, UPH + 11, 34, 34, "#D9604C")
    box(10, 15, UPH + 9, UPH + 13, 34, 34, "#FFE9A8"); box(33, 38, UPH + 9, UPH + 13, 34, 34, "#FFE9A8")
    for k in range(10): box(4, 44, UPH + 19 + k, UPH + 19 + k, 15 + k, 35 - k, SNOWC if snow and k > 0 else ROOF)
    rbox(46, 57, UPH, UPH + 32, 18, 29, 4, "#D8D2C6"); rbox(45, 58, UPH + 31, UPH + 37, 17, 30, 5, SNOWC if snow else ROOF)
    for y in range(UPH + 6, UPH + 30, 8): box(46, 57, y, y, 28, 29, "#C4BDB0")
    box(20, 28, UPH - 1, UPH - 1, 35, 44, PATH); box(20, STX1, UPH - 1, UPH - 1, 44, 49, PATH); box(STX0, STX1, UPH - 1, UPH - 1, 50, UPZ - 1, PATH)
    def tree(tx, tz, s):
        box(tx, tx + 3, UPH, UPH + 12 + s, tz, tz + 3, "#8A5A44")
        if P["leaf"]:
            a, b = P["leaf"]
            rbox(tx - 8, tx + 11, UPH + 10 + s, UPH + 21 + s, tz - 8, tz + 11, 3, a)
            rbox(tx - 4, tx + 7, UPH + 20 + s, UPH + 26 + s, tz - 4, tz + 7, 2, b)
            if season in ("ha", "thu"):
                for (dx, dz) in ((-6, 12), (0, 12), (6, 12), (12, 2), (12, 8)): put(tx + dx, UPH + 15 + s, tz + dz, "#E2564B" if season == "thu" else "#F2C94C")
        else:
            box(tx - 5, tx + 8, UPH + 10 + s, UPH + 11 + s, tz + 1, tz + 2, "#8A5A44"); box(tx - 5, tx + 8, UPH + 12 + s, UPH + 12 + s, tz + 1, tz + 2, SNOWC)
            box(tx + 1, tx + 2, UPH + 13 + s, UPH + 19 + s, tz, tz + 3, "#8A5A44"); rbox(tx - 2, tx + 5, UPH + 20 + s, UPH + 22 + s, tz - 1, tz + 4, 1, SNOWC)
    for (tx, tz, s) in ((122, 12, 0), (148, 12, 2), (174, 12, 0), (135, 34, 1), (161, 34, -1)): tree(tx, tz, s)
    box(118, 134, UPH + 4, UPH + 5, 50, 54, "#E7B98A"); box(118, 134, UPH + 6, UPH + 10, 49, 49, "#E7B98A")
    for x in (119, 133): box(x, x, UPH, UPH + 3, 50, 54, "#7E6A62")
    cap(UPH + 6, 118, 134, 50, 54)
    # lamp on the terrace path
    box(66, 67, UPH, UPH + 20, 50, 51, "#5E5A78"); rbox(64, 69, UPH + 20, UPH + 24, 48, 53, 1, "#FFF1C2")

    # ---- stairs + lower paths + bridge ----
    for i in range(4): box(STX0, STX1, 0, UPH - 3 * (i + 1), UPZ + 3 * i, UPZ + 12, WOOD)
    box(STX0, STX1, -1, -1, UPZ + 12, 110, PATH)
    box(STX1, SX0 - 1, -1, -1, 100, 110, PATH); box(SX1, 168, -1, -1, 100, 110, PATH); box(150, 160, -1, -1, 110, ID - 1, PATH)
    box(SX0 - 3, SX1 + 2, 0, 1, 99, 111, WOOD)
    for z in (99, 111): box(SX0 - 3, SX1 + 2, 2, 4, z, z, WOODD)
    cap(2, SX0 - 3, SX1 + 2, 100, 110)

    # ---- the field: 15 beds inside a fence, one crop per row ----
    def crop(kind, px, z0):
        if kind == "carrot": box(px, px + 1, 1, 1, z0 + 2, z0 + 3, "#F08A3E"); box(px, px + 1, 2, 4, z0 + 2, z0 + 3, "#6FC257"); put(px - 1, 4, z0 + 2, "#8FD86F")
        elif kind == "radish": box(px, px + 1, 1, 2, z0 + 2, z0 + 3, "#FFFFFF"); box(px - 1, px + 2, 3, 4, z0 + 2, z0 + 3, "#7CC860")
        elif kind == "strawberry": rbox(px - 1, px + 2, 2, 3, z0 + 1, z0 + 4, 0.5, "#5FAE45"); put(px, 3, z0 + 4, "#E2564B"); put(px + 2, 2, z0 + 4, "#E2564B")
        elif kind == "tomato": box(px, px + 1, 2, 7, z0 + 2, z0 + 3, "#4E9E3C"); rbox(px - 1, px + 2, 4, 6, z0 + 4, z0 + 5, 0.5, "#E2564B")
        elif kind == "corn": box(px, px + 1, 2, 11, z0 + 2, z0 + 3, "#6FB84E"); box(px + 2, px + 2, 6, 9, z0 + 2, z0 + 3, "#F2C94C"); put(px - 1, 10, z0 + 2, "#8FD86F")
        elif kind == "melon": rbox(px - 1, px + 2, 2, 4, z0 + 1, z0 + 4, 1, lambda x, y, z: "#3E8E3A" if x % 2 else "#5DB34A")
        elif kind == "pumpkin": rbox(px - 1, px + 2, 2, 4, z0 + 1, z0 + 4, 1, "#F0923A"); put(px, 5, z0 + 2, "#5E7A2E")
        elif kind == "potato": box(px - 1, px + 2, 2, 3, z0 + 2, z0 + 3, "#6E9E4A"); put(px, 1, z0 + 4, "#9B6FA8")
        elif kind == "cabbage": rbox(px - 1, px + 2, 2, 4, z0 + 1, z0 + 4, 1, "#B8E08A")
        elif kind == "spinach": box(px, px + 1, 3, 4, z0 + 2, z0 + 3, "#3E7E3A")
    for r, z0 in enumerate((74, 84, 94, 104, 114)):
        kind = P["crops"][r % 3]
        for x0 in (8, 28, 48):
            box(x0, x0 + 17, 0, 1, z0, z0 + 6, "#7A4E33")
            if kind == "snow": box(x0, x0 + 17, 2, 2, z0, z0 + 6, SNOWC); continue
            if snow: box(x0, x0 + 17, 2, 2, z0, z0 + 6, SNOWC)
            for i in range(4): crop(kind, x0 + 2 + i * 4, z0)
    # fence around the field, with a gate onto the main path
    for x in range(4, 70, 4):
        for z in (68, 124): box(x, x, 0, 5, z, z, WOOD)
    for z in range(68, 125, 4):
        if not 96 <= z <= 106: box(68, 68, 0, 5, z, z, WOOD)
        box(4, 4, 0, 5, z, z, WOOD)
    for z in (68, 124): box(4, 68, 3, 3, z, z, WOOD)
    box(4, 4, 3, 3, 68, 124, WOOD); box(68, 68, 3, 3, 68, 95, WOOD); box(68, 68, 3, 3, 107, 124, WOOD)
    # scarecrow in the middle of the field
    box(37, 38, 0, 14, 81, 82, "#7A5640"); box(32, 43, 10, 11, 81, 82, "#7A5640"); rbox(35, 40, 14, 18, 79, 84, 1, "#F2D6A2")
    box(34, 41, 18, 19, 79, 84, "#E05050" if snow else "#E9C46A")
    # watering can by the gate
    if not snow: box(70, 73, 0, 3, 112, 114, "#7FB5E0"); box(74, 75, 2, 2, 113, 113, "#7FB5E0")

    # ---- right side: chicken yard, well, hay, mailbox ----
    for x in range(132, 190, 4):
        for z in (66, 96): box(x, x, 0, 5, z, z, WOOD)
    for z in range(66, 97, 4): box(132, 132, 0, 5, z, z, WOOD); box(188, 188, 0, 5, z, z, WOOD)
    for z in (66, 96): box(132, 188, 3, 3, z, z, WOOD)
    box(132, 132, 3, 3, 66, 96, WOOD); box(188, 188, 3, 3, 66, 96, WOOD)
    box(146, 170, 0, 12, 70, 84, "#E7B98A"); box(156, 160, 0, 6, 84, 84, "#5C3B28")
    for k in range(6): box(144, 172, 13 + k, 13 + k, 69 + k, 85 - k, SNOWC if snow and k > 0 else ROOF)
    for (x, z) in ((140, 88), (150, 90), (172, 88), (180, 78), (138, 76)):
        box(x, x + 3, 0, 3, z, z + 4, "#FFFFFF"); put(x + 1, 4, z + 4, "#E2564B"); put(x + 1, 3, z + 5, "#F2B04A")
    box(176, 184, 0, 2, 70, 73, WOODD); box(177, 183, 2, 2, 71, 72, "#E9C46A")
    rbox(110, 121, 0, 6, 112, 123, 3, STONE); box(113, 118, 6, 6, 115, 120, P["water"])
    for x in (110, 120): box(x, x + 1, 6, 16, 117, 118, WOODD)
    box(108, 123, 17, 18, 115, 120, ROOF); cap(19, 108, 123, 115, 120)
    for (x0, z0, h) in ((172, 112, 8), (180, 116, 8), (176, 114, 15)):
        rbox(x0, x0 + 10, h - 8, h, z0, z0 + 8, 2, SNOWC if snow else "#E9C46A")
    box(164, 165, 0, 8, 112, 113, "#7E6A62"); rbox(162, 167, 8, 11, 111, 115, 1, "#E05050")
    for (lx, lz) in ((104, 94), (140, 112)):
        box(lx, lx + 1, 0, 18, lz, lz + 1, "#5E5A78"); rbox(lx - 2, lx + 3, 18, 22, lz - 2, lz + 3, 1, "#FFF1C2")

    # ---- front strip: two tidy flower planters, rest is open lawn ----
    for (x0, x1) in ((112, 140), (20, 52)):
        box(x0, x1, 0, 2, 130, 136, WOODD)
        if snow: box(x0 + 1, x1 - 1, 3, 3, 131, 135, SNOWC); continue
        for i, x in enumerate(range(x0 + 2, x1 - 1, 3)):
            box(x, x, 3, 4, 132, 134, "#5FAE45"); put(x, 5, 133, P["flowers"][i % len(P["flowers"])])
    if snow:
        rbox(60, 69, 0, 8, 130, 139, 3, SNOWC); rbox(61, 68, 8, 14, 131, 138, 2, SNOWC); put(64, 12, 139, "#F08A3E"); box(63, 66, 9, 9, 131, 138, "#E05050")
    # small rocks and grass tufts
    for _ in range(26):
        x, z = rng.randint(4, 186), rng.randint(4, 140)
        y = UPH if z < UPZ else 0
        if V.get((x, y - 1, z)) not in (P["grass"], P["grass2"]) or (x, y, z) in V: continue
        if rng.random() < 0.4: rbox(x, x + 2, y, y + 1, z, z + 2, 0.5, STONE)
        else: box(x, x, y, y + 2, z, z, "#5FAE45" if not snow else "#DCE5EF"); put(x + 1, y, z, "#6FB357" if not snow else "#DCE5EF")
    # ---- floating rocks ----
    for (x, y, z, s) in ((-16, 6, 26, 6), (200, -6, 110, 8), (60, -26, 154, 5), (130, 26, -14, 5)):
        rbox(x, x + s, y, y + s, z, z + s, 1, STONE); box(x, x + s, y + s + 1, y + s + 1, z, z + s, SNOWC if snow else P["grass"])
    # ---- fog over the locked areas: round puffs of mixed size at mixed heights ----
    crng = random.Random(11)
    for side in (-1, 1):
        for _ in range(11):
            r = crng.randint(7, 13)
            cx = (-14 if side < 0 else IW + 14) + side * crng.randint(-4, 14)
            cy, cz = crng.randint(-12, 20), crng.randint(0, ID)
            rbox(cx - r, cx + r, cy - r // 2 - 2, cy + r // 2 + 2, cz - r, cz + r, max(3, r // 2), "#FFFFFF" if crng.random() < 0.7 else "#F3F1F7")
    if P["air"]:
        for _ in range(70): put(rng.randint(-20, IW + 20), rng.randint(10, 70), rng.randint(-10, ID + 10), P["air"])
    return [[x, y, z, c] for (x, y, z), c in V.items()]

def render(season, fig):
    bpy.ops.wm.read_factory_settings(use_empty=True); bb.MATS.clear()
    P = PAL[season]
    bb.build_figure({"name": "island", "voxels": build(season, random.Random(3))})
    ob = bb.build_figure(fig); s = 0.55; ob.scale = (s, s, s)
    ob.location = (77 * bb.S, -92 * bb.S, 0); ob.rotation_euler.z = math.radians(25)  # face the camera
    sc = bpy.context.scene
    w = bpy.data.worlds.new("World"); sc.world = w; w.use_nodes = True
    bg = w.node_tree.nodes["Background"]; bg.inputs["Color"].default_value = bb.lin(P["world"]); bg.inputs["Strength"].default_value = 0.8
    bpy.ops.object.light_add(type='SUN'); sun = bpy.context.object
    sun.data.energy = 2.4; sun.data.angle = 0.35; sun.rotation_euler = (math.radians(48), 0, math.radians(-30))
    bpy.ops.object.camera_add(); cam = bpy.context.object
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = 15.0
    yaw, p = math.radians(25), math.radians(33)
    cam.rotation_euler = (math.pi / 2 - p, 0, yaw)
    d = (-math.sin(yaw) * math.cos(p), math.cos(yaw) * math.cos(p), -math.sin(p))
    T = (IW / 2 * bb.S, -ID / 2 * bb.S, 0.3)
    cam.location = tuple(T[i] - d[i] * 30 for i in range(3))
    sc.camera = cam
    bb.render_settings(os.path.join(OUT, f"farm-{season}.png"))
    sc.render.resolution_x, sc.render.resolution_y = 1920, 1080
    sc.cycles.samples = 96
    sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, f"farm-{season}.blend"))
    bpy.ops.render.render(write_still=True)

figs = {f["name"]: f for f in json.load(open(os.path.join(OUT, "figures.json")))}
for season in (ARGS or ["dong", "xuan"]):
    render(season, figs[season])
