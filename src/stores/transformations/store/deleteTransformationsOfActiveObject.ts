import { State } from '../types';

export const deleteTransformationsOfActiveObject = (draft: State): void => {
  // delete transformations in the current active object
  draft.activeObject.transformations = [];

  // delete the transformations in the objects array
  draft.objects.forEach((o) => {
    if (o.type === draft.activeObject.type) {
      o.transformations = [];
    }
  });
};
