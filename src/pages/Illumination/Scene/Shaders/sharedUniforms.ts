/* eslint-disable @typescript-eslint/naming-convention */
import * as THREE from 'three';

export const sharedUniforms = {
  k_a: { value: 0.0 },
  k_d: { value: 0.0 },
  k_s: { value: 0.0 },
  alpha_s: { value: 0.0 },
  objectColor: new THREE.Uniform(new THREE.Color()),
};
