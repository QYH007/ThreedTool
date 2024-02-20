import React, { useRef } from 'react';
// import { useUpdate } from '@react-three/fiber';
import * as THREE from 'three';

import { Illumination } from '../../../../../stores';

export const SpotLight: React.FC = () => {
  const lightData = Illumination.useStore((store: Illumination.Store) => store.state.lights['spot']);
  // const [ref, light] = useResource<THREE.SpotLight>();
  const ref = useRef();
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const light = spotLightRef.current;

  const spotlightHelperRef = (spotlightHelper: THREE.SpotLightHelper | null) => {
    if (spotlightHelper) {
      spotlightHelper.update();
    }
  };

  return (
    <>
      <spotLight
        name="spotlight_1"
        intensity={lightData.intensity}
        distance={lightData.distance}
        penumbra={lightData.penumbra}
        angle={lightData.angle}
        decay={lightData.decay}
        castShadow
        position={lightData.position as [number, number, number]}
        color={(lightData.color as unknown) as THREE.Color}
        ref={spotLightRef}
      />
      {light && lightData.showHelper && <spotLightHelper ref={spotlightHelperRef} args={[light, 0x00ff00]} />}
      {/* {light && lightData.showHelper && <cameraHelper ref={camHelperRef} args={[ref.current.shadow.camera]} />} */}
    </>
  );
};
