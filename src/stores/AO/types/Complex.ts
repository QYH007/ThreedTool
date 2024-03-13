import { SavedCamera } from '.';

export interface Complex {
  name: string;
  savedCam: SavedCamera;
  scale: number[];
  intensity: number;
  radius: number;
  isDiffuse: boolean;
  isAO: boolean;
  isOBJ: boolean;
}
