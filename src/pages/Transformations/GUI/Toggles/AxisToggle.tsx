import React from 'react';

import { ToggleButton } from '../../../../components/forms/ToggleButton';
import { Transformations } from '../../../../stores';

const AxisToggle: React.FC = () => {
  const hasAxisHelper = Transformations.useStore((state) => state.scene.hasAxisHelper);
  const toggleAxisHelper = Transformations.useStore((state) => state.actions.toggleAxisHelper);

  return <ToggleButton label={'Axis Helper'} checked={hasAxisHelper} onToggle={toggleAxisHelper} />;
};

export default AxisToggle;
