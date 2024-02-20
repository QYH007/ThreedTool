import React from 'react';

import { ToggleButton } from '../../../components/forms/ToggleButton';
import { PolygonalModels } from '../../../stores';

const AxisToggleButton: React.FC = () => {
  const hasAxisHelper = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.hasAxisHelper);
  const toggleAxisHelper = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions.toggleAxisHelper);

  return <ToggleButton label={'Axis Helper'} checked={hasAxisHelper} onToggle={toggleAxisHelper} />;
};

export default AxisToggleButton;
