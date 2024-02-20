import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeadLight from '../../../components/3d/HeadLight';
import { AO } from '../../../stores';
import ComplexObject from './Objects/ComplexObject';
import Lights from './Lights';

const Scene: React.FC = () => {
  const scene = AO.useStore((state: AO.State) => state.scene);

  return (
    <Canvas style={{ background: scene.backgroundColor }}>
      {scene.hasAxisHelper ? <axesHelper args={[20]} /> : null}
      <ComplexObject />
      <HeadLight intensity={0.2} />
      <Lights />
    </Canvas>
  );
};

export default Scene;
