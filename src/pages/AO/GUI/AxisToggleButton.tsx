import React from 'react';

import { ToggleButton } from '../../../components/forms/ToggleButton';
import { AO } from '../../../stores';

const AxisToggleButton: React.FC = () => {
  const hasAxisHelper = AO.useStore((state: AO.State) => state.scene.hasAxisHelper);
  const toggleAxisHelper = AO.useStore((state: AO.State) => state.actions.toggleAxisHelper);

  return <ToggleButton label={'Axis Helper'} checked={hasAxisHelper} onToggle={toggleAxisHelper} />;
};

export default AxisToggleButton;
