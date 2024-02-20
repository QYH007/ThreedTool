import { a, useSpring } from '@react-spring/three';
import React, { useEffect, useRef, useState } from 'react';
// import { useResource } from '@react-three/fiber';
import * as THREE from 'three';

import { Illumination } from '../../../../../stores';
import { MaterialFromShadingModel } from '../MaterialFromShadingModel';

interface Props {
  index: number;
  box: Illumination.SceneObject;
}

export const Box: React.FC<Props> = ({ index, box }) => {
  const ref = useRef<any>();
  const [objectID, setObjectID] = useState('');
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const objects = Illumination.useStore((store: Illumination.Store) => store.state.objects);
  // const [geometryRef, geometry] = useResource<THREE.BoxBufferGeometry>();
  const geometryRef = useRef();
  const geometry = geometryRef.current;

  const props = useSpring({ scale: objects.selectedObject.id === objectID ? [1.02, 1.02, 1.02] : [1, 1, 1] });

  const registerObject = (): void => {
    actions.registerObject(ref.current.uuid, Illumination.ESceneObject.BOX, index);
    setObjectID(ref.current.uuid);
  };

  const selectObject = (): void => {
    actions.selectObject(ref.current.uuid, Illumination.ESceneObject.BOX);
  };

  useEffect(() => {
    registerObject();
  });

  return (
    <mesh ref={ref} castShadow position={box.position as [number, number, number]} onPointerDown={selectObject}>
      <boxBufferGeometry ref={geometryRef} attach="geometry" args={[1, 1, 1]} />
      <MaterialFromShadingModel shadingModel={box.shadingModel} object={box} />
      {geometry && (
        //@ts-ignore
        <a.mesh geometry={geometry} scale={props.scale}>
          <meshBasicMaterial attach="material" color={'white'} side={THREE.BackSide} />
        </a.mesh>
      )}
    </mesh>
  );
};
