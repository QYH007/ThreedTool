import React from 'react';
import { extend } from '@react-three/fiber';
import { FaceNormalsHelper } from '../helpers/FaceNormalsHelper';
import { VertexNormalsHelper } from 'three-stdlib/helpers/VertexNormalsHelper';

extend({ VertexNormalsHelper, FaceNormalsHelper });
// extend({ VertexNormalsHelper });

export interface HelperInput {
  visible: boolean;
  mesh: any;
  length: number;
  color: number;
}

/**
 * Displays face normals as lines of the referenced mesh
 */
// export const FaceNormals = React.forwardRef(({ visible, mesh, length, color }: HelperInput, ref) => {
//   return (
//     //@ts-ignore
//     <FaceNormalsHelper ref={ref} object={mesh} size={length} hex={color} />
//   );
// });
// FaceNormals.displayName = 'FaceNormals';
export const FaceNormals = React.forwardRef(({ visible, mesh, length, color }: HelperInput, ref) => {
  // Instantiate the FaceNormalsHelper with the 'new' keyword
  const faceNormalsHelper = new FaceNormalsHelper(mesh, length, color);

  return (
    //@ts-ignore
    <primitive object={faceNormalsHelper} ref={ref} visible={visible} />
  );
});
FaceNormals.displayName = 'FaceNormals';

/**
 * Displays vertex normals as lines of the referenced mesh
 */
export const VertexNormals = React.forwardRef(({ visible, mesh, length, color }: HelperInput, ref) => {
  return (
    //@ts-ignore
    <vertexNormalsHelper ref={ref} visible={visible} args={[mesh, length, color, 1]} />
  );
});
VertexNormals.displayName = 'VertexNormals';
