import React from 'react';

import { Appear } from '../../../../components/animations/Appear';
import AxisController from '../../../../components/axisController/AxisController';
import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import PanelBottomRight from '../../../../components/layouts/surfaces/PanelBottomRight';
import PanelTopLeft from '../../../../components/layouts/surfaces/PanelTopLeft';
import PanelTopRight from '../../../../components/layouts/surfaces/PanelTopRight';
import { useTexturingStore } from '../../../../stores/texturing/store';
import TextureSelection from './TextureSelection';

const TextureMappingGUI = (): JSX.Element => {
  const { backgroundColor, setBackgroundColor } = useTexturingStore((store) => store.general);

  return (
    <Appear>
      <PanelTopLeft>
        <ColorSelector
          activeColor={backgroundColor}
          onColorChange={(color): void => setBackgroundColor(color)}
          bgColor={true}
        />
      </PanelTopLeft>
      <PanelTopRight>
        <TextureSelection />
      </PanelTopRight>
      <PanelBottomRight>
        <AxisController />
      </PanelBottomRight>
    </Appear>
  );
};

export default TextureMappingGUI;
