import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { Illumination as Store } from '../../stores';
import { GUI } from './GUI';
import Scene from './Scene/Scene';

export const IlluminationPage: React.FC = () => {
  const state = Store.useStore();

  return (
    <>
      <Scene />
      <GUI />
      {DEBUG_MODE && <GlobalStateDebug state={state} />}
    </>
  );
};
