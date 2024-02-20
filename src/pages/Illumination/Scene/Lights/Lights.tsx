import React from 'react';

import { Illumination } from '../../../../stores';
import { DirectionalLight } from './DirectionalLight';
import { PointLight } from './PointLight';
import { SpotLight } from './SpotLight';

export const Lights: React.FC = () => {
  const lights = Illumination.useStore((store: Illumination.Store) => store.state.lights);

  return (
    <>
      {lights['point'].isActive ? <PointLight /> : null}
      {lights['spot'].isActive ? <SpotLight /> : null}
      {lights['directional'].isActive ? <DirectionalLight /> : null}
    </>
  );
};
