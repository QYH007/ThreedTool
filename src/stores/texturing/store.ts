import produce from 'immer';
import * as THREE from 'three';
import create from 'zustand';

import { Axis } from '../../types/common';
import { EMultimappingObject, EProjection, ETexturingUnit, FilterTexture } from '../../types/texturingUnit';
import { TexturingStore } from './types';

// export const [useTexturingStore] = create<TexturingStore>((set) => {
export const useTexturingStore = create<TexturingStore>((set) => {
  // update state using immer.js based on a passed function
  const setState = (fn: any): void => set(produce(fn));

  return {
    /**
     * GENERAL
     */
    general: {
      name: 'texturing',
      unit: ETexturingUnit.TEXTURE_MAPPING,
      backgroundColor: '#333333',

      setName: (name: string): void =>
        setState((draft: TexturingStore) => {
          draft.general.name = name;
        }),
      setUnit: (unit: ETexturingUnit): void =>
        setState((draft: TexturingStore) => {
          draft.general.unit = unit;
        }),
      setBackgroundColor: (col: string): void =>
        setState((draft: TexturingStore) => {
          draft.general.backgroundColor = col;
        }),
    },

    /**
     * ALIASING
     */
    aliasing: {
      rightStrip: {
        createMipMap: true,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping,
        magFiler: THREE.LinearFilter,
        minFiler: THREE.LinearMipmapLinearFilter,
      },
      leftStrip: {
        createMipMap: false,
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping,
        magFiler: THREE.NearestFilter,
        minFiler: THREE.NearestFilter,
      },

      setLeftStrip: (tex: FilterTexture): void =>
        setState((draft: TexturingStore) => {
          draft.aliasing.leftStrip = tex;
        }),
      setRightStrip: (tex: FilterTexture): void =>
        setState((draft: TexturingStore) => {
          draft.aliasing.rightStrip = tex;
        }),
    },

    /**
     * TEXTURE MAPPING
     */
    textureMapping: {
      active: { axis: Axis.X, type: EProjection.PLANAR },
      mappings: [
        { axis: Axis.X, type: EProjection.CYLINDRICAL },
        { axis: Axis.X, type: EProjection.SPHERICAL },
      ],

      setActiveProjectionAxis: (axis: Axis): void =>
        setState((draft: TexturingStore) => {
          draft.textureMapping.active.axis = axis;
        }),

      setActiveProjection: (type: EProjection): void =>
        setState((draft: TexturingStore) => {
          if (draft.textureMapping.active.type !== type) {
            const active = { ...draft.textureMapping.active };
            const all = [active, ...draft.textureMapping.mappings];
            const mapping = draft.textureMapping.mappings.find((m) => m.type === type);
            const filtered = all.filter((m) => m.type !== type);
            if (mapping) {
              draft.textureMapping.active = mapping;
            }
            draft.textureMapping.mappings = filtered;
          }
        }),
    },

    /**
     * MULTIMAPPING
     */
    multimapping: {
      object: EMultimappingObject.RUST,
      albedo: true,
      ao: false,
      normal: false,
      displacement: false,
      roughness: false,

      toggleMap: (mapName: string): void => {
        return setState((draft: TexturingStore) => {
          //@ts-ignore
          draft.multimapping[mapName] = !draft.multimapping[mapName];
        });
      },

      setMultimapObject: (objectType: EMultimappingObject): void => {
        setState((draft: TexturingStore) => {
          draft.multimapping.object = objectType;
        });
      },
    },
  };
});
