import React, { Suspense, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useAxisControllerStore } from '../../../../components/axisController/AxisController';
import { Axis } from '../../../../types/common';
import { UVTextureResolution } from '../../../../types/texturingUnit';
import PlanarMaterial from './materials/PlanarMaterial';
import { Teapot } from './objects/Teapot';
import PlanarMappingTexturePlane from './PlanarMappingTexturePlane';

const XYProjection = {
  position: [0, 0, 3],
  rotation: [0, 0, 0],
};

const YZProjection = {
  position: [3, 0, 0],
  rotation: [0, Math.PI / 2, 0],
};

const XZProjection = {
  position: [0, 3, 0],
  rotation: [-Math.PI / 2, 0, 0],
};

interface Props {
  axis: Axis;
}

const PlanarMapping = ({ axis }: Props): JSX.Element => {
  const { position, setPosition } = useAxisControllerStore();

  const [texRes] = useState(UVTextureResolution.MEDIUM);

  const [bottomLeftVec3, setBottomLeftVec3] = useState(new THREE.Vector3());
  const [topRightVec3, setTopRightVec3] = useState(new THREE.Vector3());
  const [initialRotation, setInitialRotation] = useState(XYProjection.rotation);

  const texturePlaneRef = React.useRef<any>();

  const updateTexture = (): void => {
    if (texturePlaneRef.current) {
      const matrixWorld = texturePlaneRef.current.matrixWorld;
      const geometry = texturePlaneRef.current.geometry;

      // console.log("current", geometry);

      if (geometry instanceof THREE.BufferGeometry) {
        const positions = geometry.attributes.position;
        //@ts-ignore
        const vec1 = new THREE.Vector3().fromBufferAttribute(positions, 2);
        //@ts-ignore
        const vec2 = new THREE.Vector3().fromBufferAttribute(positions, 1);
        setBottomLeftVec3(vec1.applyMatrix4(matrixWorld));
        setTopRightVec3(vec2.applyMatrix4(matrixWorld));
      }
    }
  };

  useFrame(() => {
    updateTexture();
  });

  useEffect(() => {
    updateTexture();
  }, []);

  useEffect(() => {
    if (axis === Axis.X) {
      setPosition(XYProjection.position);
      setInitialRotation(XYProjection.rotation);
    }

    if (axis === Axis.Y) {
      setPosition(YZProjection.position);
      setInitialRotation(YZProjection.rotation);
    }

    if (axis === Axis.Z) {
      setPosition(XZProjection.position);
      setInitialRotation(XZProjection.rotation);
    }
  }, [axis, setPosition]);

  return (
    <>
      <Suspense fallback={<LoadingSphere />}>
        <PlanarMappingTexturePlane
          position={position}
          rotation={initialRotation}
          ref={texturePlaneRef}
          textureResolution={texRes}
        />
        <Teapot>
          <PlanarMaterial axis={axis} bottomLeft={bottomLeftVec3} topRight={topRightVec3} textureResolution={texRes} />
        </Teapot>
        <OrbitControls enablePan />
        <axesHelper args={[20]} />
      </Suspense>
    </>
  );
};

export default PlanarMapping;
