import { a, useSpring } from '@react-spring/three';
import React, { useEffect, useRef, useState } from 'react';
// import { useResource } from '@react-three/fiber';
import * as THREE from 'three';

import { Illumination } from '../../../../../stores';
import { MaterialFromShadingModel } from '../MaterialFromShadingModel';

interface Props {
  index: number;
  torus: Illumination.SceneObject;
}

export const Torus: React.FC<Props> = ({ index, torus }) => {
  const ref = useRef<any>(null);
  const [objectID, setObjectID] = useState('');
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const objects = Illumination.useStore((store: Illumination.Store) => store.state.objects);
  // const [geometryRef, geometry] = useResource<THREE.TorusBufferGeometry>();
  const geometryRef = useRef();
  const geometry = geometryRef.current;

  const props = useSpring({ scale: objects.selectedObject.id === objectID ? [1.02, 1.02, 1.02] : [1, 1, 1] });

  const registerObject = (): void => {
    if (ref.current) {
      actions.registerObject(ref.current.uuid, Illumination.ESceneObject.TORUS, index);
      setObjectID(ref.current.uuid);
    }
  };

  const selectObject = (): void => {
    if (ref.current) {
      actions.selectObject(ref.current.uuid, Illumination.ESceneObject.TORUS);
    }
  };

  useEffect(() => {
    registerObject();
  });

  return (
    <mesh
      ref={ref}
      castShadow
      position={torus.position as [number, number, number]}
      onPointerDown={selectObject}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <torusBufferGeometry ref={geometryRef} attach="geometry" args={[0.75, 0.3, 8, 16]} />
      <MaterialFromShadingModel shadingModel={torus.shadingModel} object={torus} />
      {geometry && (
        //@ts-ignore
        <a.mesh geometry={geometry} scale={props.scale}>
          <meshBasicMaterial attach="material" color={'white'} side={THREE.BackSide} />
        </a.mesh>
      )}
    </mesh>
  );
};
