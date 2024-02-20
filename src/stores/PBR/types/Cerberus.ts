import { SavedCamera } from './';

export interface Cerberus {
  name: string;
  savedCam: SavedCamera;
  scale: number[];
  color: string | number;
  width: number;
  maxWidth: number;
  minWidth: number;
  height: number;
  maxHeight: number;
  minHeight: number;
  widthSegments: number;
  maxWidthSegments: number;
  minWidthSegments: number;
  heightSegments: number;
  maxHeightSegments: number;
  minHeightSegments: number;
  isVisible: boolean;
  metalness: number;
  roughness: number;
  transparency: number;
  refractionRatio: number;
  normalMap: boolean;
  roughnessMap: boolean;
  metalnessMap: boolean;
  colorMap: boolean;
  aoMap: boolean;
}
