import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { useUVTexture } from '../../../../../hooks/useUVTexture';
import { Axis } from '../../../../../types/common';
import { UVTextureResolution } from '../../../../../types/texturingUnit';
import { planar } from '../shaders/planarShaders';

interface PlanarMaterialProps {
  axis: Axis;
  bottomLeft: THREE.Vector3;
  topRight: THREE.Vector3;
  textureResolution: UVTextureResolution;
}

const PlanarMaterial = ({ axis, bottomLeft, topRight, textureResolution }: PlanarMaterialProps): JSX.Element => {
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
      bottomLeft: { type: 'vec3', value: new THREE.Vector3() },
      topRight: { type: 'vec3', value: new THREE.Vector3() },
    }),
    [texture],
  );

  useFrame(() => {
    objMaterialRef.current.uniforms.xAxis.value = axis === Axis.X;
    objMaterialRef.current.uniforms.yAxis.value = axis === Axis.Y;
    objMaterialRef.current.uniforms.zAxis.value = axis === Axis.Z;

    objMaterialRef.current.uniforms.bottomLeft.value = new THREE.Vector3(bottomLeft.x, bottomLeft.y, bottomLeft.z);
    objMaterialRef.current.uniforms.topRight.value = new THREE.Vector3(topRight.x, topRight.y, topRight.z);
  });

  return (
    <shaderMaterial
      ref={objMaterialRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={planar.vertexShader}
      fragmentShader={planar.fragmentShader}
    />
  );
};

export default PlanarMaterial;
