import { a } from '@react-spring/three';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { EffectComposer, N8AO } from '@react-three/postprocessing';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { AO } from '../../../../stores';
import { useModelContext } from '../../ModelContext';

const ComplexObject: React.FC = () => {
  const complex = AO.useStore((state: AO.State) => state.complex);
  const [loading, setLoading] = useState(true);
  const { model, setModel, modelType, setModelType } = useModelContext();

  const { scene } = useThree();

  const objectToRemove = scene.getObjectByName('User.obj');
  if (objectToRemove) {
    scene.remove(objectToRemove);
  }

  // const Tloader = new TextureLoader();
  // const wallNormalMap = Tloader.load('/PBR/Cerberus/Textures/cerberus_N.png');
  // const wallRoughnessMap = Tloader.load('/texturing/multimapping/brick_roughness.png');
  // const wallDiffuseMap = Tloader.load('/texturing/multimapping/brick_albedo.png');
  // const wallDistMap = Tloader.load('/texturing/multimapping/brick_height.png');

  useEffect(() => {
    setLoading(false);
  }, []);

  const plane = <boxGeometry attach="geometry" args={[5, 5, 0.05, 1, 1, 1]} />;
  const column1 = <boxGeometry attach="geometry" args={[0.75, 2, 0.75, 1, 1, 1]} />;
  const column3 = <boxGeometry attach="geometry" args={[1.65, 2, 1.65, 1, 1, 1]} />;

  if (model) {
    scene.add(model);
  }

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
        <mesh position={[0, 0, -2.525]} name={'back'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>

        <mesh position={[0, 2.475, 0]} name={'up'} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[0, -2.475, 0]} name={'bottom'} rotation={[Math.PI / 2, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {plane}
        </mesh>

        <mesh position={[2.525, 0, 0]} name={'right'} rotation={[0, Math.PI / 2, 0]}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#edb0ab' : '#eeeeee'} />
          {plane}
        </mesh>
        <mesh position={[-2.525, 0, 0]} name={'left'} rotation={[0, Math.PI / 2, 0]}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#a39ede' : '#eeeeee'} />
          {plane}
        </mesh>

        <mesh position={[-1.5, -1.49, -1]} visible={!complex.isOBJ} name={'C1'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-0.6, -1.49, -1]} visible={!complex.isOBJ} name={'C2'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-1.5, -1.49, -0.1]} visible={!complex.isOBJ} name={'C3'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-0.6, -1.49, -0.1]} visible={!complex.isOBJ} name={'C4'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>

        <mesh position={[-1.5, -1.49, 0.8]} visible={!complex.isOBJ} name={'C5'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-0.6, -1.49, 0.8]} visible={!complex.isOBJ} name={'C6'}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#6fa8dc' : '#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-1.5, -1.49, 1.7]} visible={!complex.isOBJ} name={'C7'}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#6fa8dc' : '#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[-0.6, -1.49, 1.7]} visible={!complex.isOBJ} name={'C8'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>

        <mesh position={[0.3, -1.49, 0.8]} visible={!complex.isOBJ} name={'C9'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[1.2, -1.49, 0.8]} visible={!complex.isOBJ} name={'C10'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[0.3, -1.49, 1.7]} visible={!complex.isOBJ} name={'C11'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>
        <mesh position={[1.2, -1.49, 1.7]} visible={!complex.isOBJ} name={'C12'}>
          <meshPhysicalMaterial attach="material" color={'#eeeeee'} />
          {column1}
        </mesh>

        <mesh position={[0.75, -1.49, -0.55]} visible={!complex.isOBJ} name={'big column'}>
          <meshPhysicalMaterial attach="material" color={complex.isDiffuse ? '#6fa8dc' : '#eeeeee'} />
          {column3}
        </mesh>
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default ComplexObject;
