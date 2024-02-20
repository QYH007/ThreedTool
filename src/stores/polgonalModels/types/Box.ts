import { SavedCamera } from '.';

export interface Box {
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
  depth: number;
  maxDepth: number;
  minDepth: number;
  widthSegments: number;
  maxWidthSegments: number;
  minWidthSegments: number;
  heightSegments: number;
  maxHeightSegments: number;
  minHeightSegments: number;
  depthSegments: number;
  maxDepthSegments: number;
  minDepthSegments: number;
  isVisible: boolean;
  isFlat: boolean;
  isWireframe: boolean;
  isFaceNormals: boolean;
  isVertexNormals: boolean;
}
