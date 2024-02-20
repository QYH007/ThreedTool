import { Box, Complex, EComplexModel, ESceneObject, Scene, Sphere, Torus } from '../types';
import { SavedCamera } from './Scene';

export interface State {
  scene: Scene;
  complex: Complex;
  torus: Torus;
  sphere: Sphere;
  box: Box;
  actions: {
    // BOX
    setBoxDepth: (depth: number) => void;
    setBoxHeight: (height: number) => void;
    setBoxWidth: (width: number) => void;
    setBoxDepthSegments: (depthSegments: number) => void;
    setBoxHeightSegments: (heightSegments: number) => void;
    setBoxWidthSegments: (widthSegments: number) => void;
    saveBoxCamera: (SavedCamera: SavedCamera) => void;
    toggleBoxFlatShading: () => void;
    toggleBoxWireframe: () => void;
    toggleBoxVisible: () => void;
    toggleBoxFaceNormals: () => void;
    toggleBoxVertexNormals: () => void;

    // SPHERE
    setSphereRadius: (radius: number) => void;
    setSphereHeightSegments: (heightSegments: number) => void;
    setSphereWidthSegments: (widthSegments: number) => void;
    saveSphereCamera: (SavedCamera: SavedCamera) => void;
    toggleSphereFlatShading: () => void;
    toggleSphereWireframe: () => void;
    toggleSphereVisible: () => void;
    toggleSphereFaceNormals: () => void;
    toggleSphereVertexNormals: () => void;

    // TORUS
    setTorusRadius: (radius: number) => void;
    setTorusTubeWidth: (tubeWidth: number) => void;
    setTorusRadialSegments: (radialSegments: number) => void;
    setTorusTubularSegments: (tubularSegments: number) => void;
    saveTorusCamera: (SavedCamera: SavedCamera) => void;
    toggleTorusFlatShading: () => void;
    toggleTorusWireframe: () => void;
    toggleTorusVisible: () => void;
    toggleTorusFaceNormals: () => void;
    toggleTorusVertexNormals: () => void;

    // COMPLEX
    setComplexPosition: (position: number[], target: EComplexModel) => void;
    setComplexScale: (scale: number[], target: EComplexModel) => void;
    saveComplexCamera: (SavedCamera: SavedCamera, target: EComplexModel) => void;
    toggleComplexFlat: (target: EComplexModel) => void;
    toggleComplexWireframe: (target: EComplexModel) => void;
    toggleComplexVisible: (target: EComplexModel) => void;
    toggleComplexFaceNormals: (target: EComplexModel) => void;
    toggleComplexPointClouds: (target: EComplexModel) => void;

    // SCENE
    setActiveSceneObject: (obj: ESceneObject) => void;
    toggleAxisHelper: () => void;
    reset: (obj: ESceneObject) => void;
    setBackgroundColor: (color: string) => void;
  };
}
