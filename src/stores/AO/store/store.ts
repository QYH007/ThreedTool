import produce from 'immer';
import create from 'zustand';

import { InitialState } from '../initialState';
import { complexReset } from '../initialState/reset';
import { ESceneObject, SavedCamera, State } from '../types';

// export const [useStore, api] = create<State>((set, get) => {
export const useStore = create<State>((set, get) => {
  // update state using immer.js based on a passed function
  const update = (fn: any): void => set(produce(fn));

  return {
    scene: InitialState.initialScene,
    complex: InitialState.initialComplex,
    actions: {
      // Complex
      setComplexRadius: (radius: number): void =>
        update((draft: State) => {
          draft.complex.radius = radius;
        }),
      setComplexIntensity: (intensity: number): void =>
        update((draft: State) => {
          draft.complex.intensity = intensity;
        }),
      saveComplexCamera: (savedCam: SavedCamera): void =>
        update((draft: State) => {
          draft.complex.savedCam = savedCam;
        }),
      toggleComplexDiffuse: (): void =>
        update((draft: State) => {
          draft.complex.isDiffuse = !draft.complex.isDiffuse;
        }),
      toggleComplexAO: (): void =>
        update((draft: State) => {
          draft.complex.isAO = !draft.complex.isAO;
        }),
      loadedOBJ: (): void =>
        update((draft: State) => {
          draft.complex.isOBJ = true;
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
            case ESceneObject.Complex:
              draft.complex = {
                ...complexReset,
                savedCam: {
                  ...get().complex.savedCam,
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
