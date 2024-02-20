import { Vector3 } from 'three';

import { ESceneObject, Scene, Complex } from '../types';

export const initialScene: Scene = {
  activeObject: ESceneObject.Complex,
  hasAxisHelper: false,
  modelColor: '#6fa8dc',
  wireframeColor: 'white',
  wireframeLineWidth: 2,
  normalsLength: 0.3,
  faceNormalsColor: 0xff0000,
  vertexNormalsColor: 0x12ec5b,
  backgroundColor: '#333333',
};

export const initialComplex: Complex = {
  name: 'complex',
  savedCam: {
    position: new Vector3(5, 5, 5),
    rotation: new Vector3(0, 0, 0),
  },
  scale: [1, 1, 1],
  // AO
  intensity: 1,
  radius: 0.5,
  isDiffuse: true,
  isAO: true,
};
