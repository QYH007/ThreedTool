import React, { Suspense, useEffect, useState } from 'react';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { useAxisControllerStore } from '../../../../components/axisController/AxisController';
import { Axis } from '../../../../types/common';
import { UVTextureResolution } from '../../../../types/texturingUnit';
import CylindricalMappingTextureCylinder from './CylindricalMappingTextureCylinder';
import CylindricalMaterial from './materials/CylindricalMaterial';
import { Teapot } from './objects/Teapot';

const XYProjection = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
};

const YZProjection = {
  position: [0, 0, 0],
  rotation: [0, 0, -Math.PI / 2],
};

const XZProjection = {
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, Math.PI],
};

interface Props {
  axis: Axis;
}

const CylindricalMapping = ({ axis }: Props): JSX.Element => {
  const { position, setPosition } = useAxisControllerStore();

  const [texRes] = useState(UVTextureResolution.MEDIUM);

  const [initialRotation, setInitialRotation] = useState(XYProjection.rotation);

  const [radius] = useState(2);
  const [height] = useState(1.5);

  const textureRef = React.useRef<any>();

  useEffect(() => {
    if (axis === Axis.X) {
      setPosition(XYProjection.position);
      setInitialRotation(XYProjection.rotation);
    }

    if (axis === Axis.Y) {
      setPosition(YZProjection.position);
      setInitialRotation(YZProjection.rotation);
    }

    if (axis === Axis.Z) {
      setPosition(XZProjection.position);
      setInitialRotation(XZProjection.rotation);
    }
  }, [axis, setPosition]);

  return (
    <Suspense fallback={<LoadingSphere />}>
      <CylindricalMappingTextureCylinder
        ref={textureRef}
        position={position}
        rotation={initialRotation}
        radius={radius}
        height={height}
        textureResolution={texRes}
      />
      <Teapot>
        <CylindricalMaterial
          axis={axis}
          refPosition={position}
          refRadius={radius}
          refHeight={height}
          textureResolution={texRes}
        />
      </Teapot>
      <OrbitControls enablePan />
      <axesHelper args={[20]} />
    </Suspense>
  );
};

export default CylindricalMapping;
