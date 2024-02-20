/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect } from 'react';
import zustand, { StoreApi } from 'zustand';

import { Transformations } from '../stores';
import { isObjectEmpty } from '../utils/helper';
import { useRotateAnimation } from './useRotateAnimation';
import { useScaleAnimation } from './useScaleAnimation';
import { useSetAnimation } from './useSetAnimation';
import { useShearAnimation } from './useShearAnimation';
import { useTranslateAnimation } from './useTranslateAnimation';
import { State } from '../stores/transformations';

interface ZustandStore {
  animating: boolean;
  animation: Transformations.Transformation | {};
  animations: Transformations.Transformation[];
}

// const [, api] = zustand<ZustandStore>(() => ({
//   animating: false,
//   animation: {},
//   animations: [],
// }));

const api = zustand<ZustandStore>(() => ({
  animating: false,
  animation: {},
  animations: [],
}));

export function useAnimations<T extends Record<string | number | symbol, any>>(
  animations: Transformations.Transformation[],
  ref: React.MutableRefObject<THREE.Mesh>,
  // store: StoreApi<Record<string | number | symbol, any>>,
  store: StoreApi<T>,
): { start: () => void } {
  const { set: setAnimation, reset: resetAnimation } = useSetAnimation(store);

  const shouldReset = Transformations.useStore((state) => state.activeObject.reset);
  const isAnimating = Transformations.useStore((state) => state.isAnimating);
  const inverse = Transformations.useStore((state) => state.activeObject.doInverseTransformation);
  const setCurrentAnimationID = Transformations.useStore((state) => state.actions.setAnimationID);
  const setShouldReset = Transformations.useStore((state) => state.actions.setShouldResetModel);
  const stopAnimating = Transformations.useStore((state) => state.actions.stopAnimating);
  const setAnimateFast = Transformations.useStore((state) => state.actions.setAnimateFast);
  const setDoInverseTransformation = Transformations.useStore((state) => state.actions.setDoInverseTransformation);

  const animationFinishedCallback = (): void => setNextAnimation();

  useScaleAnimation(ref, animationFinishedCallback, store);
  useTranslateAnimation(ref, animationFinishedCallback, store);
  useRotateAnimation(ref, animationFinishedCallback, store);
  useShearAnimation(ref, animationFinishedCallback, store);

  /******************************
   * ANIMATION LOGIC
   *****************************/
  const initAnimations = (): void => {
    const filteredAnimations = animations.filter((anim) => anim.active);
    api.setState({ animations: inverse ? filteredAnimations.reverse() : filteredAnimations });
  };

  const setNextAnimation = (): void => {
    const animations = api.getState().animations;
    const animating = api.getState().animating;

    if (animations.length > 0 && animating) {
      const animationsCopy = [...api.getState().animations];
      const nextAnimation = animationsCopy.splice(0, 1);

      api.setState({ animation: nextAnimation[0] });
      api.setState({ animations: animationsCopy });
    } else if (api.getState().animations.length === 0 && animating) {
      api.setState({ animation: {} });
      setCurrentAnimationID('');
      setAnimateFast(false);
      setDoInverseTransformation(false);
      stopAnimating();
    }
  };

  const onAnimationChangeHandler = (animation: Transformations.Transformation): void => {
    if (!isObjectEmpty(animation)) {
      setAnimation(animation);
      setCurrentAnimationID(animation.id);
    }
  };

  /******************************
   * RESET OBJECTS AND TRANSFORMATIONS
   *****************************/
  const reset = (): void => {
    resetAnimation(ref);
    initAnimations();
  };

  useEffect(() => {
    const unsubscribe = api.subscribe(
      (animation: any) => onAnimationChangeHandler(animation),
      (state) => state.animation,
    );
    return (): void => unsubscribe();
  }, []);

  useEffect(() => {
    initAnimations();
  }, [animations]);

  // Reset the object
  useEffect(() => {
    if (shouldReset) {
      reset();
      setShouldReset(false);
    }
  }, [shouldReset]);

  // Start the animations
  useEffect(() => {
    api.setState({ animating: isAnimating });
    if (isAnimating) {
      start();
    }
  }, [isAnimating]);

  const start = (): void => {
    initAnimations();
    setNextAnimation();
  };

  return { start };
}
