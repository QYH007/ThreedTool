import { useState, useEffect } from 'react';
import { Transformations } from '../stores';

export const useObjectID = (ref: React.MutableRefObject<THREE.Mesh>): string => {
  const [objectID, setObjectID] = useState('');

  const setActiveObjectIds = Transformations.useStore(
    (state: Transformations.State) => state.actions.setActiveObjectIds,
  );

  useEffect(() => {
    const objID = ref.current.uuid;
    setObjectID(objID);
    setActiveObjectIds(objID);
  }, [ref, setActiveObjectIds]);

  return objectID;
};
