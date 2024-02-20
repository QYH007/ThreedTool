import { a } from '@react-spring/three';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { AO } from '../../../../stores';

const ComplexObject: React.FC = () => {
  const complex = AO.useStore((state: AO.State) => state.complex);
  const [loading, setLoading] = useState(true);

  // loading skybox
  const loader = new FBXLoader();

  const { scene, gl, camera } = useThree();

  const Tloader = new TextureLoader();
  const metalMap = Tloader.load('/AO/aircon/exterior_aircon_unit_01_metal_4k.png');
  const diffMap = Tloader.load('/AO/aircon/exterior_aircon_unit_01_diff_4k.png');
  const normalMap = Tloader.load('/AO/aircon/exterior_aircon_unit_01_nor_gl_4k.png');
  const roughMap = Tloader.load('/AO/aircon/exterior_aircon_unit_01_rough_4k.png');

  loader.load('/AO/aircon/exterior_aircon_unit_4k.fbx', (group) => {
    const mat = new THREE.MeshStandardMaterial({
      map: complex.isDiffuse ? diffMap : null,
      metalnessMap: complex.isDiffuse ? metalMap : metalMap,
      roughnessMap: complex.isDiffuse ? roughMap : roughMap,
      normalMap: complex.isDiffuse ? normalMap : normalMap,
    });

    //@ts-ignore
    const geometry = group.children[0].geometry;
    geometry.attributes.uv2 = geometry.attributes.uv;
    geometry.center();

    const mesh = new THREE.Mesh(geometry, mat);
    mesh.scale.multiplyScalar(4);
    mesh.rotateX(-Math.PI / 2);
    mesh.translateZ(-1);
    scene.add(mesh);
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const sphere = <sphereGeometry attach="geometry" args={[0.3, 30, 30]} />;

  const plane = <boxGeometry attach="geometry" args={[5, 5, 0.05, 1, 1, 1]} />;

  return (
    <>
      {!complex.isAO ? (
        <></>
      ) : (
        <EffectComposer>
          <N8AO aoRadius={complex.radius} intensity={complex.intensity} />
        </EffectComposer>
      )}
      <a.group>
        <mesh position={[0.7, -2.2, 0]}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#c8e3cf' : '#eeeeee'} />
          {sphere}
        </mesh>

        <mesh position={[0, 0, -2.5]}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#e6d1cf' : '#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[-2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#d1cfe6' : '#eeeeee'} />
          {plane}
        </mesh>
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default ComplexObject;
