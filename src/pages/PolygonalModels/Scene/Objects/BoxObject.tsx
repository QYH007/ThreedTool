import { a, useSpring } from '@react-spring/three';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { VertexNormals } from '../../../../components/3d/Helpers';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useThree } from '@react-three/fiber';
import { FaceNormals } from '../../../../components/3d/Helpers';

const BoxObject: React.FC = () => {
  const box = PolygonalModels.useStore((state) => state.box);
  const polyScene = PolygonalModels.useStore((state) => state.scene);
  const thisBox = useRef<any>();
  const { scene, gl, camera } = useThree();

  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  gl.outputEncoding = THREE.sRGBEncoding;

  const usermesh = scene.getObjectByName('Usermesh');
  if (usermesh) {
    scene.remove(usermesh);
  }

  const bunny_pcd = scene.getObjectByName('bunny.pcd');
  if (bunny_pcd) {
    scene.remove(bunny_pcd);
  }
  const [loading, setLoading] = useState(true);
  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : box.scale,
  });

  const mesh = useCallback(() => {
    const geo = new THREE.BoxGeometry(
      box.width,
      box.height,
      box.depth,
      box.widthSegments,
      box.heightSegments,
      box.depthSegments,
    );

    const mat = new THREE.MeshBasicMaterial({ color: polyScene.modelColor });
    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }, [
    box.depth,
    box.depthSegments,
    box.height,
    box.heightSegments,
    box.width,
    box.widthSegments,
    polyScene.modelColor,
  ]);

  const [normalsMesh, setNormalsMesh] = useState(mesh);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setNormalsMesh(mesh());
  }, [mesh]);

  const geometry = (
    <boxGeometry
      attach="geometry"
      args={[box.width, box.height, box.depth, box.widthSegments, box.heightSegments, box.depthSegments]}
    />
  );

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh ref={thisBox} visible={!box.isFlat && box.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={polyScene.modelColor} />
          {geometry}
        </mesh>
        <mesh visible={box.isFlat && box.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={polyScene.modelColor} />
          {geometry}
        </mesh>

        <mesh visible={box.isWireframe}>
          <meshBasicMaterial
            attach="material"
            wireframe={true}
            color={polyScene.wireframeColor}
            wireframeLinewidth={polyScene.wireframeLineWidth}
          />
          {geometry}
        </mesh>

        <FaceNormals
          visible={box.isFaceNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.faceNormalsColor}
          useFalseNormal={false}
        />

        <VertexNormals
          visible={box.isVertexNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.vertexNormalsColor}
          useFalseNormal={false}
        />
      </a.group>
      <OrbitControls enablePan={false} />
    </>
  );
};

export default BoxObject;
