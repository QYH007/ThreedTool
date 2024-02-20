/* eslint-disable react-hooks/exhaustive-deps */
import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';
import * as THREE from 'three';
import { StoreApi } from 'zustand';

import { Transformations } from '../stores';
import { Axis } from '../types/common';
import { arraysEqual, isObjectEmpty } from '../utils/helper';
import { useAnimationSettings } from './useAnimationSettings';

export function useRotateAnimation(
  ref: React.MutableRefObject<THREE.Mesh>,
  onFinishedCallback: () => void,
  store: StoreApi<Record<string | number | symbol, any>>,
): void {
  // changes animationSettings based on user input
  const { config } = useAnimationSettings(store);

  // one animation frame
  const applyAnimationStep = (v: any): void => {
    const oldRotation = store.getState().oldRotation;
    const rotXval = v.value.rotation[0] - oldRotation[0];
    const rotYval = v.value.rotation[1] - oldRotation[1];
    const rotZval = v.value.rotation[2] - oldRotation[2];

    const rotX = new THREE.Matrix4().makeRotationX(rotXval);
    const rotY = new THREE.Matrix4().makeRotationY(rotYval);
    const rotZ = new THREE.Matrix4().makeRotationZ(rotZval);

    const rot = new THREE.Matrix4();
    rot.multiply(rotX);
    rot.multiply(rotY);
    rot.multiply(rotZ);

    ref.current.matrixAutoUpdate = false;

    const currentTransforms = store.getState().mesh.clone();
    currentTransforms.applyMatrix4(rot);

    ref.current.matrix.copy(currentTransforms.matrix);
  };

  // spring based animation hook
  // - animates the rotation
  // basically spits out tiny interpolated values which
  // are used for a smooth animation each frame (onFrame).
  const [, setAnimationSpring] = useSpring(() => ({
    rotation: store.getState().rotation,
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
      (rotation: any) => setAnimationSpring(rotation),
      (state) => ({ rotation: state.rotation }),
    );
    return (): void => unsubscribe();
  }, []);

  // ANIMATION SUBSCRIPTION
  const prepareNextAnimation = (animation: Transformations.Transformation): void => {
    if (!isObjectEmpty(animation)) {
      if (animation.type === Transformations.ETransformationType.ROTATION) {
        if (animation.degree !== undefined && animation.rotation !== undefined) {
          const radians = THREE.MathUtils.degToRad(animation.degree);
          const rotation = [
            animation.rotation === Axis.X ? radians : 0,
            animation.rotation === Axis.Y ? radians : 0,
            animation.rotation === Axis.Z ? radians : 0,
          ];
          const currentRotation = store.getState().rotation;
          // if inverse should be applied
          const inv = store.getState().inverse ? -1 : 1;
          const newRotation = [
            currentRotation[0] + rotation[0] * inv,
            currentRotation[1] + rotation[1] * inv,
            currentRotation[2] + rotation[2] * inv,
          ];

          if (arraysEqual(currentRotation, newRotation)) {
            // trigger very small animation (not visible)
            // otherwise animation gets stuck
            newRotation[0] += 0.0001;
            store.setState({
              rotation: newRotation,
            });
            newRotation[0] -= 0.0001;
            store.setState({
              rotation: newRotation,
            });
          } else {
            store.setState({
              oldRotation: currentRotation,
              rotation: newRotation,
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
