import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { DRACOLoader } from 'three-stdlib/loaders/DRACOLoader';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/*
auto-generated by: https://github.com/react-spring/gltfjsx
author: michael031288 (https://sketchfab.com/michael031288)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/3864e31053724de5a5f8cdc1c801e1fd
title: Test Teapot
*/

interface TeapotProps {
  children: React.ReactNode;
}

export const Teapot = ({ children }: TeapotProps): JSX.Element => {
  const gltf = useLoader(GLTFLoader, '/texturing/texture-mapping/teapot.gltf', (loader: THREE.Loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    //@ts-ignore
    loader.setDRACOLoader(dracoLoader);
  });

  // //@ts-ignore
  // console.log(gltf.nodes.mesh_0.geometry)

  return (
    <mesh
      position={[0, -0.5, 0]}
      //@ts-ignore
      geometry={gltf.nodes.mesh_0.geometry}
      scale={[0.05, 0.05, 0.05]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* <meshNormalMaterial attach="material" side={THREE.DoubleSide} /> */}
      {children}
    </mesh>
  );
};