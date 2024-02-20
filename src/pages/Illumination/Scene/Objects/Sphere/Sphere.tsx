import { a, useSpring } from '@react-spring/three';
import React, { useEffect, useRef, useState } from 'react';
// import { useResource } from '@react-three/fiber';
import * as THREE from 'three';

import { Illumination } from '../../../../../stores';
import { MaterialFromShadingModel } from '../MaterialFromShadingModel';

interface Props {
  index: number;
  sphere: Illumination.SceneObject;
}

export const Sphere: React.FC<Props> = ({ index, sphere }) => {
  const ref = useRef<any>();
  const [objectID, setObjectID] = useState('');
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const objects = Illumination.useStore((store: Illumination.Store) => store.state.objects);
  // const [geometryRef, geometry] = useResource<THREE.SphereBufferGeometry>();
  const geometryRef = useRef<any>(null);
  const geometry = geometryRef.current;

  const props = useSpring({ scale: objects.selectedObject.id === objectID ? [1.02, 1.02, 1.02] : [1, 1, 1] });

  const registerObject = (): void => {
    if (ref.current) {
      actions.registerObject(ref.current.uuid, Illumination.ESceneObject.SPHERE, index);
      setObjectID(ref.current.uuid);
    }
  };

  const selectObject = (): void => {
    if (ref.current) {
      actions.selectObject(ref.current.uuid, Illumination.ESceneObject.SPHERE);
    }
  };

  useEffect(() => {
    registerObject();
  });

  return (
    <mesh ref={ref} castShadow position={sphere.position as [number, number, number]} onPointerDown={selectObject}>
      <sphereGeometry ref={geometryRef} attach="geometry" args={[1, 16, 16]} />
      <MaterialFromShadingModel shadingModel={sphere.shadingModel} object={sphere} />

      {geometry && (
        //@ts-ignore
        <a.mesh geometry={geometry} scale={props.scale}>
          <meshBasicMaterial attach="material" color={'white'} side={THREE.BackSide} />
        </a.mesh>
      )}
    </mesh>
  );
};
