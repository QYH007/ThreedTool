import { Config } from './premades/premades';

export interface Store {
  default: Config;
  state: State;
  actions: Actions;
}

export interface State {
  globals: Globals;

  lights: {
    activeLightSettings: ESceneLight | string;
    ['spot']: SpotLight;
    ['point']: PointLight;
    ['directional']: DirectionalLight;
  };

  objects: {
    selectedObject: {
      id: string;
      type: ESceneObject;
    };
    groups: {
      ['torus']: boolean;
      ['sphere']: boolean;
      ['box']: boolean;
    };
    sphere: SceneObject[] | [];
    box: SceneObject[] | [];
    torus: SceneObject[] | [];
  };

  scene: {
    backgroundColor: string;
    showPlane: boolean;
  };
}

export interface Actions {
  registerObject: (objectID: string, type: ESceneObject, idx: number) => void;
  toggleModelGroup: (type: ESceneObject) => void;
  selectObject: (id: string, type: ESceneObject) => void;
  setColor: (id: string, color: string, type: ESceneObject) => void;
  toggleLight: (light: ESceneLight) => void;
  toggleLightOptions: (light: ESceneLight) => void;
  toggleLightHelper: (light: ESceneLight) => void;
  toggleLightMovement: (light: ESceneLight) => void;
  setLightColor: (color: string, light: ESceneLight) => void;
  setLightIntensity: (intensity: number, light: ESceneLight) => void;
  setLightPosition: (position: number[], light: ESceneLight) => void;
  setLightDistance: (distance: number, light: ESceneLight) => void;
  setLightAngle: (angle: number, light: ESceneLight) => void;
  setLightPenumbra: (penumbra: number, light: ESceneLight) => void;
  setLightDecay: (decay: number, light: ESceneLight) => void;
  setShadingModel: (objectID: string, type: ESceneObject, shadingModel: EShadingModel) => void;
  setShadingParams: (
    objectID: string,
    type: ESceneObject,
    params: ShadingParameters,
    shadingModel: EShadingModel,
  ) => void;
  setShaderTerm: (term: ShaderTerm, value: number) => void;
  setGlobalShadingModel: (model: EShadingModel, flat?: boolean) => void;
  setBackgroundColor: (color: string) => void;
  togglePlaneVisibility: () => void;
  setState: (config: Config) => void;
  resetState: () => void;
  resetLights: () => void;
  resetObjects: () => void;
}

export interface SceneObject {
  type: ESceneObject;
  id: string;
  selected: boolean;
  visible: boolean;
  position: number[];
  color: string;
  shadingModel: EShadingModel;
  shadingParameters: {
    gouraud: ShadingParameters;
    phong: ShadingParameters;
  };
}

export interface SceneLight {
  isActive: boolean;
  showHelper: boolean;
  name: string;
  type: ESceneLight;
  position: number[];
  intensity: number;
  color: string;
}

interface Globals {
  shadingModel: 'gouraud' | 'phong' | 'flat';
  ambient: number;
  diffuse: number;
  specular: number;
}

export enum ShaderTerm {
  AMBIENT = 'k_a',
  DIFFUSE = 'k_d',
  SPECULAR = 'k_s',
}

export interface ShadingParameters {
  k_a: number;
  k_d: number;
  k_s: number;
  alpha_s: number;
  flat: boolean;
}

export interface DirectionalLight extends SceneLight {
  intensity: number;
}

export interface SpotLight extends SceneLight {
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
}

export interface PointLight extends SceneLight {
  intensity: number;
  distance: number;
  decay: number;
  moveLights: boolean;
}

export enum ESceneLight {
  DIRECTIONAL = 'directional',
  POINT = 'point',
  SPOT = 'spot',
}

export enum ESceneObject {
  BOX = 'box',
  TORUS = 'torus',
  SPHERE = 'sphere',
}

export enum EShadingModel {
  GOURAUD = 'gouraud',
  PHONG = 'phong',
}
