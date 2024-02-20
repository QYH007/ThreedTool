import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeadLight from '../../../components/3d/HeadLight';
import { PBR } from '../../../stores';
import { ESceneObject } from '../../../stores/PBR/types/Scene';
import SphereObject from './Objects/SphereObject';
import LoadingSphere from '../../../components/3d/LoadingSphere';
import Lights from './Lights';
import TorusObject from './Objects/TorusObject';
import BoxObject from './Objects/BoxObject';
import CerberusObject from './Objects/CerberusObject';

const Scene: React.FC = () => {
  const scene = PBR.useStore((state: PBR.State) => state.scene);

  const getActiveObject = (): JSX.Element | null => {
    switch (scene.activeObject) {
      case ESceneObject.Box:
        return (
          <Suspense fallback={<LoadingSphere />}>
            <BoxObject />
          </Suspense>
        );
      case ESceneObject.Sphere:
        return (
          <Suspense fallback={<LoadingSphere />}>
            <SphereObject />
          </Suspense>
        );
      case ESceneObject.Torus:
        return (
          <Suspense fallback={<LoadingSphere />}>
            <TorusObject />
          </Suspense>
        );
      case ESceneObject.Cerberus:
        return (
          <Suspense fallback={<LoadingSphere />}>
            <CerberusObject />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <Canvas style={{ background: scene.backgroundColor }}>
      {scene.hasAxisHelper ? <axesHelper args={[20]} /> : null}
      {getActiveObject()}
      {/* <HeadLight intensity={0.8} /> */}
      <Lights />
    </Canvas>
  );
};

export default Scene;
