import React, { useRef } from 'react';
import * as THREE from 'three';

interface Props {
  position: THREE.Vector3;
  modelColor: string;
  index: number;
  name: string;
  inGroup: boolean;
  toggleGroup: (index: number, name: string, inGroup: boolean) => void;
}

export const GroupObject: React.FC<Props> = ({ position, modelColor, index, toggleGroup, name, inGroup }) => {
  const ref = useRef<any>();

  const handleClick = (): void => {
    toggleGroup(index, name, inGroup);
  };

  return (
    <mesh ref={ref} name={name} position={position} onPointerDown={handleClick}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={inGroup ? 'hotpink' : modelColor} />
    </mesh>
  );
};
