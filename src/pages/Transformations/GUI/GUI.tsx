import React from 'react';
import styled from 'styled-components';

import PanelTopLeft from '../../../components/layouts/surfaces/PanelTopLeft';
import PanelTopRight from '../../../components/layouts/surfaces/PanelTopRight';
import { ColorSelector } from '../../../components/colorSelector/ColorSelector';
import { Transformations } from '../../../stores';
import ObjectPanel from './ObjectPanel/ObjectPanel';
import TransformationCreator from './TransformationCreator/TransformationCreator';

const Left = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.5em;
  padding: 1em;
  zindex: 1;
  width: 400px;
`;

const GUI: React.FC = () => {
  const backgroundColor = Transformations.useStore((state: Transformations.State) => state.scene.backgroundColor);
  const actions = Transformations.useStore((state: Transformations.State) => state.actions);

  return (
    <>
      <Left>
        <TransformationCreator />
      </Left>

      <PanelTopLeft>
        <ColorSelector
          activeColor={backgroundColor}
          onColorChange={(color): void => actions.setBackgroundColor(color)}
          bgColor={true}
        />
      </PanelTopLeft>

      <PanelTopRight>
        <ObjectPanel />
      </PanelTopRight>
    </>
  );
};

export default GUI;
