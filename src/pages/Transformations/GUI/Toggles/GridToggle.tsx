import React from 'react';

import { ToggleButton } from '../../../../components/forms/ToggleButton';
import { Transformations } from '../../../../stores';

const GridToggle: React.FC = () => {
  const hasGrid = Transformations.useStore((state) => state.scene.hasGrid);
  const toggleGrid = Transformations.useStore((state) => state.actions.toggleGrid);

  return <ToggleButton label={'Grid'} checked={hasGrid} onToggle={toggleGrid} />;
};

export default GridToggle;
