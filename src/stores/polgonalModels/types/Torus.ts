import { SavedCamera } from '.';

export interface Torus {
  name: string;
  savedCam: SavedCamera;
  position: number[];
  scale: number[];
  color: string | number;

  radius: number;
  maxRadius: number;
  minRadius: number;

  tubeWidth: number;
  maxTubeWidth: number;
  minTubeWidth: number;

  radialSegments: number;
  maxRadialSegments: number;
  minRadialSegments: number;

  tubularSegments: number;
  maxTubularSegments: number;
  minTubularSegments: number;

  isVisible: boolean;
  isFlat: boolean;
  isWireframe: boolean;
  isFaceNormals: boolean;
  isVertexNormals: boolean;
}
