import produce from 'immer';
import immutUpdate from 'immutability-helper';
import create from 'zustand';

import { InitialState } from '../initialState';
import { ESceneObject, ETransformationType, State, TransformationParameters } from '../types';
import { activateModel } from './activateModel';
import { addTransformation } from './addTransformation';
import { deleteTransformation } from './deleteTransformation';
import { deleteTransformationsOfActiveObject } from './deleteTransformationsOfActiveObject';

export const getTransformationID = (draft: State): string => {
  return 't-' + draft.transformationCounter++;
};

// export const [useStore, api] = create<State>((set) => {
export const useStore = create<State>((set) => {
  // update state using immer.js based on a passed function
  const update = (fn: any): void => set(produce(fn));

  return {
    transformationCounter: 0,
    isAnimating: false,
    currentAnimationID: '',
    activeObject: InitialState.activeObject,
    inCreation: {
      active: ETransformationType.TRANSLATION,
      rotation: InitialState.initialRotation,
      translation: InitialState.initialTranslation,
      scaling: InitialState.initialScaling,
      shear: InitialState.initialShear,
    },
    objects: [InitialState.activeObject],
    scene: {
      hasAxisHelper: true,
      hasGrid: true,
      backgroundColor: '#333333',
      modelColor: '#6fa8dc',
    },

    actions: {
      moveTransformation: (dragIndex: number, hoverIndex: number): void =>
        update((draft: State) => {
          const dragCard = draft.activeObject.transformations[dragIndex];

          const updatedCards = immutUpdate(draft.activeObject.transformations, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          });

          draft.activeObject.transformations = updatedCards;
        }),

      activateCreationPanel: (type: ETransformationType): void =>
        update((draft: State) => {
          draft.inCreation.active = type;
        }),

      addTransformation: (params: TransformationParameters, type: ETransformationType): void =>
        update((draft: State) => addTransformation(draft, params, type)),

      updateTransformation: (params: TransformationParameters, type: ETransformationType): void =>
        update((draft: State) => {
          draft.inCreation[type] = params;
        }),

      deleteTransformation: (id: string): void =>
        update((draft: State) => {
          deleteTransformation(draft, id);
        }),

      deleteTransformationsOfActiveObject: (): void =>
        update((draft: State) => {
          deleteTransformationsOfActiveObject(draft);
        }),

      toggleTransformationSelected: (animationID: string): void =>
        update((draft: State) => {
          draft.activeObject.transformations.find((t) => {
            if (t.id === animationID) {
              t.active = !t.active;
            }
          });
        }),

      activateModel: (type: ESceneObject): void =>
        update((draft: State) => {
          activateModel(draft, type);
        }),

      setActiveObjectIds: (ref: string): void =>
        update((draft: State) => {
          draft.activeObject.ref = ref;

          draft.objects.forEach((o) => {
            if (o.type === draft.activeObject.type) {
              o.ref = ref;
            }
          });
        }),

      setAnimationID: (id: string): void =>
        update((draft: State) => {
          draft.currentAnimationID = id;
        }),

      startAnimating: (): void =>
        update((draft: State) => {
          draft.isAnimating = true;
        }),

      stopAnimating: (): void =>
        update((draft: State) => {
          draft.isAnimating = false;
        }),

      setShouldResetModel: (value: boolean): void =>
        update((draft: State) => {
          draft.activeObject.reset = value;
        }),

      setAnimateFast: (flag: boolean): void =>
        update((draft: State) => {
          draft.activeObject.animateFast = flag;
        }),

      setDoInverseTransformation: (flag: boolean): void =>
        update((draft: State) => {
          draft.activeObject.doInverseTransformation = flag;
        }),

      toggleUseFalseNormalMatrix: (): void =>
        update((draft: State) => {
          draft.activeObject.useFalseNormalMatrix = !draft.activeObject.useFalseNormalMatrix;
        }),

      toggleShowNormals: (): void =>
        update((draft: State) => {
          draft.activeObject.showNormals = !draft.activeObject.showNormals;
        }),
      setBackgroundColor: (color: string): void =>
        update((draft: State) => {
          draft.scene.backgroundColor = color;
        }),

      toggleAxisHelper: (): void =>
        update((draft: State) => {
          draft.scene.hasAxisHelper = !draft.scene.hasAxisHelper;
        }),
      toggleGrid: (): void =>
        update((draft: State) => {
          draft.scene.hasGrid = !draft.scene.hasGrid;
        }),
    },
  };
});

export const api = useStore.getState();
