import { ETransformationType, SceneObject, State, TransformationParameters } from '../types';
import { getTransformationID } from './store';

export const addTransformation = (draft: State, params: TransformationParameters, type: ETransformationType): void => {
  let transformation: any;

  if (type === ETransformationType.ROTATION) {
    transformation = {
      type: type,
      id: getTransformationID(draft),
      rotation: params.axis,
      degree: params.degree,
      active: true,
    };
  } else if (type === ETransformationType.SHEAR) {
    transformation = {
      type: type,
      id: getTransformationID(draft),
      axis: params.axis,
      x: params.x,
      y: params.y,
      z: params.z,
      active: true,
    };
  } else {
    transformation = {
      type: type,
      id: getTransformationID(draft),
      x: params.x,
      y: params.y,
      z: params.z,
      active: true,
    };
  }

  draft.objects.forEach((o: SceneObject) => {
    if (o.type === draft.activeObject.type) {
      o.transformations.push(transformation);
    }
  });

  draft.activeObject.transformations.push(transformation);
};
