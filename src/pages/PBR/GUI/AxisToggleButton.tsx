import React from 'react';

import { ToggleButton } from '../../../components/forms/ToggleButton';
import { PBR } from '../../../stores';

const AxisToggleButton: React.FC = () => {
  const hasAxisHelper = PBR.useStore((state: PBR.State) => state.scene.hasAxisHelper);
  const toggleAxisHelper = PBR.useStore((state: PBR.State) => state.actions.toggleAxisHelper);

  return <ToggleButton label={'Axis Helper'} checked={hasAxisHelper} onToggle={toggleAxisHelper} />;
};

export default AxisToggleButton;
