import * as THREE from 'three';
import zustand from 'zustand';

/**
 * This is a zustand store used only for the different animations/transformations.
 *
 * This store tracks position, rotation and other flags needed to animate the transformations.
 */
const storeStructure = {
  animation: {},
  fast: false,
  inverse: false,
  falseNormals: false,

  oldScale: [1, 1, 1],
  scale: [1, 1, 1],

  oldPosition: [0, 0, 0],
  position: [0, 0, 0],

  oldRotation: [0, 0, 0],
  rotation: [0, 0, 0],

  shear: [0, 0, 0],
  oldShear: [0, 0, 0],
  shearAxis: '',
  matrix: new THREE.Matrix4(),
  mesh: new THREE.Mesh(),
  vertices: [],
};

// export const [, sphereAnimationStoreApi] = zustand(() => storeStructure);
// export const [, boxAnimationStoreApi] = zustand(() => storeStructure);
// export const [, torusAnimationStoreApi] = zustand(() => storeStructure);
// export const [, groupAnimationStoreApi] = zustand(() => storeStructure);

export const sphereAnimationStoreApi = zustand(() => storeStructure);
export const boxAnimationStoreApi = zustand(() => storeStructure);
export const torusAnimationStoreApi = zustand(() => storeStructure);
export const groupAnimationStoreApi = zustand(() => storeStructure);
