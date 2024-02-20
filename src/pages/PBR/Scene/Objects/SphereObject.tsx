import { a, useSpring } from '@react-spring/three';
import React, { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PBR } from '../../../../stores';
import { RGBELoader } from 'three-stdlib';

const SphereObject: React.FC = () => {
  const sphere = PBR.useStore((state: PBR.State) => state.sphere);
  const [loading, setLoading] = useState(true);

  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : sphere.scale,
  });

  // loading textures
  // RUSTY
  const colorMap_rust = useLoader(TextureLoader, '/PBR/rust_metal/MetalRustRepolished001_COL_4K_METALNESS.jpg');
  colorMap_rust.encoding = THREE.sRGBEncoding;

  const metalnessMap_rust = useLoader(
    TextureLoader,
    '/PBR/rust_metal/MetalRustRepolished001_METALNESS_4K_METALNESS.jpg',
  );

  const normalMap_rust = useLoader(TextureLoader, '/PBR/rust_metal/MetalRustRepolished001_NRM_4K_METALNESS.jpg');
  const roughnessMap_rust = useLoader(
    TextureLoader,
    '/PBR/rust_metal/MetalRustRepolished001_ROUGHNESS_4K_METALNESS.jpg',
  );
  const displaceMap_rust = useLoader(TextureLoader, '/PBR/rust_metal/MetalRustRepolished001_DISP_4K_METALNESS.jpg');

  // GOLD
  const colorMap_stainless = useLoader(TextureLoader, '/PBR/gold/Scratched_gold_01_1K_Base_Color.png');
  colorMap_stainless.encoding = THREE.sRGBEncoding;
  const normalMap_stainless = useLoader(TextureLoader, '/PBR/gold/Scratched_gold_01_1K_Normal.png');

  const roughnessMap_stainless = useLoader(TextureLoader, '/PBR/gold/Scratched_gold_01_1K_Roughness.png');

  const aoMap_stainless = useLoader(TextureLoader, '/PBR/gold/Scratched_gold_01_1K_AO.png');

  const colorMap = sphere.stainless ? colorMap_stainless : colorMap_rust;
  const metalnessMap = sphere.stainless ? null : metalnessMap_rust;
  const normalMap = sphere.stainless ? normalMap_stainless : normalMap_rust;
  const roughnessMap = sphere.stainless ? roughnessMap_stainless : roughnessMap_rust;
  const displaceMap = sphere.stainless ? null : displaceMap_rust;
  const aoMap = sphere.stainless ? aoMap_stainless : null;

  // loading skybox
  const { scene, gl } = useThree();
  gl.outputEncoding = THREE.sRGBEncoding;
  gl.physicallyCorrectLights = true;
  gl.toneMappingExposure = 0.8;
  new RGBELoader().load('/PBR/env/poly_haven_studio_1k.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const geometry = (
    <sphereGeometry attach="geometry" args={[sphere.radius, sphere.widthSegments, sphere.heightSegments]} />
  );

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh visible={sphere.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            attach="material"
            map={sphere.havemap ? colorMap : null}
            metalnessMap={sphere.havemap ? metalnessMap : null}
            roughnessMap={sphere.havemap ? roughnessMap : null}
            normalMap={sphere.havemap ? normalMap : null}
            normalScale={new THREE.Vector2(0, 0.5)}
            displacementMap={sphere.havemap ? displaceMap : null}
            aoMap={sphere.havemap ? aoMap : null}
            metalness={sphere.metalness}
            roughness={sphere.roughness}
            envMapIntensity={sphere.envMapIntensity}
            color={sphere.havemap ? '#eeeeee' : '#cccccc'}
          />
          {geometry}
        </mesh>
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default SphereObject;
