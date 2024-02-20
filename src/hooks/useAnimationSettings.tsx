import React from 'react';
import { StoreApi } from 'zustand';

import { DEFAULT_ANIMATION_SPEED_CONFIG, FAST_ANIMATION_SPEED_IN_MS } from '../constants';
import { Transformations } from '../stores';
import { State } from '../stores/transformations';

interface UseAnimationSettingsReturn {
  config: () => {
    tension?: number;
    friction?: number;
    duration?: number;
  };
}

export const useAnimationSettings = (
  animationStore: StoreApi<Record<string | number | symbol, any>>,
): UseAnimationSettingsReturn => {
  /**
   * subscribe to the global state
   * if the user clicks on "APPLY" to apply the Transformation Matrix M or its inverse, the booleans
   * of the active object are changed in the global state
   *
   * the useEffecs below "subscribe" to the change and set the animationStore
   */
  const fast = Transformations.useStore((state) => state.activeObject.animateFast);
  const inverse = Transformations.useStore((state) => state.activeObject.doInverseTransformation);
  const falseNormals = Transformations.useStore((state) => state.activeObject.useFalseNormalMatrix);

  React.useEffect(() => {
    animationStore.setState({ fast });
  }, [fast, animationStore]);

  React.useEffect(() => {
    animationStore.setState({ inverse });
  }, [inverse, animationStore]);

  React.useEffect(() => {
    animationStore.setState({ falseNormals });
  }, [falseNormals, animationStore]);

  const config = React.useCallback(
    () =>
      animationStore.getState().fast
        ? {
            duration: FAST_ANIMATION_SPEED_IN_MS,
          }
        : DEFAULT_ANIMATION_SPEED_CONFIG,

    [animationStore],
  );

  return { config };
};
