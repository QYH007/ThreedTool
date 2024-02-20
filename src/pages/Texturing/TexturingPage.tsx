import React from 'react';

import { GlobalStateDebug } from '../../components/GlobalStateDebug';
import { DEBUG_MODE } from '../../constants';
import { useTexturingStore } from '../../stores/texturing/store';
import { GUI } from './GUI';
import { Scene } from './Scene';
import { UnitNavigation } from './UnitNavigation';

export const TexturingPage: React.FC = () => {
  const store = useTexturingStore();

  return (
    <>
      <Scene />
      <GUI />
      <UnitNavigation />
      {DEBUG_MODE && <GlobalStateDebug state={store} />}
    </>
  );
};
