/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Box3 } from 'three';
import { useThree } from '@react-three/fiber';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useModelContext } from '../../ModelContext';

const UserMesh = () => {
  const { scene, camera } = useThree();
  scene.remove(scene.getObjectByName('Usermesh'));
  const bunny_pcd = scene.getObjectByName('bunny.pcd');
  const { model, setModel, modelType, setModelType } = useModelContext();

  if (bunny_pcd) {
    scene.remove(bunny_pcd);
  }

  useEffect(() => {
    if (model) {
      const box = new Box3().setFromObject(model);

      const boxSize = new THREE.Vector3();
      box.getSize(boxSize);
      const distance = boxSize.length() / 2 / Math.tan((Math.PI * camera.fov) / 360);

      const center = box.getCenter(new THREE.Vector3());

      camera.position.set(center.x, center.y, center.z + distance * 1.2);
      camera.lookAt(center);
    }
  }, [model]);

  if (model) {
    if (modelType === 'glb') {
      scene.add(model);
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={false} />
          </>
        </Suspense>
      );
    } else if (modelType === 'pcd') {
      scene.add(model);
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={false} />
          </>
        </Suspense>
      );
    } else if (modelType === 'obj') {
      scene.add(model);
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={false} />
          </>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={false} />
          </>
        </Suspense>
      );
    }
  } else {
    return (
      <Suspense fallback={<LoadingSphere />}>
        <OrbitControls enablePan={false} />
      </Suspense>
    );
  }
};

export default UserMesh;
