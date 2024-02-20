import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { useUVTexture } from '../../../../../hooks/useUVTexture';
import { Axis } from '../../../../../types/common';
import { UVTextureResolution } from '../../../../../types/texturingUnit';
import { fragmentShader, vertexShader } from '../shaders/sphericalShaders';

interface SphericalMaterialProps {
  axis: Axis;
  refPosition: number[];
  refRadius: number;
  refRotation: number[];
  textureResolution: UVTextureResolution;
}

const SphericalMaterial = ({
  axis,
  refPosition,
  refRadius,
  refRotation,
  textureResolution,
}: SphericalMaterialProps): JSX.Element => {
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

      sphereRadius: { type: 'float', value: 0.0 },
      spherePosition: { type: 'vec3', value: new THREE.Vector3() },
      sphereRotation: { type: 'mat4', value: new THREE.Matrix4() },
    }),
    [texture],
  );

  useFrame(() => {
    objMaterialRef.current.uniforms.xAxis.value = axis === Axis.X;
    objMaterialRef.current.uniforms.yAxis.value = axis === Axis.Y;
    objMaterialRef.current.uniforms.zAxis.value = axis === Axis.Z;

    objMaterialRef.current.uniforms.spherePosition.value = new THREE.Vector3(
      refPosition[0],
      refPosition[1],
      refPosition[2],
    );
    objMaterialRef.current.uniforms.sphereRadius.value = refRadius;

    if (refRotation) {
      objMaterialRef.current.uniforms.sphereRotation.value = new THREE.Matrix4()
        .makeRotationFromEuler(
          // add Math.PI/ 2 to align rotation for shader with the texture
          new THREE.Euler(refRotation[0], refRotation[1] - Math.PI / 2, refRotation[2]),
        )
        .invert();
    }
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

export default SphericalMaterial;
