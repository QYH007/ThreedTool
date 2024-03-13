import { ESceneObject, Scene, Complex } from '../types';
import { SavedCamera } from './Scene';

export interface State {
  scene: Scene;
  complex: Complex;
  actions: {
    // Complex object
    setComplexRadius: (radius: number) => void;
    setComplexIntensity: (radius: number) => void;
    saveComplexCamera: (SavedCamera: SavedCamera) => void;
    toggleComplexAO: () => void;
    toggleComplexDiffuse: () => void;
    loadedOBJ: () => void;

    // SCENE
    setActiveSceneObject: (obj: ESceneObject) => void;
    toggleAxisHelper: () => void;
    reset: (obj: ESceneObject) => void;
    setBackgroundColor: (color: string) => void;
  };
}
