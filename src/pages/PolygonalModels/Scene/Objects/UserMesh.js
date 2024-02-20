/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useSavedCamera } from '../../../../hooks/useSavedCamera';

// 用户上传的loader
export const ModelLoader = ({ loader, data, scale, position }) => {
  console.log('check data:', data);
  // const group = loader.load(data);
  const group = loader.parse(data, '');
  console.log('Uploadedobj:', group);
  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <primitive object={group} />
      </scene>
    </group>
  );
};

export const GLTFModelLoader = ({ data, scale, position }) => {
  console.log('check data:', data);
  const gltf = useLoader(GLTFLoader, data);
  console.log('LoadResult:', gltf);
  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <primitive object={gltf.scene} />
      </scene>
    </group>
  );
};

// 朴素的loader
export const OBJ = ({ url, scale, position }) => {
  const object = useLoader(OBJLoader, url);
  //console.log('data:', object);
  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <primitive object={object} />
      </scene>
    </group>
  );
};

export const FBX = ({ url, scale, position }) => {
  const object = useLoader(FBXLoader, url);
  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <primitive object={object} />
      </scene>
    </group>
  );
};

export const UserObject = ({ url, scale, position }) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);
  });
  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <primitive object={gltf.scene} />
      </scene>
    </group>
  );
};

const UserMesh = ({ model, modelType }) => {
  const world = PolygonalModels.useStore((state) => state.complex.models[PolygonalModels.EComplexModel.BUNNY]);
  const saveCam = PolygonalModels.useStore((state) => state.actions.saveComplexCamera);
  useSavedCamera({ object: world, saveFunc: saveCam });
  const { scene, gl } = useThree();
  scene.remove(scene.getObjectByName('User.pcd'));
  scene.remove(scene.getObjectByName('User.obj'));
  const userpcd = scene.getObjectByName('User.pcd');
  const bunny_pcd = scene.getObjectByName('Zaghetto.pcd');
  if (bunny_pcd) {
    scene.remove(bunny_pcd);
  }

  if (model) {
    if (modelType === 'glb') {
      console.log('进入glb');
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <primitive object={model.scene}></primitive>
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    } else if (modelType === 'pcd') {
      scene.add(model);
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    } else if (modelType === 'gltf') {
      const loader = new GLTFLoader();
      console.log('进入gltf');
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <GLTFModelLoader loader={loader} data={model} scale={[1, 1, 1]} position={[0, 0, 0]} />
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    } else if (modelType === 'fbx') {
      const loader = new FBXLoader();
      console.log('进入fbx');
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <ModelLoader loader={loader} data={model} scale={[1, 1, 1]} position={[0, 0, 0]} />
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    } else if (modelType === 'obj') {
      scene.add(model);
      console.log(model);
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    } else {
      console.log('进入空页面');
      return (
        <Suspense fallback={<LoadingSphere />}>
          <>
            <OrbitControls enablePan={true} />
          </>
        </Suspense>
      );
    }
  } else {
    return (
      <Suspense fallback={<LoadingSphere />}>
        <OrbitControls enablePan={true} />
      </Suspense>
    );
  }
};

export default UserMesh;
