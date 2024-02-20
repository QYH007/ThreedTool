import React from 'react';

import PanelBottomRight from '../../../components/layouts/surfaces/PanelBottomRight';
import PanelTopRight from '../../../components/layouts/surfaces/PanelTopRight';
import { ObjectPanel } from './ObjectPanel';
import { ObjectToggle } from './ObjectToggle/ObjectToggle';
import LightSettings from './LightSettings/LightSettings';
import PanelTopLeft from '../../../components/layouts/surfaces/PanelTopLeft';

export const GUI: React.FC = () => {
  return (
    <>
      <PanelTopLeft>
        <LightSettings />
      </PanelTopLeft>

      <PanelTopRight>
        <ObjectPanel />
      </PanelTopRight>

      <PanelBottomRight>
        <ObjectToggle />
      </PanelBottomRight>
    </>
  );
};
