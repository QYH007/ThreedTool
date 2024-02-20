import React from 'react';

import { useTexturingStore } from '../../stores/texturing/store';
import { ETexturingUnit } from '../../types/texturingUnit';
import { AntiAliasingPanels } from './AntiAliasing/GUI/AntiAliasingPanels';
import MultimappingGUI from './MultiMapping/GUI/MultimappingGUI';
import TextureMappingGUI from './TextureMapping/GUI/TextureMappingGUI';

export const GUI: React.FC = () => {
  const unit = useTexturingStore((store) => store.general.unit);
  return (
    <>
      {unit === ETexturingUnit.TEXTURE_MAPPING ? <TextureMappingGUI /> : null}
      {unit === ETexturingUnit.ANTIALIASING ? <AntiAliasingPanels /> : null}
      {unit === ETexturingUnit.MULTI_MAPPING ? <MultimappingGUI /> : null}
    </>
  );
};
