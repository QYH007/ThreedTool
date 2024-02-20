import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

import { OrbitControls } from '../../../components/3d/OrbitControls';
import { Illumination } from '../../../stores';
import Lights from './Lights';
import { Box, Ground, Sphere, Torus } from './Objects';

const Scene: React.FC = () => {
  const backgroundColor = Illumination.useStore((store) => store.state.scene.backgroundColor);
  const groups = Illumination.useStore((store: Illumination.Store) => store.state.objects.groups);
  const spheres: Illumination.SceneObject[] = Illumination.useStore(
    (store: Illumination.Store) => store.state.objects.sphere,
  );
  const tori: Illumination.SceneObject[] = Illumination.useStore(
    (store: Illumination.Store) => store.state.objects.torus,
  );
  const boxes: Illumination.SceneObject[] = Illumination.useStore(
    (store: Illumination.Store) => store.state.objects.box,
  );

  const showPlane = Illumination.useStore((store: Illumination.Store) => store.state.scene.showPlane);

  return (
    <Canvas
      onCreated={({ gl }): void => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
      camera={{
        position: new THREE.Vector3(10, 10, 10),
      }}
      style={{ background: backgroundColor }}
    >
      <Lights />

      {groups.sphere &&
        spheres.map((object: Illumination.SceneObject, index: number) => {
          return <Sphere key={index} index={index} sphere={object} />;
        })}

      {groups.torus &&
        tori.map((object: Illumination.SceneObject, index: number) => {
          return <Torus key={index} index={index} torus={object} />;
        })}

      {groups.box &&
        boxes.map((object: Illumination.SceneObject, index: number) => {
          return <Box key={index} index={index} box={object} />;
        })}

      {showPlane && <Ground />}
      <OrbitControls enablePan={true} />
    </Canvas>
  );
};

export default Scene;
