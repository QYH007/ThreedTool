import { Box, ESceneObject, Scene, Sphere, Torus, Cerberus } from '../types';
import { SavedCamera } from './Scene';

export interface State {
  scene: Scene;
  torus: Torus;
  sphere: Sphere;
  cerberus: Cerberus;
  box: Box;
  actions: {
    // BOX
    setBoxDepth: (depth: number) => void;
    setBoxHeight: (height: number) => void;
    setBoxWidth: (width: number) => void;
    setBoxDepthSegments: (depthSegments: number) => void;
    setBoxHeightSegments: (heightSegments: number) => void;
    setBoxWidthSegments: (widthSegments: number) => void;
    setBoxMetalness: (metalness: number) => void;
    setBoxRoughness: (roughness: number) => void;
    setBoxTransparency: (transparency: number) => void;
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
    // pbr
    setSphereMetalness: (metalness: number) => void;
    setSphereRoughness: (roughness: number) => void;
    setSphereTransparency: (transparency: number) => void;
    setSphereHavemap: (havemap: boolean) => void;
    setSphereStainless: (stainless: boolean) => void;
    setSphereEnvMapIntensity: (envMapIntensity: number) => void;

    // TORUS
    setTorusRadius: (radius: number) => void;
    setTorusTubeWidth: (tubeWidth: number) => void;
    setTorusRadialSegments: (radialSegments: number) => void;
    setTorusTubularSegments: (tubularSegments: number) => void;
    setTorusMetalness: (metalness: number) => void;
    setTorusRoughness: (roughness: number) => void;
    setTorusOpacity: (opacity: number) => void;
    setTorusTransmission: (transmission: number) => void;
    setTorusReflectivity: (reflectivity: number) => void;
    saveTorusCamera: (SavedCamera: SavedCamera) => void;
    toggleTorusTransparent: () => void;
    toggleTorusFlatShading: () => void;
    toggleTorusWireframe: () => void;
    toggleTorusVisible: () => void;
    toggleTorusFaceNormals: () => void;
    toggleTorusVertexNormals: () => void;

    // Cerberus
    setCerberusHeight: (height: number) => void;
    setCerberusWidth: (width: number) => void;
    setCerberusHeightSegments: (heightSegments: number) => void;
    setCerberusWidthSegments: (widthSegments: number) => void;
    setCerberusMetalness: (metalness: number) => void;
    setCerberusRoughness: (roughness: number) => void;
    setCerberusTransparency: (transparency: number) => void;
    saveCerberusCamera: (SavedCamera: SavedCamera) => void;
    toggleCerberusColorMap: () => void;
    toggleCerberusMetalnessMap: () => void;
    toggleCerberusRoughnessMap: () => void;
    toggleCerberusNormalMap: () => void;
    toggleCerberusVisible: () => void;
    toggleCerberusAoMap: () => void;

    // SCENE
    setActiveSceneObject: (obj: ESceneObject) => void;
    toggleAxisHelper: () => void;
    toggleMovingLight: () => void;
    reset: (obj: ESceneObject) => void;
    setBackgroundColor: (color: string) => void;
    setBackground: (bg: number) => void;
    setBackgroundIntensity: (bgI: number) => void;
  };
}
