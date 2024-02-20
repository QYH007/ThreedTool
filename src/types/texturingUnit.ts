import * as THREE from 'three';

import { Axis } from './common';

export enum ETexturingUnit {
  ANTIALIASING = 'ANTIALIASING',
  TEXTURE_MAPPING = 'TEXTURE_MAPPING',
  MULTI_MAPPING = 'MULTI_MAPPING',
}

export interface FilterTexture {
  createMipMap: boolean;
  wrapS: THREE.Wrapping; // 3 options
  wrapT: THREE.Wrapping; // 3 options
  magFiler: THREE.TextureFilter; // 2 options
  minFiler: THREE.TextureFilter; // 6 options
}

export enum EMultimappingObject {
  BRICK = 'BRICK',
  RUST = 'RUST',
}

export enum EProjection {
  PLANAR = 'PLANAR',
  SPHERICAL = 'SPHERICAL',
  CYLINDRICAL = 'CYLINDRICAL',
}

export interface ProjectionSetting {
  type: EProjection;
  axis: Axis;
}

export enum UVTextureResolution {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
