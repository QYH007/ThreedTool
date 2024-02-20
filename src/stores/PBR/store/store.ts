import produce from 'immer';
import create from 'zustand';

import { InitialState } from '../initialState';
import { boxReset, sphereReset, torusReset } from '../initialState/reset';
import { ESceneObject, SavedCamera, State } from '../types';

// export const [useStore, api] = create<State>((set, get) => {
export const useStore = create<State>((set, get) => {
  // update state using immer.js based on a passed function
  const update = (fn: any): void => set(produce(fn));

  return {
    scene: InitialState.initialScene,
    box: InitialState.initialBox,
    torus: InitialState.initialTorus,
    sphere: InitialState.initialSphere,
    cerberus: InitialState.initialCerberus,
    actions: {
      // Box
      setBoxDepth: (depth: number): void =>
        update((draft: State) => {
          draft.box.depth = depth;
        }),
      setBoxHeight: (height: number): void =>
        update((draft: State) => {
          draft.box.height = height;
        }),
      setBoxWidth: (width: number): void =>
        update((draft: State) => {
          draft.box.width = width;
        }),
      setBoxDepthSegments: (depthSegments: number): void =>
        update((draft: State) => {
          draft.box.depthSegments = depthSegments;
        }),
      setBoxHeightSegments: (heightSegments: number): void =>
        update((draft: State) => {
          draft.box.heightSegments = heightSegments;
        }),
      setBoxWidthSegments: (widthSegments: number): void =>
        update((draft: State) => {
          draft.box.widthSegments = widthSegments;
        }),
      saveBoxCamera: (savedCam: SavedCamera): void =>
        update((draft: State) => {
          draft.box.savedCam = savedCam;
        }),
      toggleBoxFlatShading: (): void =>
        update((draft: State) => {
          draft.box.isFlat = !draft.box.isFlat;
        }),
      toggleBoxWireframe: (): void =>
        update((draft: State) => {
          draft.box.isWireframe = !draft.box.isWireframe;
        }),
      toggleBoxVisible: (): void =>
        update((draft: State) => {
          draft.box.isVisible = !draft.box.isVisible;
        }),
      toggleBoxFaceNormals: (): void =>
        update((draft: State) => {
          draft.box.isFaceNormals = !draft.box.isFaceNormals;
        }),
      toggleBoxVertexNormals: (): void =>
        update((draft: State) => {
          draft.box.isVertexNormals = !draft.box.isVertexNormals;
        }),
      setBoxMetalness: (metalness: number): void =>
        update((draft: State) => {
          draft.box.metalness = metalness;
        }),
      setBoxRoughness: (roughness: number): void =>
        update((draft: State) => {
          draft.box.roughness = roughness;
        }),
      setBoxTransparency: (transparency: number): void =>
        update((draft: State) => {
          draft.box.transparency = transparency;
        }),

      // Sphere
      setSphereRadius: (radius: number): void =>
        update((draft: State) => {
          draft.sphere.radius = radius;
        }),
      setSphereHeightSegments: (heightSegments: number): void =>
        update((draft: State) => {
          draft.sphere.heightSegments = heightSegments;
        }),
      setSphereWidthSegments: (widthSegments: number): void =>
        update((draft: State) => {
          draft.sphere.widthSegments = widthSegments;
        }),
      setSphereMetalness: (metalness: number): void =>
        update((draft: State) => {
          draft.sphere.metalness = metalness;
        }),
      setSphereRoughness: (roughness: number): void =>
        update((draft: State) => {
          draft.sphere.roughness = roughness;
        }),
      setSphereTransparency: (transparency: number): void =>
        update((draft: State) => {
          draft.sphere.transparency = transparency;
        }),
      setSphereHavemap: (havemap: boolean): void =>
        update((draft: State) => {
          draft.sphere.havemap = havemap;
        }),
      setSphereStainless: (stainless: boolean): void =>
        update((draft: State) => {
          draft.sphere.stainless = stainless;
          draft.sphere.havemap = true;
        }),
      setSphereEnvMapIntensity: (envMapIntensity: number): void =>
        update((draft: State) => {
          draft.sphere.envMapIntensity = envMapIntensity;
        }),
      saveSphereCamera: (savedCam: SavedCamera): void =>
        update((draft: State) => {
          draft.sphere.savedCam = savedCam;
        }),
      toggleSphereFlatShading: (): void =>
        update((draft: State) => {
          draft.sphere.isFlat = !draft.sphere.isFlat;
        }),
      toggleSphereWireframe: (): void =>
        update((draft: State) => {
          draft.sphere.isWireframe = !draft.sphere.isWireframe;
        }),
      toggleSphereVisible: (): void =>
        update((draft: State) => {
          draft.sphere.isVisible = !draft.sphere.isVisible;
        }),
      toggleSphereFaceNormals: (): void =>
        update((draft: State) => {
          draft.sphere.isFaceNormals = !draft.sphere.isFaceNormals;
        }),
      toggleSphereVertexNormals: (): void =>
        update((draft: State) => {
          draft.sphere.isVertexNormals = !draft.sphere.isVertexNormals;
        }),

      // Torus
      setTorusRadius: (radius: number): void =>
        update((draft: State) => {
          draft.torus.radius = radius;
        }),
      setTorusTubeWidth: (tubeWidth: number): void =>
        update((draft: State) => {
          draft.torus.tubeWidth = tubeWidth;
        }),
      setTorusRadialSegments: (radialSegments: number): void =>
        update((draft: State) => {
          draft.torus.radialSegments = radialSegments;
        }),
      setTorusTubularSegments: (tubularSegments: number): void =>
        update((draft: State) => {
          draft.torus.tubularSegments = tubularSegments;
        }),
      saveTorusCamera: (savedCam: SavedCamera): void =>
        update((draft: State) => {
          draft.torus.savedCam = savedCam;
        }),
      toggleTorusFlatShading: (): void =>
        update((draft: State) => {
          draft.torus.isFlat = !draft.torus.isFlat;
        }),
      toggleTorusWireframe: (): void =>
        update((draft: State) => {
          draft.torus.isWireframe = !draft.torus.isWireframe;
        }),
      toggleTorusVisible: (): void =>
        update((draft: State) => {
          draft.torus.isVisible = !draft.torus.isVisible;
        }),
      toggleTorusFaceNormals: (): void =>
        update((draft: State) => {
          draft.torus.isFaceNormals = !draft.torus.isFaceNormals;
        }),
      toggleTorusVertexNormals: (): void =>
        update((draft: State) => {
          draft.torus.isVertexNormals = !draft.torus.isVertexNormals;
        }),
      setTorusMetalness: (metalness: number): void =>
        update((draft: State) => {
          draft.torus.metalness = metalness;
        }),
      setTorusRoughness: (roughness: number): void =>
        update((draft: State) => {
          draft.torus.roughness = roughness;
        }),
      setTorusOpacity: (opacity: number): void =>
        update((draft: State) => {
          draft.torus.opacity = opacity;
        }),
      setTorusTransmission: (transmission: number): void =>
        update((draft: State) => {
          draft.torus.transmission = transmission;
        }),
      setTorusReflectivity: (reflectivity: number): void =>
        update((draft: State) => {
          draft.torus.reflectivity = reflectivity;
        }),
      toggleTorusTransparent: (): void =>
        update((draft: State) => {
          draft.torus.isTransparent = !draft.torus.isTransparent;
          if (draft.torus.isTransparent) {
            draft.torus.metalness = 0;
            draft.torus.roughness = 0;
            draft.torus.opacity = 1;
            draft.torus.transmission = 1;
          } else {
            draft.torus.metalness = 0.1;
            draft.torus.roughness = 0.9;
            draft.torus.opacity = 1;
            draft.torus.transmission = 0;
          }
        }),

      //Cerberus
      setCerberusHeight: (height: number): void =>
        update((draft: State) => {
          draft.cerberus.height = height;
        }),
      setCerberusWidth: (width: number): void =>
        update((draft: State) => {
          draft.cerberus.width = width;
        }),
      setCerberusHeightSegments: (heightSegments: number): void =>
        update((draft: State) => {
          draft.cerberus.heightSegments = heightSegments;
        }),
      setCerberusWidthSegments: (widthSegments: number): void =>
        update((draft: State) => {
          draft.cerberus.widthSegments = widthSegments;
        }),
      saveCerberusCamera: (savedCam: SavedCamera): void =>
        update((draft: State) => {
          draft.cerberus.savedCam = savedCam;
        }),
      setCerberusMetalness: (metalness: number): void =>
        update((draft: State) => {
          draft.cerberus.metalness = metalness;
        }),
      setCerberusRoughness: (roughness: number): void =>
        update((draft: State) => {
          draft.cerberus.roughness = roughness;
        }),
      setCerberusTransparency: (transparency: number): void =>
        update((draft: State) => {
          draft.cerberus.transparency = transparency;
        }),
      toggleCerberusColorMap: (): void =>
        update((draft: State) => {
          draft.cerberus.colorMap = !draft.cerberus.colorMap;
        }),
      toggleCerberusMetalnessMap: (): void =>
        update((draft: State) => {
          draft.cerberus.metalnessMap = !draft.cerberus.metalnessMap;
        }),
      toggleCerberusRoughnessMap: (): void =>
        update((draft: State) => {
          draft.cerberus.roughnessMap = !draft.cerberus.roughnessMap;
        }),
      toggleCerberusNormalMap: (): void =>
        update((draft: State) => {
          draft.cerberus.normalMap = !draft.cerberus.normalMap;
        }),
      toggleCerberusAoMap: (): void =>
        update((draft: State) => {
          draft.cerberus.aoMap = !draft.cerberus.aoMap;
        }),
      toggleCerberusVisible: (): void =>
        update((draft: State) => {
          draft.cerberus.isVisible = !draft.cerberus.isVisible;
        }),

      // Scene
      setActiveSceneObject: (obj: ESceneObject): void =>
        update((draft: State) => {
          draft.scene.activeObject = obj;
        }),
      toggleAxisHelper: (): void =>
        update((draft: State) => {
          draft.scene.hasAxisHelper = !draft.scene.hasAxisHelper;
        }),
      reset: (obj: ESceneObject): void =>
        update((draft: State) => {
          switch (obj) {
            case ESceneObject.Box:
              draft.box = {
                ...boxReset,
                savedCam: {
                  ...get().box.savedCam,
                },
              };
              break;
            case ESceneObject.Sphere:
              draft.sphere = {
                ...sphereReset,
                savedCam: {
                  ...get().sphere.savedCam,
                },
              };
              break;
            case ESceneObject.Torus:
              draft.torus = {
                ...torusReset,
                savedCam: {
                  ...get().torus.savedCam,
                },
              };
              break;
            default:
              break;
          }
        }),
      setBackgroundColor: (color: string): void =>
        update((draft: State) => {
          draft.scene.backgroundColor = color;
        }),
    },
  };
});

export const api = useStore.getState();
