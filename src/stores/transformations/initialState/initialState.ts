import { Axis } from '../../../types/common';
import { ESceneObject, SceneObject, TransformationParameters } from '../types';

export const initialRotation: TransformationParameters = {
  axis: Axis.X,
  degree: 0,
};

export const initialTranslation: TransformationParameters = {
  x: 0,
  y: 0,
  z: 0,
};

export const initialScaling: TransformationParameters = {
  x: 1,
  y: 1,
  z: 1,
};

export const initialShear: TransformationParameters = {
  axis: Axis.X,
  x: 0,
  y: 0,
  z: 0,
};

export const activeObject: SceneObject = {
  type: ESceneObject.BOX,
  objectID: '',
  animateFast: false,
  doInverseTransformation: false,
  transformations: [],
  useFalseNormalMatrix: false,
  showNormals: false,
  ref: '',
  reset: false,
};
