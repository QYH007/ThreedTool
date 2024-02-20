import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import mediumTexture from '../pages/Texturing/TextureMapping/Scene/textures/checker1024.png';
import highTexture from '../pages/Texturing/TextureMapping/Scene/textures/checker2048.png';
import lowTexture from '../pages/Texturing/TextureMapping/Scene/textures/checker512.png';
import { UVTextureResolution } from '../types/texturingUnit';

const LOW_DETAIL_TEXTURE_PATH = lowTexture;
const MEDIUM_DETAIL_TEXTURE_PATH = mediumTexture;
const HIGH_DETAIL_TEXTURE_PATH = highTexture;

export const useUVTexture = (detailLevel: UVTextureResolution = UVTextureResolution.LOW): THREE.Texture => {
  const tex = useLoader(
    THREE.TextureLoader,
    detailLevel === 'low'
      ? LOW_DETAIL_TEXTURE_PATH
      : detailLevel === 'medium'
      ? MEDIUM_DETAIL_TEXTURE_PATH
      : HIGH_DETAIL_TEXTURE_PATH,
  );

  return tex;
};
