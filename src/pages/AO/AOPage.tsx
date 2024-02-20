import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { AO } from '../../stores';
import GUI from './GUI/GUI';
import Scene from './Scene/Scene';

export const AOPage: React.FC = () => {
  const state = AO.useStore();

  return (
    <>
      <Scene />
      <GUI />
      {DEBUG_MODE && <GlobalStateDebug state={state} />}
    </>
  );
};
