/* eslint-disable react-hooks/exhaustive-deps */
import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import * as THREE from 'three';
import { StoreApi } from 'zustand';

import { Transformations } from '../stores';
import { arraysEqual, isObjectEmpty } from '../utils/helper';
import { useAnimationSettings } from './useAnimationSettings';
import { useAnimationStepFalseNormals } from './useAnimationStepFalseNormals';

export function useScaleAnimation(
  ref: React.MutableRefObject<THREE.Mesh>,
  onFinishedCallback: () => void,
  store: StoreApi<Record<string | number | symbol, any>>,
): void {
  // changes animationSettings based on user input
  const { config } = useAnimationSettings(store);
  // function to animate with a "wrong" normal matrix to showcase
  const { animateFalseNormalAnimationStep } = useAnimationStepFalseNormals(store);

  // one animation frame
  const applyAnimationStep = (v: any): void => {
    const oldScale = store.getState().oldScale;

    const scaleXval = v.value.scale[0] / oldScale[0];
    const scaleYval = v.value.scale[1] / oldScale[1];
    const scaleZval = v.value.scale[2] / oldScale[2];

    const mat = new THREE.Matrix4().makeScale(scaleXval, scaleYval, scaleZval);

    ref.current.matrixAutoUpdate = false;

    // if (store.getState().falseNormals) {
    //   animateFalseNormalAnimationStep(mat, ref);
    // } else {
    //   const currentTransforms = store.getState().mesh.clone();
    //   currentTransforms.applyMatrix4(mat);
    //   ref.current.matrix.copy(currentTransforms.matrix);
    // }
    const currentTransforms = store.getState().mesh.clone();
    currentTransforms.applyMatrix4(mat);
    ref.current.matrix.copy(currentTransforms.matrix);
  };

  // spring based animation hook
  // - animates the scale
  // basically spits out tiny interpolated values which
  // are used for a smooth animation each frame (onFrame).
  const [, setAnimationSpring] = useSpring(() => ({
    scale: store.getState().scale,
    onRest: onFinishedCallback,
    config,
    onChange: (v: any): void => applyAnimationStep(v),
  }));

  /**
   * Subscribes to the scale value in the store.
   * Whenever a new animation is set that changes the scale value, this
   * function gets triggered and initiates the animation.
   *
   * Example:
   * - the scale value in the store object is changed
   * - this useEffect gets triggered
   * - the function setAnimationSpring(scale) is called
   * - the animation runs
   *
   */
  useEffect(() => {
    const unsubscribe = store.subscribe(
      (scale: any) => setAnimationSpring(scale),
      (state) => ({ scale: state.scale }),
    );
    return (): void => unsubscribe();
  }, []);

  // ANIMATION SUBSCRIPTION
  const prepareNextAnimation = (animation: Transformations.Transformation): void => {
    if (!isObjectEmpty(animation)) {
      if (animation.type === Transformations.ETransformationType.SCALING) {
        if (animation.x !== undefined && animation.y !== undefined && animation.z !== undefined) {
          const currentScale = store.getState().scale;
          const inv = store.getState().inverse;

          let newScale = [];

          if (inv) {
            newScale = [
              currentScale[0] * (1 / animation.x),
              currentScale[1] * (1 / animation.y),
              currentScale[2] * (1 / animation.z),
            ];
          } else {
            newScale = [currentScale[0] * animation.x, currentScale[1] * animation.y, currentScale[2] * animation.z];
          }

          if (arraysEqual(currentScale, newScale)) {
            // trigger very small animation (not visible)
            // otherwise animation gets stuck
            newScale[0] += 0.0001;
            store.setState({
              scale: newScale,
            });
            newScale[0] -= 0.0001;
            store.setState({
              scale: newScale,
            });
          } else {
            store.setState({
              oldScale: currentScale,
              scale: newScale,
            });
          }
          const currentMesh = ref.current.clone();
          store.setState({ mesh: currentMesh });

          const currentGeometry = ref.current.geometry.clone();
          console.log(currentGeometry);
          // @ts-ignore
          store.setState({ vertices: currentGeometry.attributes.position.array });
        }
      }
    }
  };

  /**
   * Subscribes to the store.
   * Whenever the user presses play, a new animation is added to the store,
   * This function triggers on this event and calls `prepareNextAnimation(animation)`
   */
  useEffect(() => {
    const unsubscribe = store.subscribe(
      (animation: any) => prepareNextAnimation(animation),
      (state) => state.animation,
    );
    return (): void => unsubscribe();
  }, []);
}
