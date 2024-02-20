import React from 'react';

export const Ground: React.FC = () => {
  return (
    <mesh receiveShadow position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial attach="material" roughness={0.75} color="white" />
    </mesh>
  );
};
