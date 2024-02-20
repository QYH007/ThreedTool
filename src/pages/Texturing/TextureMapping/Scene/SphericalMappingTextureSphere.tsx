import { a } from '@react-spring/three';
import React from 'react';
import * as THREE from 'three';

import { useUVTexture } from '../../../../hooks/useUVTexture';
import { UVTextureResolution } from '../../../../types/texturingUnit';

interface SphericalMappingTextureSphereProps {
  textureResolution: UVTextureResolution;
  rotation: number[];
  position: number[];
  radius: number;
  segments: number;
}

const SphericalMappingTextureSphere = React.forwardRef((props: SphericalMappingTextureSphereProps, ref: any) => {
  const texture = useUVTexture(props.textureResolution);
  return (
    //@ts-ignore
    <a.mesh ref={ref} rotation={props.rotation} position={props.position}>
      <sphereGeometry attach="geometry" args={[props.radius, props.segments, props.segments]} />
      <meshBasicMaterial side={THREE.BackSide} attach="material" map={texture} />
    </a.mesh>
  );
});
SphericalMappingTextureSphere.displayName = 'SphericalMappingTextureSphere';

export default SphericalMappingTextureSphere;
