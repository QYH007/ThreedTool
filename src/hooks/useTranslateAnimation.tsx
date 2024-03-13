/* eslint-disable react-hooks/exhaustive-deps */
import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import * as THREE from 'three';
import { StoreApi } from 'zustand';

import { Transformations } from '../stores';
import { arraysEqual, isObjectEmpty } from '../utils/helper';
import { useAnimationSettings } from './useAnimationSettings';
import { useAnimationStepFalseNormals } from './useAnimationStepFalseNormals';

export function useTranslateAnimation(
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
    const oldPosition = store.getState().oldPosition;
    const posXval = v.value.position[0] - oldPosition[0];
    const posYval = v.value.position[1] - oldPosition[1];
    const posZval = v.value.position[2] - oldPosition[2];

    const translationMatrix = new THREE.Matrix4().makeTranslation(posXval, posYval, posZval);

    const trans = new THREE.Matrix4().multiply(translationMatrix);

    ref.current.matrixAutoUpdate = false;

    // if (store.getState().falseNormals) {
    //   animateFalseNormalAnimationStep(trans, ref);
    // } else {
    //   const currentTransforms = store.getState().mesh.clone();
    //   currentTransforms.applyMatrix4(trans);
    //   ref.current.matrix.copy(currentTransforms.matrix);
    // }
    const currentTransforms = store.getState().mesh.clone();
    currentTransforms.applyMatrix4(trans);
    ref.current.matrix.copy(currentTransforms.matrix);
  };

  // spring based animation hook
  // - animates the position
  // basically spits out tiny interpolated values which
  // are used for a smooth animation each frame (onFrame).
  const [, setAnimationSpring] = useSpring(() => ({
    position: store.getState().position,
    onRest: onFinishedCallback,
    config,
    onChange: (v: any): void => applyAnimationStep(v),
  }));

  /**
   * Subscribes to the position value in the store.
   * Whenever a new animation is set that changes the position value, this
   * function gets triggered and initiates the animation.
   *
   * Example:
   * - the position value in the store object is changed
   * - this useEffect gets triggered
   * - the function setAnimationSpring(position) is called
   * - the animation runs
   *
   */
  useEffect(() => {
    const unsubscribe = store.subscribe(
      (position: any) => setAnimationSpring(position),
      (state) => ({
        position: state.position,
      }),
    );
    return (): void => unsubscribe();
  }, []);

  /**
   * Sets up the animation store with new vales. These new values are based on the
   * previous values (e.g., if there was a transformation beforehand).
   */
  const prepareNextAnimation = (animation: Transformations.Transformation): void => {
    if (!isObjectEmpty(animation)) {
      if (animation.type === Transformations.ETransformationType.TRANSLATION) {
        if (animation.x !== undefined && animation.y !== undefined && animation.z !== undefined) {
          const currentPosition = store.getState().position;
          // if inverse should be applied
          const inv = store.getState().inverse ? -1 : 1;
          const newPosition = [
            currentPosition[0] + animation.x * inv,
            currentPosition[1] + animation.y * inv,
            currentPosition[2] + animation.z * inv,
          ];

          if (arraysEqual(currentPosition, newPosition)) {
            // trigger very small animation (not visible)
            // otherwise animation gets stuck
            newPosition[0] += 0.0001;
            store.setState({
              position: newPosition,
            });
            newPosition[0] -= 0.0001;
            store.setState({
              position: newPosition,
            });
          } else {
            store.setState({
              oldPosition: currentPosition,
              position: newPosition,
            });
          }
          const currentMesh = ref.current.clone();
          store.setState({ mesh: currentMesh });

          const currentGeometry = ref.current.geometry.clone();
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
