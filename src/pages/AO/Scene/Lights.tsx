import React from 'react';

const AMBIENT_LIGHT_INTENSITY = 0.2;
const POINT_LIGHT_POSITION: [number, number, number] = [50, 100, -50];
const POINT_LIGHT_INTENSITY = 0.2;

const Lights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <pointLight position={POINT_LIGHT_POSITION} intensity={POINT_LIGHT_INTENSITY} />
    </>
  );
};

export default Lights;
