import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { useUVTexture } from '../../../../../hooks/useUVTexture';
import { Axis } from '../../../../../types/common';
import { UVTextureResolution } from '../../../../../types/texturingUnit';
import { fragmentShader, vertexShader } from '../shaders/cylindricalShaders';

interface PlanarMaterialProps {
  axis: Axis;
  refPosition: number[];
  refRadius: number;
  refHeight: number;
  textureResolution: UVTextureResolution;
}

const CylindricalMaterial = ({
  axis,
  refPosition,
  refRadius,
  refHeight,
  textureResolution,
}: PlanarMaterialProps): JSX.Element => {
  // const texture = useUVTexture(textureResolution);
  const objMaterialRef = React.useRef<any>();
  const texture = useLoader(THREE.TextureLoader, '/texturing/texture-mapping/textures/checker1024.png');

  // set the uniforms of the custom material/shader
  const uniforms = React.useMemo(
    () => ({
      myTex: { value: texture },
      xAxis: { value: false, type: 'bool' },
      yAxis: { value: false, type: 'bool' },
      zAxis: { value: false, type: 'bool' },

      cylinderRadius: { type: 'float', value: 0.0 },
      cylinderHeight: { type: 'float', value: 0.0 },
      cylinderPosition: { type: 'vec3', value: new THREE.Vector3() },
    }),
    [texture],
  );

  useFrame(() => {
    objMaterialRef.current.uniforms.xAxis.value = axis === Axis.X;
    objMaterialRef.current.uniforms.yAxis.value = axis === Axis.Y;
    objMaterialRef.current.uniforms.zAxis.value = axis === Axis.Z;

    objMaterialRef.current.uniforms.cylinderPosition.value = new THREE.Vector3(
      refPosition[0],
      refPosition[1],
      refPosition[2],
    );
    objMaterialRef.current.uniforms.cylinderRadius.value = refRadius;
    objMaterialRef.current.uniforms.cylinderHeight.value = refHeight;
  });

  return (
    <shaderMaterial
      ref={objMaterialRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  );
};

export default CylindricalMaterial;
