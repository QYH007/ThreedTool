import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';

import HeadLight from '../../../components/3d/HeadLight';
import { PolygonalModels } from '../../../stores';
import { ESceneObject } from '../../../stores/polgonalModels/types/Scene';
import Lights from './Lights';
import BoxObject from './Objects/BoxObject';
import BunnyObject from './Objects/BunnyObject';
import SphereObject from './Objects/SphereObject';
import TorusObject from './Objects/TorusObject';
import World from './Objects/World';
import UserMesh from './Objects/UserMesh';
import * as THREE from 'three';
import { useModelContext } from '../ModelContext';

const Scene: React.FC = () => {
  const scene = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene);

  const { model, setModel, modelType, setModelType } = useModelContext();
  //console.log('Scene model:', model);

  const getActiveObject = (): JSX.Element | null => {
    switch (scene.activeObject) {
      case ESceneObject.Box:
        return <BoxObject />;
      case ESceneObject.Sphere:
        return <SphereObject />;
      case ESceneObject.Torus:
        return <TorusObject />;
      case ESceneObject.Bunny:
        return <BunnyObject />;
      case ESceneObject.World:
        return <World />;
      // UserMesh Scene
      case ESceneObject.UserMesh:
        return <UserMesh model={model} modelType={modelType} />;
      default:
        return null;
    }
  };

  return (
    <Canvas style={{ background: scene.backgroundColor }}>
      {scene.hasAxisHelper ? <axesHelper args={[20]} /> : null}
      {getActiveObject()}
      <HeadLight intensity={0.5} />
      <Lights />
    </Canvas>
  );
};

export default Scene;
