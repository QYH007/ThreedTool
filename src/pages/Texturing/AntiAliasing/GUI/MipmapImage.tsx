import React, { useEffect } from 'react';

import { createMip, createMipTriangles } from '../../../../utils/textureUtils';

interface Props {
  triangles: boolean;
}

export const MipmapImage = ({ triangles }: Props): JSX.Element => {
  function createMipMaps(triangles: boolean): void {
    const numMips = 8;
    const _mipmap: HTMLCanvasElement[] = [];
    for (let i = 0; i < numMips; ++i) {
      if (triangles) {
        _mipmap.push(createMipTriangles(i, numMips, 1));
      } else {
        _mipmap.push(createMip(i, numMips, 1));
      }
    }
    _mipmap.forEach((map) => {
      const parent = document.getElementsByClassName('mips')[0];
      const height = map.height * 2;
      map.style.height = height.toString() + 'px';
      map.style.width = 'auto';
      parent.appendChild(map);
    });
  }

  useEffect(() => {
    createMipMaps(triangles);
  }, [triangles]);

  // @ts-ignore
  const image = <div className="mips"></div>;

  return <div>{image}</div>;
};
