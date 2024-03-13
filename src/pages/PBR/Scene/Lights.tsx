import React, { useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { PBR } from '../../../stores';

const Lights: React.FC = () => {
  const scene1 = PBR.useStore((state: PBR.State) => state.scene);
  const pointLightRef = React.useRef<THREE.PointLight>(null!);
  const pointLight = pointLightRef.current;
  const [time, setTime] = useState(0);

  const pointLightHelperRef = (pointlightHelper: THREE.PointLightHelper | null) => {
    if (pointlightHelper) {
      pointlightHelper.update();
    }
  };

  useFrame(() => {
    if (pointLight && scene1.moveLight) {
      setTime(time + 0.001);
      pointLight.position.set(Math.sin(time * 7) * 3, Math.cos(time * 5) * 3.5, Math.cos(time * 3) * 3.5);
    }
  });

  return (
    <>
      <pointLight ref={pointLightRef} intensity={5 * Math.PI} castShadow position={[-3, 3.5, 3.5]} />
      {pointLight && <pointLightHelper ref={pointLightHelperRef} args={[pointLight, 0.1, 0xffffff]} />}
    </>
  );
};

export default Lights;
