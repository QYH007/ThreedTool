import React from 'react';
import { createTiledTexture } from '../utils/textureUtils';
import * as THREE from 'three';

export const useTiledTexture = (tilesPerSide: number, canvasWidth: number): THREE.Texture | undefined => {
  // create texture
  const texture = React.useMemo(() => {
    const tex = createTiledTexture(tilesPerSide, canvasWidth);
    if (tex) {
      return tex;
    }
  }, [canvasWidth, tilesPerSide]);

  return texture;
};
