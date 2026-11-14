import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// The farm models are Draco-compressed (tools/voxel); the decoder ships in public/draco.
const draco = new DRACOLoader().setDecoderPath("/draco/");

export function useFarmModel(name: string) {
  return useLoader(GLTFLoader, `/models/farm/${name}.glb`, (loader) => {
    (loader as GLTFLoader).setDRACOLoader(draco);
  });
}
