import React from 'react';
import { Canvas } from '@react-three/fiber';

import { useTexturingStore } from '../../stores/texturing/store';
import { ETexturingUnit } from '../../types/texturingUnit';
import { AntiAliasingScene } from './AntiAliasing/Scene/AntiAliasingScene';
import { Lights } from './Lights';
import { Multimapping } from './MultiMapping/Scene/Multimapping';
import { TextureMapping } from './TextureMapping/Scene/TextureMapping';

export const Scene: React.FC = () => {
  const unit = useTexturingStore((store) => store.general.unit);
  const background = useTexturingStore((store) => store.general.backgroundColor);

  return (
    <Canvas style={{ background }}>
      {unit === ETexturingUnit.ANTIALIASING ? <AntiAliasingScene /> : null}
      {unit === ETexturingUnit.TEXTURE_MAPPING ? <TextureMapping /> : null}
      {unit === ETexturingUnit.MULTI_MAPPING ? <Multimapping /> : null}
      <Lights />
    </Canvas>
  );
};
