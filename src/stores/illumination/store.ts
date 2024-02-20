import produce from 'immer';
import create from 'zustand';

import { Config, initialConfig } from './premades/premades';
import { ESceneLight, ESceneObject, EShadingModel, SceneObject, ShaderTerm, ShadingParameters, Store } from './types';

function changeShaderParam(draft: Store, objectIdentifier: string, term: ShaderTerm, value: number): void {
  if (objectIdentifier === 'sphere' || objectIdentifier === 'torus' || objectIdentifier === 'box') {
    draft.state.objects[objectIdentifier].forEach((obj: SceneObject) => {
      obj.shadingParameters.gouraud[term] = value;
      obj.shadingParameters.phong[term] = value;
    });
  }
}

function changeShadingModel(draft: Store, objectIdentifier: string, model: EShadingModel, flat: boolean): void {
  if (objectIdentifier === 'sphere' || objectIdentifier === 'torus' || objectIdentifier === 'box') {
    draft.state.objects[objectIdentifier].forEach((obj: SceneObject) => {
      obj.shadingModel = model;
      obj.shadingParameters.phong.flat = flat;
    });
  }
}

// export const [useStore, api] = create<Store>((set) => {
export const useStore = create<Store>((set) => {
  // update state using immer.js based on a passed function
  const update = (fn: any): any => set(produce(fn));

  return {
    state: initialConfig.config,
    default: initialConfig,

    actions: {
      registerObject: (objectID: string, type: ESceneObject, idx: number): void =>
        update((draft: Store) => {
          draft.state.objects[type][idx].id = objectID;
        }),

      toggleModelGroup: (type: ESceneObject): void =>
        update((draft: Store) => {
          draft.state.objects.groups[type] = !draft.state.objects.groups[type];
        }),

      selectObject: (objectID: string, type: ESceneObject): void =>
        update((draft: Store) => {
          draft.state.objects.selectedObject = {
            id: objectID,
            type: type,
          };
        }),

      setShadingModel: (objectID: string, type: ESceneObject, shadingModel: EShadingModel): void =>
        update((draft: Store) => {
          draft.state.objects[type].forEach((obj: SceneObject) => {
            if (obj.id === objectID) {
              obj.shadingModel = shadingModel;
            }
          });
        }),

      setColor: (objectID: string, color: string, type: ESceneObject): void =>
        update((draft: Store) => {
          draft.state.objects[type].forEach((obj: SceneObject) => {
            if (obj.id === objectID) {
              obj.color = color;
            }
          });
        }),

      setShadingParams: (
        objectID: string,
        type: ESceneObject,
        params: ShadingParameters,
        shadingModel: EShadingModel,
      ): void =>
        update((draft: Store) => {
          draft.state.objects[type].forEach((obj: SceneObject) => {
            if (obj.id === objectID) {
              if (shadingModel === EShadingModel.GOURAUD) {
                obj.shadingParameters.gouraud = params;
              }
              if (shadingModel === EShadingModel.PHONG) {
                obj.shadingParameters.phong = params;
              }
            }
          });
        }),

      setShaderTerm: (term: ShaderTerm, value: number): void =>
        update((draft: Store) => {
          switch (term) {
            case ShaderTerm.AMBIENT:
              draft.state.globals.ambient = value;
              break;
            case ShaderTerm.DIFFUSE:
              draft.state.globals.diffuse = value;
              break;
            case ShaderTerm.SPECULAR:
              draft.state.globals.specular = value;
              break;
            default:
              break;
          }
          changeShaderParam(draft, 'sphere', term, value);
          changeShaderParam(draft, 'box', term, value);
          changeShaderParam(draft, 'torus', term, value);
        }),

      setGlobalShadingModel: (model: EShadingModel, flat = false): void =>
        update((draft: Store) => {
          if (flat) {
            draft.state.globals.shadingModel = 'flat';
          } else {
            draft.state.globals.shadingModel = model;
          }
          changeShadingModel(draft, 'sphere', model, flat);
          changeShadingModel(draft, 'box', model, flat);
          changeShadingModel(draft, 'torus', model, flat);
        }),

      toggleLight: (light: ESceneLight): void =>
        update((draft: Store) => {
          draft.state.lights[light].isActive = !draft.state.lights[light].isActive;

          if (draft.state.lights.activeLightSettings === light) {
            draft.state.lights.activeLightSettings = '';
          }

          if (draft.state.lights[light].isActive) {
            draft.state.lights.activeLightSettings = light;
          }
        }),

      toggleLightOptions: (light: ESceneLight): void =>
        update((draft: Store) => {
          if (draft.state.lights.activeLightSettings === light) {
            draft.state.lights.activeLightSettings = '';
          } else {
            draft.state.lights.activeLightSettings = light;
          }
        }),

      setLightColor: (color: string, light: ESceneLight): void =>
        update((draft: Store) => {
          draft.state.lights[light].color = color;
        }),

      toggleLightHelper: (light: ESceneLight): void =>
        update((draft: Store) => {
          draft.state.lights[light].showHelper = !draft.state.lights[light].showHelper;
        }),

      toggleLightMovement: (light: ESceneLight): void =>
        update((draft: Store) => {
          if (light === ESceneLight.POINT) {
            draft.state.lights[light].moveLights = !draft.state.lights[light].moveLights;
          }
        }),

      setLightIntensity: (intensity: number, light: ESceneLight): void =>
        update((draft: Store) => {
          draft.state.lights[light].intensity = intensity;
        }),

      setLightDistance: (distance: number, light: ESceneLight): void =>
        update((draft: Store) => {
          if (light === ESceneLight.SPOT || light === ESceneLight.POINT) {
            draft.state.lights[light].distance = distance;
          }
        }),

      setLightDecay: (decay: number, light: ESceneLight): void =>
        update((draft: Store) => {
          if (light === ESceneLight.SPOT || light === ESceneLight.POINT) {
            draft.state.lights[light].decay = decay;
          }
        }),

      setLightPosition: (position: number[], light: ESceneLight): void =>
        update((draft: Store) => {
          draft.state.lights[light].position = position;
        }),

      setLightAngle: (angle: number, light: ESceneLight): void =>
        update((draft: Store) => {
          if (light === ESceneLight.SPOT) {
            draft.state.lights[light].angle = angle;
          }
        }),

      setLightPenumbra: (penumbra: number, light: ESceneLight): void =>
        update((draft: Store) => {
          if (light === ESceneLight.SPOT) {
            draft.state.lights[light].penumbra = penumbra;
          }
        }),
      setBackgroundColor: (color: string): void =>
        update((draft: Store) => {
          draft.state.scene.backgroundColor = color;
        }),
      togglePlaneVisibility: (): void =>
        update((draft: Store) => {
          draft.state.scene.showPlane = !draft.state.scene.showPlane;
        }),
      setState: (config: Config): void =>
        update((draft: Store) => {
          draft.default = config;
          draft.state = config.config;
        }),
      resetState: (): void =>
        update((draft: Store) => {
          draft.state = draft.default.config;
        }),
      resetLights: (): void =>
        update((draft: Store) => {
          draft.state.lights = draft.default.config.lights;
        }),
      resetObjects: (): void =>
        update((draft: Store) => {
          draft.state.globals = draft.default.config.globals;
          draft.state.objects = draft.default.config.objects;
        }),
    },
  };
});

export const api = useStore.getState();
