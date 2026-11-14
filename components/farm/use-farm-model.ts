import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// The farm models are Draco-compressed (tools/voxel); the decoder ships in public/draco.
const draco = new DRACOLoader().setDecoderPath("/draco/");
const url = (name: string) => `/models/farm/${name}.glb`;
const requested = new Set<string>();

export function useFarmModel(name: string) {
  requested.add(name);
  return useLoader(GLTFLoader, url(name), (loader) => {
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
}

/** Forget every model request, including failed ones, so the next open fetches them again. */
export function clearFarmModels() {
  requested.forEach((name) => useLoader.clear(GLTFLoader, url(name)));
  requested.clear();
}
