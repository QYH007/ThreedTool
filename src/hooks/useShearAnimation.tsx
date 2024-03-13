/* eslint-disable react-hooks/exhaustive-deps */
import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import * as THREE from 'three';
import { StoreApi } from 'zustand';

import { Transformations } from '../stores';
import utils from '../utils/matrices';
import { arraysEqual, isObjectEmpty } from '../utils/helper';
import { useAnimationSettings } from './useAnimationSettings';
import { useAnimationStepFalseNormals } from './useAnimationStepFalseNormals';

export function useShearAnimation(
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
    // console.log("shear start")
    const oldShear = store.getState().oldShear;

    const x = v.value.shear[0] - oldShear[0];
    const y = v.value.shear[1] - oldShear[1];
    const z = v.value.shear[2] - oldShear[2];

    const shearAxis = store.getState().shearAxis;

    let mat = new THREE.Matrix4();
    switch (shearAxis) {
      case 'X':
        mat = utils.makeXShear(y as number, z as number);
        break;
      case 'Y':
        mat = utils.makeYShear(x as number, z as number);
        break;
      case 'Z':
        mat = utils.makeZShear(x as number, y as number);
        break;
      default:
        break;
    }

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
  // - animates the rotation
  // basically spits out tiny interpolated values which
  // are used for a smooth animation each frame (onFrame).
  const [, setAnimationSpring] = useSpring(() => ({
    shear: store.getState().shear,
    onRest: onFinishedCallback,
    config,
    onChange: (v: any): void => applyAnimationStep(v),
  }));

  /**
   * Subscribes to the rotation value in the store.
   * Whenever a new animation is set that changes the rotation value, this
   * function gets triggered and initiates the animation.
   *
   * Example:
   * - the rotation value in the store object is changed
   * - this useEffect gets triggered
   * - the function setAnimationSpring(rotation) is called
   * - the animation runs
   *
   */
  useEffect(() => {
    const unsubscribe = store.subscribe(
      (shear: any) => setAnimationSpring(shear),
      (state) => ({ shear: state.shear }),
    );
    return (): void => unsubscribe();
  }, []);

  // ANIMATION SUBSCRIPTION
  const prepareNextAnimation = (animation: Transformations.Transformation): void => {
    if (!isObjectEmpty(animation)) {
      if (animation.type === Transformations.ETransformationType.SHEAR) {
        if (animation.x !== undefined && animation.y !== undefined && animation.z !== undefined) {
          const currentShear = store.getState().shear;
          const inv = store.getState().inverse ? -1 : 1;

          const newShear = [
            currentShear[0] + animation.x * inv,
            currentShear[1] + animation.y * inv,
            currentShear[2] + animation.z * inv,
          ];

          if (arraysEqual(currentShear, newShear)) {
            // trigger very small animation (not visible)
            // otherwise animation gets stuck
            newShear[0] += 0.0001;
            store.setState({
              shear: newShear,
            });
            newShear[0] -= 0.0001;
            store.setState({
              shear: newShear,
            });
          } else {
            store.setState({
              oldShear: currentShear,
              shear: newShear,
              shearAxis: animation.axis,
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
