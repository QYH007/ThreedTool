import { a, useSpring } from '@react-spring/three';
import React, { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PBR } from '../../../../stores';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib';

const TorusObject: React.FC = () => {
  const torus = PBR.useStore((state: PBR.State) => state.torus);

  const [loading, setLoading] = useState(true);

  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : torus.scale,
  });

  // loading texture
  const normalMap = useLoader(THREE.TextureLoader, '/PBR/plastic/PlasticDamaged001_NRM_6K.jpg');
  const roughnessMap = useLoader(THREE.TextureLoader, '/PBR/plastic/PlasticDamaged001_GLOSS_6K.jpg');

  useEffect(() => {
    setLoading(false);
  }, []);

  // geometry & matiral
  const geometry = (
    <torusGeometry
      attach="geometry"
      args={[torus.radius, torus.tubeWidth, torus.radialSegments, torus.tubularSegments]}
    />
  );

  const transparentTpye = {
    metalness: torus.metalness,
    roughness: torus.roughness,
    opacity: torus.opacity,
    reflectivity: torus.reflectivity,
  };

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh visible={torus.isVisible} position={[0, 0, 0]}>
          {geometry}
          <meshPhysicalMaterial
            {...transparentTpye}
            attach="material"
            roughnessMap={roughnessMap}
            transparent={torus.isTransparent}
            transmission={torus.transmission}
          />
        </mesh>
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default TorusObject;
