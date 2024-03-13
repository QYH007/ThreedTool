import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { PBR } from '../../../stores';
import { RGBELoader } from 'three-stdlib';

const Env: React.FC = () => {
  const scene1 = PBR.useStore((state: PBR.State) => state.scene);

  // loading skybox
  const { scene, gl } = useThree();
  gl.outputEncoding = THREE.sRGBEncoding;
  gl.physicallyCorrectLights = true;

  useEffect(() => {
    switch (scene1.background) {
      case 1:
        new RGBELoader().load('/PBR/env/poly_haven_studio_2k.hdr', function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
          scene.backgroundIntensity = scene1.backgroundIntensity;
        });
        break;
      case 2:
        new RGBELoader().load('/PBR/env/cobblestone_street_night_2k.hdr', function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
          scene.backgroundIntensity = scene1.backgroundIntensity;
        });
        break;
      case 3:
        new RGBELoader().load('/PBR/env/chinese_garden_2k.hdr', function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
          scene.backgroundIntensity = scene1.backgroundIntensity;
        });
        break;
      default:
        new RGBELoader().load('/PBR/env/poly_haven_studio_1k.hdr', function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = texture;
          scene.environment = texture;
          scene.backgroundIntensity = scene1.backgroundIntensity;
        });
    }
  }, [scene1.background, scene1.backgroundIntensity]);

  return <></>;
};

export default Env;
