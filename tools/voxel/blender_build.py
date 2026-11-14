# Spike: build bevelled voxel figures from figures.json, render a lineup, export .glb + .blend.
# Usage (from the repo root): blender -b -P tools/voxel/blender_build.py -- tools/voxel
import bpy, bmesh, json, os, sys

OUT = sys.argv[sys.argv.index("--") + 1]   # folder holding figures.json; previews and .blend files go here too
MODELS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "public", "models", "farm")  # shipped .glb files
S = 0.05          # voxel edge in metres

SPACING = 1.9

def lin(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c] + [1.0]

# (normal axis, u axis, v axis) with u x v = normal, so quads wind outward
DIRS = [((1, 0, 0), 1, 2), ((-1, 0, 0), 2, 1), ((0, 1, 0), 2, 0), ((0, -1, 0), 0, 2), ((0, 0, 1), 0, 1), ((0, 0, -1), 1, 0)]
MATS = {}

def color_mat(hexc):
    # one material per colour: flat faces stay seamless, and colour changes become material
    # boundaries that Freestyle can outline
    if hexc not in MATS:
        m = bpy.data.materials.new(hexc)
        m.use_nodes = True
        bsdf = m.node_tree.nodes["Principled BSDF"]
        bsdf.inputs["Base Color"].default_value = lin(hexc)
        bsdf.inputs["Roughness"].default_value = 0.5
        m.diffuse_color = lin(hexc)  # viewport colour, so Solid mode shows it too
        MATS[hexc] = m
    return MATS[hexc]

def build_figure(fig):
    occ = {(v[0], v[1], v[2]): v[3] for v in fig["voxels"]}  # voxels may carry a 5th "part" field
    vidx, verts, faces, fmat, slots = {}, [], [], [], {}
    def vert(p):
        if p not in vidx:
            vidx[p] = len(verts)
            x, y, z = p
            verts.append((x * S, -z * S, y * S))   # voxel y-up/z-front -> Blender z-up/-y-front
        return vidx[p]
    for (x, y, z), c in occ.items():
        for n, ua, va in DIRS:
            if (x + n[0], y + n[1], z + n[2]) in occ:
                continue
            base = [x + max(n[0], 0), y + max(n[1], 0), z + max(n[2], 0)]
            u = [0, 0, 0]; u[ua] = 1
            v = [0, 0, 0]; v[va] = 1
            q = [tuple(base[i] + a * u[i] + b * v[i] for i in range(3)) for a, b in ((0, 0), (1, 0), (1, 1), (0, 1))]
            faces.append([vert(p) for p in q])
            if c not in slots: slots[c] = len(slots)
            fmat.append(slots[c])
    me = bpy.data.meshes.new(fig["name"])
    me.from_pydata(verts, [], faces)
    for c in slots: me.materials.append(color_mat(c))
    me.polygons.foreach_set("material_index", fmat)
    ob = bpy.data.objects.new(fig["name"], me)
    bpy.context.collection.objects.link(ob)
    # round only the real corners; coplanar faces of one colour stay one clean surface
    bev = ob.modifiers.new("bevel", 'BEVEL')
    bev.width = S * 0.14; bev.segments = 2; bev.limit_method = 'ANGLE'; bev.angle_limit = 0.5; bev.use_clamp_overlap = True
    return ob

def outlines():
    sc = bpy.context.scene
    try:
        sc.render.use_freestyle = True
        sc.render.line_thickness_mode = 'ABSOLUTE'; sc.render.line_thickness = 2.6
        ls = bpy.context.view_layer.freestyle_settings.linesets[0]
        ls.select_silhouette = False; ls.select_border = False; ls.select_material_boundary = False
        ls.select_crease = False; ls.select_external_contour = True
        if ls.linestyle is None: ls.linestyle = bpy.data.linestyles.new("Outline")
        ls.linestyle.color = lin("#3A2E3A")[:3]
        ls.linestyle.thickness = 2.6
        print("freestyle on")
    except Exception as e:
        print("freestyle skipped:", e)

def floor():
    bpy.ops.mesh.primitive_plane_add(size=60)
    ob = bpy.context.object
    m = bpy.data.materials.new("floor"); m.use_nodes = True; nt = m.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Roughness"].default_value = 0.18
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.offset = 0.0; brick.squash = 1.0
    brick.inputs["Color1"].default_value = lin("#5558A8"); brick.inputs["Color2"].default_value = lin("#5558A8")
    brick.inputs["Mortar"].default_value = lin("#474A96")
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = 0.012
    brick.inputs["Brick Width"].default_value = 0.6; brick.inputs["Row Height"].default_value = 0.6
    tc = nt.nodes.new("ShaderNodeTexCoord")
    nt.links.new(tc.outputs["Object"], brick.inputs["Vector"])
    nt.links.new(brick.outputs["Color"], bsdf.inputs["Base Color"])
    ob.data.materials.append(m)

