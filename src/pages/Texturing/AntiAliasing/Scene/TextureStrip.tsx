import React from 'react';
import * as THREE from 'three';

interface Props {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation: [number, number, number];
}

export const TextureStrip: React.FC<Props> = ({ texture, position, rotation }) => {
  texture.repeat = new THREE.Vector2(150, 150);
  return (
    <mesh position={position} rotation={rotation}>
      <meshBasicMaterial attach="material" map={texture} />
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
    </mesh>
  );
};
