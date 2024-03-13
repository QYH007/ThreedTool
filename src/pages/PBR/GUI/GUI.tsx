import React from 'react';

import PanelBottomLeft from '../../../components/layouts/surfaces/PanelBottomLeft';
import PanelBottomRight from '../../../components/layouts/surfaces/PanelBottomRight';
import PanelTopLeft from '../../../components/layouts/surfaces/PanelTopLeft';
import PanelTopRight from '../../../components/layouts/surfaces/PanelTopRight';
import { ColorSelector } from '../../../components/colorSelector/ColorSelector';
import { PBR, PolygonalModels } from '../../../stores';
import AxisToggleButton from './AxisToggleButton';
import ModelPicker from './ModelPicker/ModelPicker';
import ObjectGUIController from './ObjectGUI/ObjectGUIController';

const GUI: React.FC = () => {
  return (
    <>
      <PanelTopRight>
        <ObjectGUIController />
      </PanelTopRight>
      <PanelBottomLeft>
        <ModelPicker />
      </PanelBottomLeft>
      <PanelBottomRight>
        <AxisToggleButton />
      </PanelBottomRight>
    </>
  );
};

export default GUI;
