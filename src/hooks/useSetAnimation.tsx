import React from 'react';
import { StoreApi } from 'zustand';
import { Matrix4, Quaternion } from 'three';

import { Transformations } from '../stores';

interface UseSetAnimationReturn {
  set: (animation: Transformations.Transformation) => void;
  reset: (ref: any) => void;
}

export const useSetAnimation = (
  animationStore: StoreApi<Record<string | number | symbol, any>>,
): UseSetAnimationReturn => {
  // sets the animation object in the animationStore
  const set = React.useCallback(
    (animation: Transformations.Transformation) => {
      animationStore.setState({
        animation: { ...animation },
      });
    },
    [animationStore],
  );

  // resets the animated object
  const reset = React.useCallback((ref: any) => {
    ref.current.matrix.copy(new Matrix4());
    ref.current.setRotationFromQuaternion(new Quaternion());
  }, []);

  return { set, reset };
};