def lights_camera():
    w = bpy.context.scene.world or bpy.data.worlds.new("World"); bpy.context.scene.world = w
    w.use_nodes = True
    bg = w.node_tree.nodes["Background"]; bg.inputs["Color"].default_value = lin("#C9C4F0"); bg.inputs["Strength"].default_value = 1.1
    bpy.ops.object.light_add(type='SUN', location=(0, 0, 5)); sun = bpy.context.object
    sun.data.energy = 2.6; sun.data.angle = 0.6; sun.rotation_euler = (0.95, 0.0, -0.5)
    bpy.ops.object.light_add(type='AREA', location=(3, 3, 3)); rim = bpy.context.object
    rim.data.energy = 250; rim.data.size = 3; rim.data.color = (0.85, 0.82, 1.0)
    rim.rotation_euler = (-0.9, 0, 2.4)
    bpy.ops.object.light_add(type='AREA', location=(4, -6, 2.5)); fill = bpy.context.object
    fill.data.energy = 180; fill.data.size = 4; fill.rotation_euler = (1.2, 0, 0.55)
    tgt = bpy.data.objects.new("target", None); tgt.location = (-0.3, 0, 0.9); bpy.context.collection.objects.link(tgt)
    bpy.ops.object.camera_add(location=(-3.3, -17.5, 4.6)); cam = bpy.context.object
    cam.data.lens = 85
    c = cam.constraints.new('TRACK_TO'); c.target = tgt; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
    bpy.context.scene.camera = cam

def render_settings(path):
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.samples = 128
    sc.cycles.use_denoising = True
    try:
        prefs = bpy.context.preferences.addons["cycles"].preferences
        for dt in ("OPTIX", "CUDA", "HIP", "ONEAPI"):
            try:
                prefs.compute_device_type = dt; prefs.get_devices()
                if any(d.type == dt for d in prefs.devices):
                    for d in prefs.devices: d.use = True
                    sc.cycles.device = 'GPU'; break
            except TypeError:
                continue
    except Exception as e:
        print("GPU setup skipped:", e)
    print("Cycles device:", sc.cycles.device)
    sc.render.resolution_x, sc.render.resolution_y = 1600, 800
    sc.view_settings.view_transform = 'AgX'
    try: sc.view_settings.look = 'AgX - Medium High Contrast'
    except TypeError as e: print('look skipped:', e)
    sc.render.filepath = path

def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    figs = json.load(open(os.path.join(OUT, "figures.json")))
    obs = []
    for i, fig in enumerate(figs):
        ob = build_figure(fig)
        ob.location.x = (i - 1.5) * SPACING
        ob.rotation_euler.z = -0.18
        obs.append(ob)
    for ob in obs:  # one .glb per figure, at the origin, for three.js
        loc = ob.location.copy(); ob.location = (0, 0, 0)
        bpy.ops.object.select_all(action='DESELECT'); ob.select_set(True)
        bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f"khoi-{ob.name}.glb"), export_format='GLB', use_selection=True)
        ob.location = loc
    floor(); lights_camera()
    render_settings(os.path.join(OUT, "lineup.png"))
    # outlines()  # tried Freestyle: material-boundary lines cluttered the faces, contour-only broke up
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "khoi-seasons.blend"))
    bpy.ops.render.render(write_still=True)

# Joint pivots in voxel coordinates (post-stretch), see partOf() in figures.mjs.
PIVOTS = {"body": (0, 0, 0), "head": (0, 16, 0), "legL": (-3, 8, 0), "legR": (3, 8, 0), "armL": (-7, 14.5, 0), "armR": (7, 14.5, 0)}

def export_parts(fig, path, puff=0):
    """One mesh per part with its origin at the joint, all parented to an empty named 'khoi'."""
    import mathutils
    root = bpy.data.objects.new("khoi", None); bpy.context.collection.objects.link(root)
    for part, (px, py, pz) in PIVOTS.items():
        vox = [v for v in fig["voxels"] if v[4] == part]
        if not vox: continue
        ob = build_figure({"name": part, "voxels": vox})
        if part.startswith("arm"): px += -puff if px < 0 else puff
        pivot = mathutils.Vector((px * S, -pz * S, py * S))
        ob.data.transform(mathutils.Matrix.Translation(-pivot)); ob.location = pivot; ob.parent = root
    bpy.ops.object.select_all(action='DESELECT')
    root.select_set(True)
    for c in root.children: c.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_apply=True)
    return root

if __name__ == "__main__":
    main()
