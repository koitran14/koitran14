# Spike: export each figure as jointed parts (khoi-<season>.glb), then render a posed lineup to prove the joints.
# Usage (from the repo root): blender -b -P tools/voxel/parts_build.py -- tools/voxel
import bpy, json, math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import blender_build as bb

OUT = bb.OUT
os.makedirs(bb.MODELS, exist_ok=True)
figs = json.load(open(os.path.join(OUT, "figures.json")))
puff = lambda f: 1 if f["name"] == "dong" else 0
# export each figure from an empty scene so its parts keep their exact names (no ".001" suffixes)
for fig in figs:
    bpy.ops.wm.read_factory_settings(use_empty=True); bb.MATS.clear()
    bb.export_parts(fig, os.path.join(bb.MODELS, f"khoi-{fig['name']}.glb"), puff(fig))
bpy.ops.wm.read_factory_settings(use_empty=True); bb.MATS.clear()
roots = [bb.export_parts(f, os.path.join(OUT, "_scratch.glb"), puff(f)) for f in figs]
# test pose: one step forward, arms swinging the other way, head tilted
for i, root in enumerate(roots):
    root.location.x = (i - 1.5) * bb.SPACING; root.rotation_euler.z = -0.18
    kids = {c.name.split(".")[0]: c for c in root.children}  # names get .001 suffixes in this shared scene
    kids["legL"].rotation_euler.x = 0.5; kids["legR"].rotation_euler.x = -0.5
    kids["armL"].rotation_euler.x = -0.6; kids["armR"].rotation_euler.x = 0.6
    kids["head"].rotation_euler.y = 0.15
bb.floor(); bb.lights_camera()
bb.render_settings(os.path.join(OUT, "parts-pose.png"))
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "khoi-parts.blend"))
bpy.ops.render.render(write_still=True)
os.remove(os.path.join(OUT, "_scratch.glb"))
