import {
  EMultimappingObject,
  EProjection,
  ETexturingUnit,
  FilterTexture,
  ProjectionSetting,
} from '../../types/texturingUnit';
import { Axis } from '../../types/common';

export interface TexturingStore {
  general: {
    name: string;
    backgroundColor: string;
    unit: ETexturingUnit;

    setName: (name: string) => void;
    setUnit: (unit: ETexturingUnit) => void;
    setBackgroundColor: (color: string) => void;
  };

  aliasing: {
    leftStrip: FilterTexture;
    rightStrip: FilterTexture;

    setLeftStrip: (tex: FilterTexture) => void;
    setRightStrip: (tex: FilterTexture) => void;
  };

  textureMapping: {
    active: ProjectionSetting;
    mappings: ProjectionSetting[];

    setActiveProjection: (type: EProjection) => void;
    setActiveProjectionAxis: (axis: Axis) => void;
  };

  multimapping: {
    object: EMultimappingObject;
    albedo: boolean;
    ao: boolean; // ambient occlusion
    normal: boolean;
    displacement: boolean;
    roughness: boolean;

    toggleMap: (mapName: string) => void;
    setMultimapObject: (objectType: EMultimappingObject) => void;
  };
}
