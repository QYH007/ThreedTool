import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { Transformations as Transformationstate } from '../../stores';
import GUI from './GUI/GUI';
import Scene from './Scene/Scene';

export const TransformationsPage: React.FC = () => {
  const state = Transformationstate.useStore();

  return (
    <>
      <Scene />
      <GUI />
      {DEBUG_MODE && <GlobalStateDebug state={state} />}
    </>
  );
};
