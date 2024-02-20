import { a } from '@react-spring/three';
import React from 'react';
import * as THREE from 'three';

import { useUVTexture } from '../../../../hooks/useUVTexture';
import { UVTextureResolution } from '../../../../types/texturingUnit';

interface CylindricalMappingTextureCylinderProps {
  textureResolution: UVTextureResolution;
  rotation: number[];
  position: number[];
  radius: number;
  height: number;
}

const CylindricalMappingTextureCylinder = React.forwardRef(
  (props: CylindricalMappingTextureCylinderProps, ref: any) => {
    const texture = useUVTexture(props.textureResolution);
    return (
      //@ts-ignore
      <a.mesh ref={ref} rotation={props.rotation} position={props.position}>
        <cylinderGeometry attach="geometry" args={[props.radius, props.radius, props.height, 64, 128, true]} />
        <meshBasicMaterial side={THREE.DoubleSide} attach="material" map={texture} />
      </a.mesh>
    );
  },
);
CylindricalMappingTextureCylinder.displayName = 'CylindricalMappingTextureCylinder';

export default CylindricalMappingTextureCylinder;
