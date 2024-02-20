import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Plane, useHelper, Sphere } from '@react-three/drei';
import { Illumination } from '../../../../../stores';
import { DirectionalLightHelper } from 'three';

export const PointLight: React.FC = () => {
  const lightData = Illumination.useStore((store: Illumination.Store) => store.state.lights['point']);
  const pointLightRef1 = useRef<THREE.PointLight>(null!);
  const pointLightRef2 = useRef<THREE.PointLight>(null!);

  const light = pointLightRef1.current;
  const light2 = pointLightRef2.current;

  const [counter, setCounter] = useState(0);
  const [xPos, setXPos] = useState(0);

  useFrame(() => {
    if (lightData.moveLights) {
      const xDelta = Math.sin(counter / 80) * 3;
      setXPos(xDelta);
      setCounter(counter + 1);
    }

    if (pointLightRef1.current) {
      //@ts-ignore
      pointLightRef1.current.position.set(xPos, 2, -1.5);
    }

    if (pointLightRef2.current) {
      //@ts-ignore
      pointLightRef2.current.position.set(-xPos, 2, 1.5);
    }
  });

  return (
    <>
      <pointLight
        position={[0, 2, -1.5]}
        color={(lightData.color as unknown) as THREE.Color}
        intensity={lightData.intensity}
        distance={lightData.distance}
        decay={lightData.decay}
        ref={pointLightRef1}
      />
      {light && lightData.showHelper && <pointLightHelper args={[light, 0.1, lightData.color]} />}
      <pointLight
        position={[0, 2, 1.5]}
        color={(lightData.color as unknown) as THREE.Color}
        intensity={lightData.intensity}
        distance={lightData.distance}
        decay={lightData.decay}
        ref={pointLightRef2}
      />
      {light2 && lightData.showHelper && <pointLightHelper args={[light2, 0.1, lightData.color]} />}
    </>
  );
};
