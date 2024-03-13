import { a, useSpring } from '@react-spring/three';
import React, { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

import { VertexNormals } from '../../../../components/3d/Helpers';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useSavedCamera } from '../../../../hooks/useSavedCamera';
import { useThree } from '@react-three/fiber';
import { FaceNormals } from '../../../../components/3d/Helpers';

const TorusObject: React.FC = () => {
  const torus = PolygonalModels.useStore((state: PolygonalModels.State) => state.torus);
  const polyScene = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene);
  const saveCam = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions.saveTorusCamera);
  const [loading, setLoading] = useState(true);

  const { scene, camera } = useThree();

  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0);
  const usermesh = scene.getObjectByName('Usermesh');
  if (usermesh) {
    scene.remove(usermesh);
  }

  const bunny_pcd = scene.getObjectByName('bunny.pcd');
  if (bunny_pcd) {
    scene.remove(bunny_pcd);
  }

  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : torus.scale,
  });

  const mesh = useCallback(() => {
    const geo = new THREE.TorusGeometry(torus.radius, torus.tubeWidth, torus.radialSegments, torus.tubularSegments);
    const mat = new THREE.MeshBasicMaterial({ color: polyScene.modelColor });
    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }, [polyScene.modelColor, torus.radialSegments, torus.radius, torus.tubeWidth, torus.tubularSegments]);

  const [normalsMesh, setNormalsMesh] = useState(mesh);

  useSavedCamera({ object: torus, saveFunc: saveCam });

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setNormalsMesh(mesh());
  }, [torus, mesh]);

  const geometry = (
    <torusGeometry
      attach="geometry"
      args={[torus.radius, torus.tubeWidth, torus.radialSegments, torus.tubularSegments]}
    />
  );

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh visible={!torus.isFlat && torus.isVisible} position={[0, 0, 0]}>
          {geometry}
          <meshPhysicalMaterial attach="material" color={polyScene.modelColor} />
        </mesh>
        <mesh visible={torus.isFlat && torus.isVisible} position={[0, 0, 0]}>
          {geometry}
          <meshPhysicalMaterial attach="material" flatShading={true} color={polyScene.modelColor} />
        </mesh>
        <mesh visible={torus.isWireframe} position={[0, 0, 0]}>
          {geometry}
          <meshBasicMaterial
            attach="material"
            wireframe={true}
            color={polyScene.wireframeColor}
            wireframeLinewidth={polyScene.wireframeLineWidth}
          />
        </mesh>

        <FaceNormals
          visible={torus.isFaceNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.faceNormalsColor}
          useFalseNormal={false}
        />

        <VertexNormals
          visible={torus.isVertexNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.vertexNormalsColor}
          useFalseNormal={false}
        />
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default TorusObject;
