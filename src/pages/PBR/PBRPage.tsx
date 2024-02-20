import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { PBR } from '../../stores';
import GUI from './GUI/GUI';
import Scene from './Scene/Scene';

export const PBRPage: React.FC = () => {
  const state = PBR.useStore();

  return (
    <>
      <Scene />
      <GUI />
      {DEBUG_MODE && <GlobalStateDebug state={state} />}
    </>
  );
};
