/* eslint-disable @typescript-eslint/no-use-before-define */
import { a } from '@react-spring/three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import { FaceNormalsHelper } from '../../../../components/helpers/FaceNormalsHelper';

import { FaceNormals } from '../../../../components/3d/Helpers';
// import { VertexNormals } from '../../../../components/3d/Helpers';
import { FACE_NORMALS_COLOR } from '../../../../constants';
import { Transformations } from '../../../../stores';
import { torusAnimationStoreApi } from './animationStores';
import { useAnimations } from '../../../../hooks/useAnimations';
import { useObjectID } from '../../../../hooks/useObjectID';
// import { VertexNormalsHelper } from 'three-stdlib';
import { FaceNormalsHelper } from '../../../../components/helpers/FaceNormalsHelper';

interface Props {
  objectData: Transformations.SceneObject;
  modelColor: string;
}

const Torus = React.memo(function Box({ objectData, modelColor }: Props) {
  const state = Transformations.useStore((state: Transformations.State) => state);
  const isAnimating = state.isAnimating;
  const showNormals = objectData.showNormals;

  // const [ref, mesh] = useState<any>();
  const ref = useRef<any>();
  const mesh = ref.current;
  // const faceNormalsHelperRef = useUpdate((h: any) => h.update(), [isAnimating]);

  // const faceNormalsHelperRef = (faceNormalsHelper: FaceNormalsHelper | null) => {
  //   if (faceNormalsHelper) {
  //     faceNormalsHelper.update();
  //   }
  // };
  const faceNormalsHelperRef: React.RefObject<FaceNormalsHelper | null> = useRef(null);
  // const vertexNormalsHelperRef: React.RefObject<VertexNormalsHelper | null> = useRef(null);

  useObjectID(ref);
  // useFrame(() => faceNormalsHelperRef.current.update());
  useFrame(() => {
    if (faceNormalsHelperRef.current) {
      faceNormalsHelperRef.current.update();
    }
    // if (vertexNormalsHelperRef.current) {
    //   vertexNormalsHelperRef.current.update();
    // }
  });

  useAnimations(objectData.transformations, ref, torusAnimationStoreApi);
  // console.log(ref);

  useEffect(() => {
    if (state.activeObject.reset) {
      // resetting geometry, as it is sometimes distorted directly by
      // applying matrices to the individual vertices in useAnimation etc.
      ref.current.geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 32);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeObject.reset]);

  return (
    <>
      <a.mesh ref={ref}>
        <torusGeometry attach="geometry" args={[1.5, 0.5, 16, 32]} />
        <meshStandardMaterial flatShading attach="material" color={modelColor} />
      </a.mesh>
      {mesh && (
        <FaceNormals
          // <VertexNormals
          ref={faceNormalsHelperRef}
          // ref={vertexNormalsHelperRef}
          visible={showNormals}
          mesh={mesh}
          length={0.3}
          color={FACE_NORMALS_COLOR}
        />
      )}
    </>
  );
});

export default Torus;
