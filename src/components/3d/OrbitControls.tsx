import React, { useEffect, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as Controls } from 'three-stdlib/controls/OrbitControls';

extend({ Controls });

interface Props {
  enablePan: boolean;
  maxPolarAngle?: number;
}

export const OrbitControls: React.FC<Props> = ({ enablePan, maxPolarAngle }) => {
  const orbitRef = useRef<any>();
  const { gl, camera } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  useEffect(() => {
    orbitRef.current.enablePan = enablePan;
  }, [enablePan]);

  return (
    // @ts-ignore
    <controls
      ref={orbitRef}
      maxPolarAngle={maxPolarAngle ? maxPolarAngle : Math.PI}
      minPolarAngle={0}
      args={[camera, gl.domElement]}
    />
  );
};
