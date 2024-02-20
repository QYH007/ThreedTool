import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export const Lights: React.FC = () => {
  const { camera } = useThree();
  const headlight = useRef<any>();

  useFrame((state) => {
    const camPos = state.camera.position;
    headlight.current.position.set(camPos.x, camPos.y, camPos.z);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[100, 100, 100]} intensity={0.2} />
      <pointLight ref={headlight} position={camera.position} intensity={0.6} />
    </>
  );
};
