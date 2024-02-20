import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface Props {
  intensity: number;
}

/**
 * A Headlight positioned at the camera position.
 * The Headlight is updated each frame.
 * The intensity of the component defines how strong the headlight is.
 */
const HeadLight = ({ intensity }: Props): JSX.Element => {
  const { camera } = useThree();
  const headlight = useRef<any>();

  useFrame((state) => {
    const camPos = state.camera.position;
    headlight.current.position.set(camPos.x, camPos.y, camPos.z);
  });

  return <pointLight ref={headlight} position={camera.position} intensity={intensity} />;
};

export default HeadLight;
