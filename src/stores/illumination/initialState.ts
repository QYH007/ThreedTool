import { ESceneLight, ESceneObject, EShadingModel, SceneObject, ShadingParameters, State } from './types';

export const lights = {
  activeLightSettings: '',
  spot: {
    isActive: false,
    showHelper: false,
    name: 'Spotlight',
    type: ESceneLight.SPOT,
    position: [0, 10, 5],
    intensity: 0.3,
    color: '#FFFFFF',
    distance: 20,
    angle: 0.6,
    penumbra: 0.5,
    decay: 0.5,
  },
  point: {
    isActive: false,
    showHelper: false,
    name: 'Pointlight',
    type: ESceneLight.POINT,
    position: [4, 10, 4],
    intensity: 0.4,
    color: '#FFFFFF',
    distance: 7,
    decay: 2,
    moveLights: false,
  },
  directional: {
    isActive: true,
    showHelper: false,
    name: 'Directional',
    type: ESceneLight.DIRECTIONAL,
    position: [4, 10, 4],
    intensity: 0.2,
    color: '#FFFFFF',
  },
};

/* eslint-disable @typescript-eslint/naming-convention */

export const initialShadingParameters: ShadingParameters = {
  k_a: 0.2,
  k_d: 0.5,
  k_s: 0.5,
  alpha_s: 32,
  flat: false,
};

export const spheres: SceneObject[] = [
  {
    type: ESceneObject.SPHERE,
    id: '',
    selected: false,
    visible: true,
    position: [3, 2, 0],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.SPHERE,
    id: '',
    selected: false,
    visible: true,
    position: [0, 2, 0],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.SPHERE,
    id: '',
    selected: false,
    visible: true,
    position: [-3, 2, 0],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
];

export const tori: SceneObject[] = [
  {
    type: ESceneObject.TORUS,
    id: '',
    selected: false,
    visible: true,
    position: [3, 2, 3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.TORUS,
    id: '',
    selected: false,
    visible: true,
    position: [0, 2, 3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.TORUS,
    id: '',
    selected: false,
    visible: true,
    position: [-3, 2, 3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
];

export const boxes: SceneObject[] = [
  {
    type: ESceneObject.BOX,
    id: '',
    selected: false,
    visible: true,
    position: [3, 2, -3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.BOX,
    id: '',
    selected: false,
    visible: true,
    position: [0, 2, -3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
  {
    type: ESceneObject.BOX,
    id: '',
    selected: false,
    visible: true,
    position: [-3, 2, -3],
    color: '#FFFFFF',
    shadingModel: EShadingModel.GOURAUD,
    shadingParameters: {
      gouraud: initialShadingParameters,
      phong: initialShadingParameters,
    },
  },
];

export const initialState: State = {
  globals: {
    shadingModel: 'gouraud',
    ambient: 0.2,
    diffuse: 0.5,
    specular: 0.5,
  },
  scene: {
    backgroundColor: '#333333',
    showPlane: true,
  },
  objects: {
    selectedObject: {
      id: '',
      type: ESceneObject.SPHERE,
    },
    groups: {
      torus: true,
      sphere: true,
      box: true,
    },
    sphere: [...spheres],
    box: [...boxes],
    torus: [...tori],
  },
  lights,
};
