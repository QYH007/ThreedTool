import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { PolygonalModels as PolyModelsState } from '../../stores';
import GUI from './GUI/GUI';
import Scene from './Scene/Scene';
import { ModelProvider } from './ModelContext';

export const PolygonalModelsPage: React.FC = () => {
  const state = PolyModelsState.useStore();
  return (
    <>
      <ModelProvider>
        <Scene />
        <GUI />
      </ModelProvider>
      {DEBUG_MODE && <GlobalStateDebug state={state} />}
    </>
  );
};
