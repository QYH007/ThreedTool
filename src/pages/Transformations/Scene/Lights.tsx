import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Lights: React.FC = () => {
  const { camera } = useThree();
  const headlight = useRef<any>();

  useFrame((state) => {
    const camPos = state.camera.position;
    headlight.current.position.set(camPos.x, camPos.y, camPos.z);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[50, 100, -50]} intensity={0.5} />
      <pointLight ref={headlight} position={camera.position} intensity={0.4} />
    </>
  );
};

export default Lights;
