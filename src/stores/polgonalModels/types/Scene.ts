import { Vector3 } from 'three';

export enum ESceneObject {
  Box = 'box',
  Sphere = 'sphere',
  Torus = 'torus',
  Bunny = 'bunny',
  World = 'ship',
  Group = 'group',
  UserMesh = 'userMesh',
}

export interface Scene {
  activeObject: ESceneObject;
  hasAxisHelper: boolean;
  modelColor: string | number;
  wireframeColor: string | number;
  wireframeLineWidth: number;
  normalsLength: number;
  faceNormalsColor: number;
  vertexNormalsColor: number;
  backgroundColor: string;
}

export interface SavedCamera {
  position: Vector3;
  rotation: Vector3;
}