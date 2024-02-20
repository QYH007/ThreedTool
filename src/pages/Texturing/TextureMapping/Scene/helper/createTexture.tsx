import * as THREE from 'three';

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

export function createTexture(inNrOfTiles: number, inSize: number, inScale: number): THREE.Texture | null {
  const ctx = document.createElement('canvas').getContext('2d');

  if (ctx !== null) {
    const numberOfTilesPerSide = inNrOfTiles;
    const scale: number = inScale;
    const size = inSize;
    const canvasWidth = size * scale;
    const tileSideLength = canvasWidth / numberOfTilesPerSide;

    // create color pool that contains the same amount of colors as rectangles per side
    const colorPool = createColors(numberOfTilesPerSide);

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasWidth;

    // fill everything with white first
    ctx.fillStyle = `rgb(255,255,255)`;
    ctx.fillRect(0, 0, canvasWidth, canvasWidth);

    let counter = 0;
    for (let y = 0; y < numberOfTilesPerSide; y++) {
      for (let x = 0; x < numberOfTilesPerSide; x++) {
        // store positions to draw rectangles from
        const pos = {
          x: x * tileSideLength,
          y: y * tileSideLength,
        };

        // compute lookup index to get color from colorPool
        const index = (counter - y) % numberOfTilesPerSide;
        const color = colorPool[index];

        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, tileSideLength, tileSideLength);
        counter++;
      }
    }

    // return the texture
    const texture = new THREE.CanvasTexture(ctx.canvas);

    return texture;
  } else {
    return null;
  }
}
