import { State } from '../types';

export const deleteTransformation = (draft: State, id: string): void => {
  const idToDelete = id;

  // delete transformations in the current active object
  draft.activeObject.transformations = draft.activeObject.transformations.filter((t) => t.id !== idToDelete);

  // delete the transformations in the objects array
  draft.objects.forEach((o) => {
    if (o.type === draft.activeObject.type) {
      o.transformations = o.transformations.filter((t) => t.id !== idToDelete);
    }
  });
};
