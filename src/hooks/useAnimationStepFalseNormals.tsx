import React from 'react';
import { Matrix4, Vector3 } from 'three';
import { StoreApi } from 'zustand';

interface UseAnimationStepFalseNormalsReturn {
  animateFalseNormalAnimationStep: (scaleMatrix: Matrix4, ref: any) => void;
}

export const useAnimationStepFalseNormals = (
  animationStore: StoreApi<Record<string | number | symbol, any>>,
): UseAnimationStepFalseNormalsReturn => {
  const animate = React.useCallback(
    (scaleMatrix: Matrix4, ref: any) => {
      //@ts-ignore
      const oldVertices = animationStore.getState().vertices;
      // console.log(oldVertices)

      const positionAttribute = ref.current.geometry.getAttribute('position');
      if (!positionAttribute) return;

      const positions = positionAttribute.array;
      // console.log(positions)

      for (let i = 0, il = positions.length; i < il; i += 3) {
        const x = oldVertices[i];
        const y = oldVertices[i + 1];
        const z = oldVertices[i + 2];

        // console.log(new Vector3(x, y, z))

        const newVertex = new Vector3(x, y, z).applyMatrix4(scaleMatrix);
        // console.log(newVertex)

        positions[i] = newVertex.x;
        positions[i + 1] = newVertex.y;
        positions[i + 2] = newVertex.z;
      }

      // console.log(ref.current.geometry.attributes)
      //@ts-ignore
      ref.current.geometry.attributes.position.needsUpdate = true;
      //@ts-ignore
      ref.current.geometry.attributes.normal.needsUpdate = false;
    },
    [animationStore],
  );

  return { animateFalseNormalAnimationStep: animate };
};
