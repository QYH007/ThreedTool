import * as THREE from 'three';

export function createMip(level: number, numLevels: number, scale: number): HTMLCanvasElement {
  const u = level / numLevels;
  const size = 2 ** (numLevels - level - 1);
  const halfSize = Math.ceil(size / 2);
  const ctx = document.createElement('canvas').getContext('2d');
  if (ctx !== null) {
    ctx.canvas.width = size * scale;
    ctx.canvas.height = size * scale;
    ctx.scale(scale, scale);
    ctx.fillStyle = level & 1 ? '#DDD' : '#000';
    ctx.fillStyle = `hsl(${(180 + u * 360) | 0},100%,20%)`;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = `hsl(${(u * 360) | 0},100%,50%)`;
    ctx.fillRect(0, 0, halfSize, halfSize);
    ctx.fillRect(halfSize, halfSize, halfSize, halfSize);
  }

  // @ts-ignore
  return ctx.canvas;
}

export function createMipTriangles(level: number, numLevels: number, scale: number): HTMLCanvasElement {
  const u = level / numLevels;
  const size = 2 ** (numLevels - level - 1);
  const halfSize = Math.ceil(size / 2);
  const ctx = document.createElement('canvas').getContext('2d');
  if (ctx !== null) {
    ctx.canvas.width = size * scale;
    ctx.canvas.height = size * scale;
    ctx.scale(scale, scale);
    ctx.fillStyle = level & 1 ? '#DDD' : '#000';
    ctx.fillStyle = `hsl(${(180 + u * 360) | 0},100%,20%)`;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = `hsl(${(u * 360) | 0},100%,50%)`;

    // top left
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(halfSize, 0);
    ctx.lineTo(halfSize / 2, halfSize);
    ctx.fill();

    // top right
    ctx.beginPath();
    ctx.moveTo(halfSize, 0);
    ctx.lineTo(size, 0);
    ctx.lineTo(halfSize * 1.5, halfSize);
    ctx.fill();

    // bottom left
    ctx.beginPath();
    ctx.moveTo(0, halfSize);
    ctx.lineTo(halfSize / 2, size);
    ctx.lineTo(halfSize, halfSize);
    ctx.fill();

    // bottom right
    ctx.beginPath();
    ctx.moveTo(halfSize, halfSize);
    ctx.lineTo(halfSize * 1.5, size);
    ctx.lineTo(size, halfSize);
    ctx.fill();
  }

  // @ts-ignore
  return ctx.canvas;
}

export function createTexture(
  triangles: boolean,
  mipMap: boolean,
  wrapS: THREE.Wrapping,
  wrapT: THREE.Wrapping,
  magFiler: THREE.TextureFilter,
  minFilter: THREE.TextureFilter,
): THREE.Texture {
  const mipmap = [];
  const numMips = 8;
  for (let i = 0; i < numMips; ++i) {
    if (triangles) {
      mipmap.push(createMipTriangles(i, numMips, 1));
    } else {
      mipmap.push(createMip(i, numMips, 1));
    }
  }

  const texture = new THREE.CanvasTexture(mipmap[0]);

  texture.wrapS = wrapS;
  texture.wrapT = wrapT;
  texture.magFilter = magFiler;
  texture.minFilter = minFilter;

  if (mipMap) {
    // @ts-ignore
    texture.mipmaps = mipmap;
  }

  return texture;
}

function createColors(numberOfTilesPerSide: number): string[] {
  const base = [
    `rgb(255, 0, 0)`,
    `rgb(0, 255, 0)`,
    `rgb(0, 0, 255)`,
    `rgb(255, 255, 0)`,
    `rgb(255, 0, 255)`,
    `rgb(0, 255, 255)`,
  ];
  const nrOfBase = base.length;
  const colors = [];
  for (let i = 0; i <= numberOfTilesPerSide; i++) {
    const baseColor = base[i % nrOfBase];
    colors.push(baseColor);
  }
  return colors;
}

export function createTiledTexture(tilesPerSide: number, canvasWidth: number): THREE.Texture | null {
  const ctx = document.createElement('canvas').getContext('2d');

  if (ctx !== null) {
    const tileSideLength = canvasWidth / tilesPerSide;

    // create color pool that contains the same amount of colors as rectangles per side
    const colorPool = createColors(tilesPerSide);

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasWidth;

    // fill everything with white first
    ctx.fillStyle = `rgb(255,255,255)`;
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);

    let counter = 0;
    for (let y = 0; y < tilesPerSide; y++) {
      for (let x = 0; x < tilesPerSide; x++) {
        // store positions to draw rectangles from
        const pos = {
          x: x * tileSideLength,
          y: y * tileSideLength,
        };

        // compute lookup index to get color from colorPool
        const index = (counter - y) % tilesPerSide;
        const color = colorPool[index];

        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, tileSideLength, tileSideLength);
        counter++;
      }
    }

    // return the texture
    const texture = new THREE.CanvasTexture(ctx.canvas);
    // The number of samples taken along the axis through the pixel that has the highest density of texels.
    // A higher value gives a less blurry result than a basic mipmap, at the cost of more texture samples being used.
    texture.anisotropy = 8;
    return texture;
  } else {
    return null;
  }
}
