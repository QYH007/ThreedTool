import React, { Suspense, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useAxisControllerStore } from '../../../../components/axisController/AxisController';
import { Axis } from '../../../../types/common';
import { UVTextureResolution } from '../../../../types/texturingUnit';
import SphericalMaterial from './materials/SphericalMaterial';
import { Teapot } from './objects/Teapot';
import SphericalMappingTextureSphere from './SphericalMappingTextureSphere';

const XYProjection = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

const YZProjection = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

const XZProjection = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

interface Props {
  axis: Axis;
}

const SphericalMapping = ({ axis }: Props): JSX.Element => {
  const { position, setPosition } = useAxisControllerStore();

  const [texRes] = useState(UVTextureResolution.MEDIUM);

  const [initialRotation, setInitialRotation] = useState(XYProjection.rotation);
  const [radius] = useState(3);
  const [segments] = useState(64);

  const textureRef = React.useRef<THREE.Mesh>();
  const rotation = React.useRef<number[]>([0, 0, 0]);

  useFrame(() => {
    if (textureRef.current) {
      textureRef.current.rotation.x += 0.001;
      textureRef.current.rotation.y += 0.001;
      rotation.current[0] = textureRef.current.rotation.x;
      rotation.current[1] = textureRef.current.rotation.y;
      rotation.current[2] = textureRef.current.rotation.z;
    }
  });

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
        <SphericalMappingTextureSphere
          textureResolution={texRes}
          ref={textureRef}
          position={position}
          rotation={initialRotation}
          segments={segments}
          radius={radius}
        />
        <Teapot>
          <SphericalMaterial
            axis={axis}
            textureResolution={texRes}
            refPosition={position}
            refRadius={radius}
            refRotation={rotation.current}
          />
        </Teapot>
      </Suspense>

      <OrbitControls enablePan />
      <axesHelper args={[20]} />
    </>
  );
};

export default SphericalMapping;
