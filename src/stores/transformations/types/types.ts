import { Axis } from '../../../types/common';

export interface State {
  transformationCounter: number;
  isAnimating: boolean;
  currentAnimationID: string;
  objects: SceneObject[];
  activeObject: SceneObject;
  inCreation: TransformationsInCreation;
  scene: {
    hasGrid: boolean;
    hasAxisHelper: boolean;
    backgroundColor: string;
    modelColor: string;
  };
  actions: {
    moveTransformation: (dragIndex: number, hoverIndex: number) => void;

    activateCreationPanel: (type: ETransformationType) => void;

    addTransformation: (params: TransformationParameters, type: ETransformationType) => void;
    updateTransformation: (params: TransformationParameters, type: ETransformationType) => void;
    deleteTransformation: (id: string) => void;
    deleteTransformationsOfActiveObject: () => void;
    toggleTransformationSelected: (animationID: string) => void;

    activateModel: (type: ESceneObject) => void;
    setActiveObjectIds: (ref: string) => void;

    setAnimationID: (id: string) => void;
    startAnimating: () => void;
    stopAnimating: () => void;
    setShouldResetModel: (value: boolean) => void;

    setAnimateFast: (flag: boolean) => void;
    setDoInverseTransformation: (flag: boolean) => void;

    toggleUseFalseNormalMatrix: () => void;
    toggleShowNormals: () => void;

    setBackgroundColor: (color: string) => void;
    toggleAxisHelper: () => void;
    toggleGrid: () => void;
  };
}

export interface SceneObject {
  type: ESceneObject;
  objectID: string;
  animateFast: boolean;
  doInverseTransformation: boolean;
  useFalseNormalMatrix: boolean;
  showNormals: boolean;
  transformations: Transformation[];
  ref: any;
  reset: boolean;
}

export interface Transformation {
  type: ETransformationType;
  id: string;
  x?: number;
  y?: number;
  z?: number;
  axis?: Axis;
  rotation?: Axis;
  degree?: number;
  active: boolean;
}

export interface TransformationsInCreation {
  ['active']: ETransformationType | null;
  ['rotation']: TransformationParameters;
  ['translation']: TransformationParameters;
  ['scaling']: TransformationParameters;
  ['shear']: TransformationParameters;
}

export interface TransformationParameters {
  x?: number;
  y?: number;
  z?: number;
  axis?: Axis;
  degree?: number;
}

export enum ETransformationType {
  SCALING = 'scaling',
  ROTATION = 'rotation',
  TRANSLATION = 'translation',
  SHEAR = 'shear',
}

export enum ESceneObject {
  BOX = 'box',
  SPHERE = 'sphere',
  TORUS = 'torus',
  GROUP = 'group',
}
