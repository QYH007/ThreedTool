import { SavedCamera } from '.';

export interface Sphere {
  name: string;
  savedCam: SavedCamera;
  scale: number[];
  color: string | number;

  radius: number;
  maxRadius: number;
  minRadius: number;

  widthSegments: number;
  maxWidthSegments: number;
  minWidthSegments: number;

  heightSegments: number;
  maxHeightSegments: number;
  minHeightSegments: number;

  isVisible: boolean;
  isFlat: boolean;
  isWireframe: boolean;
  isFaceNormals: boolean;
  isVertexNormals: boolean;
}
