import { ESceneObject, SceneObject, State } from '../types';

export const activateModel = (draft: State, type: ESceneObject): void => {
  // find out if this scene object already exists
  const existing = draft.objects.find((element: SceneObject) => element.type === type);
  // case NO (scene object does not yet exist)
  if (existing === undefined) {
    // create new TransformationSceneObject
    const newSceneObject: SceneObject = {
      type: type,
      objectID: '',
      animateFast: false,
      doInverseTransformation: false,
      transformations: [],
      useFalseNormalMatrix: false,
      showNormals: false,
      ref: '',
      reset: false,
    };
    draft.objects.push(newSceneObject);
    draft.activeObject = newSceneObject;
  } else {
    draft.activeObject = existing;
  }
};
