import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

import { useTexturingStore } from '../../../../stores/texturing/store';
import { EProjection } from '../../../../types/texturingUnit';
import CylindricalMapping from './CylindricalMapping';
import PlanarMapping from './PlanarMapping';
import SphericalMapping from './SphericalMapping';

export const TextureMapping = (): JSX.Element => {
  const { camera } = useThree();

  const settings = useTexturingStore((store) => store.textureMapping.active);

  // set initial camera position on scene load
  useEffect(() => {
    camera.position.set(4, 4, 4);
  }, [camera.position]);

  return (
    <>
      {settings.type === EProjection.PLANAR && <PlanarMapping axis={settings.axis} />}
      {settings.type === EProjection.SPHERICAL && <SphericalMapping axis={settings.axis} />}
      {settings.type === EProjection.CYLINDRICAL && <CylindricalMapping axis={settings.axis} />}
    </>
  );
};
