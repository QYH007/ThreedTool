import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useTexturingStore } from '../../../../stores/texturing/store';
import { EMultimappingObject } from '../../../../types/texturingUnit';
import Brickwall from './Brickwall';
import { Lights } from './Lights';
import Rustwall from './Rustwall';

export const Multimapping: React.FC = () => {
  const state = useTexturingStore((store) => store.multimapping);

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 8);
  }, [camera, camera.position]);

  return (
    <>
      {state.object === EMultimappingObject.BRICK && (
        <Brickwall
          albedo={state.albedo}
          normal={state.normal}
          height={state.displacement}
          ao={state.ao}
          roughness={state.roughness}
        />
      )}
      {state.object === EMultimappingObject.RUST && (
        <Rustwall
          albedo={state.albedo}
          normal={state.normal}
          height={state.displacement}
          ao={state.ao}
          roughness={state.roughness}
        />
      )}
      <Lights />
      <OrbitControls enablePan />
    </>
  );
};
