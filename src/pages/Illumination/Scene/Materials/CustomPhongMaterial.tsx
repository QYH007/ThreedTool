/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { phong } from '../Shaders/phong';

type ExtendedShaderMaterialProps = {
  flatShading?: boolean; // Add the flatShading prop
};

interface Props extends ExtendedShaderMaterialProps {
  k_a: number;
  k_d: number;
  k_s: number;
  alpha_s: number;
  color: THREE.Color;
  flat: boolean;
}

export const CustomPhongMaterial: React.FC<Props> = ({ k_a, k_d, k_s, alpha_s, color, flat }) => {
  const uniforms = useMemo(
    () => THREE.UniformsUtils.merge([THREE.UniformsLib.lights, THREE.UniformsLib.common, phong.uniforms]),
    [],
  );

  const ref = useRef<any>();

  useEffect(() => {
    ref.current.needsUpdate = true;
  }, [flat]);

  useFrame(() => {
    // set uniforms each frame
    ref.current.uniforms.objectColor.value = color;

    // render equation uniforms
    ref.current.uniforms.k_a.value = k_a;
    ref.current.uniforms.k_d.value = k_d;
    ref.current.uniforms.k_s.value = k_s;
    ref.current.uniforms.alpha_s.value = alpha_s;
  });

  return (
    <shaderMaterial
      ref={ref}
      attach="material"
      uniforms={uniforms}
      vertexShader={phong.vertexShader}
      fragmentShader={phong.fragmentShader}
      lights={true}
      //@ts-ignore
      flatShading={flat}
    />
  );
};
