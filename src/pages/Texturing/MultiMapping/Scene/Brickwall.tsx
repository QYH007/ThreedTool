import React, { Suspense, useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { Float32BufferAttribute, TextureLoader } from 'three';

interface Props {
  albedo: boolean;
  normal: boolean;
  height: boolean;
  ao: boolean;
  roughness: boolean;
}

const BrickwallObject = ({ albedo, normal, height, ao, roughness }: Props): JSX.Element => {
  const ref = useRef<any>();

  //@ts-ignore
  const [albedoMap, normalMap, heightMap, aoMap, roughnessMap] = useLoader(TextureLoader, [
    '/texturing/multimapping/brick_albedo.png',
    '/texturing/multimapping/brick_normal.png',
    '/texturing/multimapping/brick_height.png',
    '/texturing/multimapping/brick_mask.png',
    '/texturing/multimapping/brick_roughness.png',
  ]);

  useEffect(() => {
    const uvs = ref.current.geometry.attributes.uv.array;
    ref.current.geometry.setAttribute('uv2', new Float32BufferAttribute(uvs, 2));
  }, []);

  useEffect(() => {
    ref.current.material.needsUpdate = true;
  }, [albedo, normal, height, ao, roughness]);

  return (
    <mesh ref={ref}>
      <meshStandardMaterial
        attach="material"
        map={albedo ? albedoMap : null}
        aoMap={ao ? aoMap : null}
        aoMapIntensity={0.5}
        normalMap={normal ? normalMap : null}
        displacementMap={height ? heightMap : null}
        roughnessMap={roughness ? roughnessMap : null}
        displacementBias={-0.4}
      />
      <planeBufferGeometry attach="geometry" args={[10, 10, 150, 150]} />
    </mesh>
  );
};

const Brickwall = ({ albedo, normal, height, ao, roughness }: Props): JSX.Element => {
  return (
    <Suspense fallback={null}>
      <BrickwallObject albedo={albedo} normal={normal} height={height} ao={ao} roughness={roughness} />
    </Suspense>
  );
};

export default Brickwall;
