import React from 'react';
import * as THREE from 'three';

import { Illumination } from '../../../../stores';
import { CustomGouraudMaterial } from '../Materials/CustomGouraudMaterial';
import { CustomPhongMaterial } from '../Materials/CustomPhongMaterial';

interface Props {
  shadingModel: Illumination.EShadingModel;
  object: Illumination.SceneObject;
}

export const MaterialFromShadingModel: React.FC<Props> = ({ shadingModel, object }) => {
  if (shadingModel === Illumination.EShadingModel.GOURAUD) {
    return (
      <CustomGouraudMaterial
        k_a={object.shadingParameters.gouraud.k_a}
        k_d={object.shadingParameters.gouraud.k_d}
        k_s={object.shadingParameters.gouraud.k_s}
        alpha_s={object.shadingParameters.gouraud.alpha_s}
        color={new THREE.Color(object.color)}
      />
    );
  } else {
    return (
      <CustomPhongMaterial
        k_a={object.shadingParameters.phong.k_a}
        k_d={object.shadingParameters.phong.k_d}
        k_s={object.shadingParameters.phong.k_s}
        alpha_s={object.shadingParameters.phong.alpha_s}
        color={new THREE.Color(object.color)}
        flat={object.shadingParameters.phong.flat}
      />
    );
  }
};
