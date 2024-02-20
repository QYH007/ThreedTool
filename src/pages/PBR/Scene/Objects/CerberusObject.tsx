import React, { useCallback, useState } from 'react';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useEffect } from 'react';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { TextureLoader } from 'three';
import { FBXLoader } from 'three-stdlib/loaders/FBXLoader';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { PBR } from '../../../../stores';

const CerberusObject: React.FC = () => {
  const cerberus = PBR.useStore((state: PBR.State) => state.cerberus);
  const [loading, setLoading] = useState(true);

  // zooming
  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : cerberus.scale,
  });

  //model loading
  const fbx = useLoader(FBXLoader, '/PBR/Cerberus/cerberus.fbx');

  //texrue loading
  const colorMap = useLoader(TextureLoader, '/PBR/Cerberus/Textures/Cerberus_A.tga');
  colorMap.encoding = THREE.sRGBEncoding;
  const metalMap = useLoader(TextureLoader, '/PBR/Cerberus/Textures/cerberus_M.png');
  const norMap = useLoader(TextureLoader, '/PBR/Cerberus/Textures/cerberus_N.png');
  const roughMap = useLoader(TextureLoader, '/PBR/Cerberus/Textures/cerberus_R.png');

  //update

  // skybox
  const { scene, gl } = useThree();
  gl.physicallyCorrectLights = true;
  gl.toneMappingExposure = 0.8;

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });

  const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

  cubeCamera.position.set(0, 100, 0);

  scene.add(cubeCamera);

  useEffect(() => {
    setLoading(false);
  }, []);

  useFrame(() => cubeCamera.update(gl, scene));

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh
          visible={cerberus.isVisible}
          //@ts-ignore
          geometry={fbx.children[0].geometry}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-1, 0, -1]}
        >
          <meshPhysicalMaterial
            attach="material"
            map={cerberus.colorMap ? colorMap : null}
            metalnessMap={cerberus.metalnessMap ? metalMap : null}
            roughnessMap={cerberus.roughnessMap ? roughMap : null}
            normalMap={cerberus.normalMap ? norMap : null}
            normalScale={new THREE.Vector2(0.5, 0.5)}
            metalness={cerberus.metalness}
            roughness={cerberus.roughness}
            envMap={scene.environment}
            envMapIntensity={0.8}
          />
        </mesh>
        <OrbitControls enablePan={true} />
      </a.group>
    </>
  );
};

export default CerberusObject;