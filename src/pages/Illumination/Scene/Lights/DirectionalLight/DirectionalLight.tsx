import React, { useRef } from 'react';
// import { useResource } from '@react-three/fiber';
import { OrbitControls, Plane, useHelper, Sphere } from '@react-three/drei';

import { ILLUMINATION_LIGHT_HELPER_COLOR } from '../../../../../constants';
import { Illumination } from '../../../../../stores';
import { DirectionalLightHelper } from 'three';
import * as THREE from 'three';

export const DirectionalLight: React.FC = () => {
  const lightData = Illumination.useStore((store: Illumination.Store) => store.state.lights['directional']);

  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  // useHelper(directionalLightRef, DirectionalLightHelper, 3, "red");

  return (
    <>
      <directionalLight
        color={(lightData.color as unknown) as THREE.Color}
        intensity={lightData.intensity}
        position={new THREE.Vector3(0, 10, 0)}
        ref={directionalLightRef}
      />
      {/* {light && lightData.showHelper && (
        <directionalLightHelper args={[light, 0.25, ILLUMINATION_LIGHT_HELPER_COLOR]} />
      )} */}
      {lightData.showHelper && <directionalLightHelper args={[directionalLightRef.current, 0.25, 'red']} />}
    </>
  );
};
