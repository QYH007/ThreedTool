import produce from 'immer';
import create from 'zustand';

import { InitialState } from '../initialState';
import { boxReset, bunnyReset, sphereReset, torusReset, worldReset } from '../initialState/reset';
import { EComplexModel, ESceneObject, SavedCamera, State } from '../types';
import { PolygonalModels } from '../..';

// export const [useStore, api] = create<State>((set, get) => {
export const useStore = create<State>((set, get) => {
  // update state using immer.js based on a passed function
  const update = (fn: any): void => set(produce(fn));

  return {
    scene: InitialState.initialScene,
    box: InitialState.initialBox,
    torus: InitialState.initialTorus,
    sphere: InitialState.initialSphere,
    complex: InitialState.initialComplex,
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

      // Complex
      setComplexPosition: (position: number[], target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].position = position;
        }),
      setComplexScale: (scale: number[], target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].scale = scale;
        }),
      saveComplexCamera: (savedCam: SavedCamera, target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].savedCam = savedCam;
        }),
      toggleComplexFlat: (target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].isFlat = !draft.complex.models[target].isFlat;
        }),
      toggleComplexWireframe: (target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].isWireframe = !draft.complex.models[target].isWireframe;
        }),
      toggleComplexVisible: (target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].isVisible = !draft.complex.models[target].isVisible;
        }),
      toggleComplexFaceNormals: (target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].isFaceNormals = !draft.complex.models[target].isFaceNormals;
        }),
      toggleComplexPointClouds: (target: EComplexModel): void =>
        update((draft: State) => {
          draft.complex.models[target].isPointClouds = !draft.complex.models[target].isPointClouds;
        }),
      // Scene
      setActiveSceneObject: (obj: ESceneObject): void =>
        update((draft: State) => {
          draft.scene.activeObject = obj;
          draft.complex.models[PolygonalModels.ESceneObject.Bunny].isPointClouds = false;
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
            case ESceneObject.Bunny:
              draft.complex.models['bunny'] = {
                ...bunnyReset,
                savedCam: {
                  ...get().complex.models['bunny'].savedCam,
                },
              };
              break;
            case ESceneObject.World:
              draft.complex.models['world'] = {
                ...worldReset,
                savedCam: {
                  ...get().complex.models['world'].savedCam,
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
