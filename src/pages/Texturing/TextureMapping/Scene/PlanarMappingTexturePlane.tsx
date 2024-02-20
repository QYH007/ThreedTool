import { a } from '@react-spring/three';
import React from 'react';
import * as THREE from 'three';

import { useUVTexture } from '../../../../hooks/useUVTexture';
import { UVTextureResolution } from '../../../../types/texturingUnit';
import { useLoader } from '@react-three/fiber';

interface PlanarMappingTexturePlaneProps {
  textureResolution: UVTextureResolution;
  rotation: number[];
  position: number[];
}

const PlanarMappingTexturePlane = React.forwardRef((props: PlanarMappingTexturePlaneProps, ref: any) => {
  const texture = useUVTexture(props.textureResolution);
  //const texture = useLoader(THREE.TextureLoader,'/polygonalModels/cottage/85-cottage_obj/cottage_diffuse.png' )

  return (
    //@ts-ignore
    <a.mesh ref={ref} rotation={props.rotation} position={props.position}>
      <planeGeometry attach="geometry" args={[3, 3]} />
      <meshBasicMaterial side={THREE.DoubleSide} attach="material" map={texture} />
    </a.mesh>
  );
});
PlanarMappingTexturePlane.displayName = 'PlanarMappingTexturePlane';

export default PlanarMappingTexturePlane;
