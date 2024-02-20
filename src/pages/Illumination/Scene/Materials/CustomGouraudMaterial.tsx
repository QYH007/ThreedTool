/* eslint-disable @typescript-eslint/naming-convention */
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { gouraud } from '../Shaders/gouraud';

interface Props {
  k_a: number;
  k_d: number;
  k_s: number;
  alpha_s: number;
  color: THREE.Color;
}

export const CustomGouraudMaterial: React.FC<Props> = ({ k_a, k_d, k_s, alpha_s, color }) => {
  const uniforms = useMemo(
    () => THREE.UniformsUtils.merge([THREE.UniformsLib.lights, THREE.UniformsLib.common, gouraud.uniforms]),
    [],
  );

  const ref = useRef<any>();

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
      vertexShader={gouraud.vertexShader}
      fragmentShader={gouraud.fragmentShader}
      lights={true}
    />
  );
};
