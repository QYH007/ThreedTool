import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { OrbitControls } from '../../../components/3d/OrbitControls';
import { Transformations } from '../../../stores';
import Lights from './Lights';
import Box from './SceneObjects/Box';
import { ObjectGroup } from './SceneObjects/ObjectGroup';
import Sphere from './SceneObjects/Sphere';
import Torus from './SceneObjects/Torus';

const Scene: React.FC = () => {
  const state = Transformations.useStore((state: Transformations.State) => state);
  const activeObject = state.activeObject;
  const showAxisHelper = state.scene.hasAxisHelper;
  const showGrid = state.scene.hasGrid;

  const isOfType = (type: Transformations.ESceneObject): boolean => activeObject.type === type;

  return (
    <Canvas
      style={{ background: state.scene.backgroundColor }}
      camera={{
        position: new THREE.Vector3(5, 5, 5),
      }}
    >
      {isOfType(Transformations.ESceneObject.BOX) && (
        <Box objectData={activeObject} modelColor={state.scene.modelColor} />
      )}

      {isOfType(Transformations.ESceneObject.TORUS) && (
        <Torus objectData={activeObject} modelColor={state.scene.modelColor} />
      )}

      {isOfType(Transformations.ESceneObject.SPHERE) && (
        <Sphere objectData={activeObject} modelColor={state.scene.modelColor} />
      )}

      {isOfType(Transformations.ESceneObject.GROUP) && (
        <ObjectGroup objectData={activeObject} modelColor={state.scene.modelColor} />
      )}

      <Lights />
      <OrbitControls enablePan={true} />
      {showAxisHelper && <axesHelper args={[20]} />}
      {showGrid && <gridHelper args={[10, 10]} position={[0, -0.001, 0]} />}
    </Canvas>
  );
};

export default Scene;
