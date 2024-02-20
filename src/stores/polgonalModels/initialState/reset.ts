import { EComplexModel } from '../types';

export const boxReset = {
  name: 'box',
  scale: [1, 1, 1],
  color: 'gray',
  width: 2,
  maxWidth: 8,
  minWidth: 1,
  height: 2,
  maxHeight: 8,
  minHeight: 1,
  depth: 2,
  maxDepth: 8,
  minDepth: 1,
  widthSegments: 1,
  maxWidthSegments: 8,
  minWidthSegments: 1,
  heightSegments: 1,
  maxHeightSegments: 8,
  minHeightSegments: 1,
  depthSegments: 1,
  maxDepthSegments: 8,
  minDepthSegments: 1,
  isVisible: true,
  isFlat: false,
  isWireframe: false,
  isFaceNormals: false,
  isVertexNormals: false,
};

export const sphereReset = {
  name: 'sphere',
  scale: [1, 1, 1],
  color: 'red',
  radius: 1.5,
  maxRadius: 2,
  minRadius: 1,
  widthSegments: 8,
  maxWidthSegments: 30,
  minWidthSegments: 3,
  heightSegments: 8,
  maxHeightSegments: 30,
  minHeightSegments: 3,
  isVisible: true,
  isFlat: false,
  isWireframe: false,
  isFaceNormals: false,
  isVertexNormals: false,
};

export const torusReset = {
  name: 'torus',
  position: [0, 0, 0],
  scale: [1, 1, 1],
  color: 'gray',

  radius: 1,
  maxRadius: 2,
  minRadius: 0.5,

  tubeWidth: 0.3,
  maxTubeWidth: 1,
  minTubeWidth: 0.1,

  radialSegments: 10,
  maxRadialSegments: 30,
  minRadialSegments: 2,

  tubularSegments: 30,
  maxTubularSegments: 200,
  minTubularSegments: 3,

  isVisible: true,
  isFlat: false,
  isWireframe: false,
  isFaceNormals: false,
  isVertexNormals: false,
};

export const bunnyReset = {
  type: EComplexModel.BUNNY,
  name: 'bunny',
  file: '/polygonalModels/bunny/bunny.gltf',
  position: [0.25, -3, 0],
  rotation: [0, 0, 0],
  scale: [40, 40, 40],
  isVisible: true,
  isFlat: false,
  isWireframe: false,
  isFaceNormals: false,
  isPointClouds: false,
};

export const worldReset = {
  type: EComplexModel.WORLD,
  name: 'ship',
  file: '/polygonalModels/world/scene.gltf',
  position: [0, 150, 0],
  rotation: [-Math.PI / 2, 0, Math.PI],
  scale: [0.01, 0.01, 0.01],
  isVisible: true,
  isFlat: false,
  isWireframe: false,
  isFaceNormals: false,
  isPointClouds: false,
};
