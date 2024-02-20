import { SavedCamera } from '.';

export enum EComplexModel {
  BUNNY = 'bunny',
  WORLD = 'world',
}

export interface ComplexModel {
  type: EComplexModel;
  savedCam: SavedCamera;
  name: string;
  file: string;
  position: number[];
  rotation: number[];
  scale: number[];
  isVisible: boolean;
  isFlat: boolean;
  isWireframe: boolean;
  isFaceNormals: boolean;
  isPointClouds: boolean;
}

export interface Complex {
  models: {
    bunny: ComplexModel;
    world: ComplexModel;
  };
}
