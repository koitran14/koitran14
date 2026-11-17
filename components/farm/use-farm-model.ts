import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// The farm models are Draco-compressed (tools/voxel); the decoder ships in public/draco.
const draco = new DRACOLoader().setDecoderPath("/draco/");
const url = (name: string) => `/models/farm/${name}.glb`;
const requested = new Set<string>();
const bytes = new Map<string, [loaded: number, total: number]>();

export function useFarmModel(name: string) {
  requested.add(name);
  return useLoader(GLTFLoader, url(name), (loader) => {
    (loader as GLTFLoader).setDRACOLoader(draco);
  }, (e) => {
    // shortcut: a response without a length (compressed in transit) counts as done once it arrives, so the bar jumps
    // for that file; the models are served as plain binaries, which carry one
    bytes.set(name, [e.loaded, e.lengthComputable ? e.total : e.loaded]);
  });
}

/** 0..1: bytes of the farm models fetched so far over those requested; 0 before any has started. */
export function farmLoadProgress() {
  let loaded = 0, total = 0;
  bytes.forEach(([l, t]) => { loaded += l; total += t; });
  return total ? loaded / total : 0;
}

/** Forget every model request, including failed ones, so the next open fetches them again. */
export function clearFarmModels() {
  requested.forEach((name) => useLoader.clear(GLTFLoader, url(name)));
  requested.clear(); bytes.clear();
}
