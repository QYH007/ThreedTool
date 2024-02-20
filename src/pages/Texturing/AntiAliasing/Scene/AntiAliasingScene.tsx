import React, { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useTexturingStore } from '../../../../stores/texturing/store';
import { createTexture } from '../../../../utils/textureUtils';
import { TextureStrip } from './TextureStrip';

export const AntiAliasingScene = (): JSX.Element => {
  const { camera } = useThree();
  const leftStrip = useTexturingStore((store) => store.aliasing.leftStrip);
  const rightStrip = useTexturingStore((store) => store.aliasing.rightStrip);

  useEffect(() => {
    camera.position.set(0, 20, 80);
  }, [camera.position]);

  const left = useMemo(
    () =>
      createTexture(
        true,
        leftStrip.createMipMap,
        leftStrip.wrapS,
        leftStrip.wrapT,
        leftStrip.magFiler,
        leftStrip.minFiler,
      ),
    [leftStrip.createMipMap, leftStrip.magFiler, leftStrip.minFiler, leftStrip.wrapS, leftStrip.wrapT],
  );

  const cubeTexLeft = useMemo(
    () =>
      createTexture(
        true,
        leftStrip.createMipMap,
        leftStrip.wrapS,
        leftStrip.wrapT,
        leftStrip.magFiler,
        leftStrip.minFiler,
      ),
    [leftStrip.createMipMap, leftStrip.magFiler, leftStrip.minFiler, leftStrip.wrapS, leftStrip.wrapT],
  );

  const right = useMemo(
    () =>
      createTexture(
        false,
        rightStrip.createMipMap,
        rightStrip.wrapS,
        rightStrip.wrapT,
        rightStrip.magFiler,
        rightStrip.minFiler,
      ),
    [rightStrip.createMipMap, rightStrip.magFiler, rightStrip.minFiler, rightStrip.wrapS, rightStrip.wrapT],
  );

  const cubeTexRight = useMemo(() => {
    const tex = createTexture(
      false,
      rightStrip.createMipMap,
      rightStrip.wrapS,
      rightStrip.wrapT,
      rightStrip.magFiler,
      rightStrip.minFiler,
    );
    return tex;
  }, [rightStrip.createMipMap, rightStrip.magFiler, rightStrip.minFiler, rightStrip.wrapS, rightStrip.wrapT]);

  return (
    <>
      <mesh position={[-15.5, 5, -50]}>
        <meshBasicMaterial attach="material" map={cubeTexLeft} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>

      <mesh position={[-15.5, 5, 0]}>
        <meshBasicMaterial attach="material" map={cubeTexLeft} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>

      <mesh position={[-15.5, 5, 50]}>
        <meshBasicMaterial attach="material" map={cubeTexLeft} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>
      <mesh position={[15.5, 5, -50]}>
        <meshBasicMaterial attach="material" map={cubeTexRight} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>

      <mesh position={[15.5, 5, 0]}>
        <meshBasicMaterial attach="material" map={cubeTexRight} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>

      <mesh position={[15.5, 5, 50]}>
        <meshBasicMaterial attach="material" map={cubeTexRight} />
        <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      </mesh>
      <TextureStrip position={[-500, -1.5, 0]} texture={left} rotation={[-Math.PI / 2, 0, 0]} />
      <TextureStrip position={[500, -1.5, 0]} texture={right} rotation={[-Math.PI / 2, 0, 0]} />

      <OrbitControls enablePan maxPolarAngle={Math.PI / 2} />
    </>
  );
};
