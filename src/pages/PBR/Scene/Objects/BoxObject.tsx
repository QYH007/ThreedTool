import { a, useSpring } from '@react-spring/three';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PBR } from '../../../../stores';
import { useLoader } from '@react-three/fiber';

const BoxObject: React.FC = () => {
  const box = PBR.useStore((state) => state.box);
  const scene1 = PBR.useStore((state: PBR.State) => state.scene);

  const [loading, setLoading] = useState(true);

  // zooming
  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : box.scale,
  });

  const colorMap = useLoader(THREE.TextureLoader, '/PBR/WoodFloor/WoodFlooring_COL.jpg');
  const metalnessMap = useLoader(THREE.TextureLoader, '/PBR/WoodFloor/WoodFlooring_REFL_4K.jpg');
  const normalMap = useLoader(THREE.TextureLoader, '/PBR/WoodFloor/WoodFlooring_NRM.png');
  const roughnessMap = useLoader(THREE.TextureLoader, '/PBR/WoodFloor/WoodFlooring_GLOSS.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, '/PBR/WoodFloor/WoodFlooring_BUMP.jpg');

  useEffect(() => {
    setLoading(false);
  }, []);

  const geometry = (
    <boxGeometry
      attach="geometry"
      args={[box.depth, box.height, box.width, box.depthSegments, box.heightSegments, box.widthSegments]}
    />
  );

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh visible={!box.isFlat && box.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            attach="material"
            map={colorMap}
            metalnessMap={metalnessMap}
            roughnessMap={roughnessMap}
            normalMap={normalMap}
            bumpMap={bumpMap}
            metalness={box.metalness}
            roughness={box.roughness}
            envMapIntensity={scene1.backgroundIntensity}
          ></meshPhysicalMaterial>
          {geometry}
        </mesh>
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default BoxObject;
