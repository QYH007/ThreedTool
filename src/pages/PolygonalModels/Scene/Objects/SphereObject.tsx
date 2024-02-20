import { a, useSpring } from '@react-spring/three';
import React, { useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';

import { VertexNormals } from '../../../../components/3d/Helpers';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useSavedCamera } from '../../../../hooks/useSavedCamera';
import { useThree } from '@react-three/fiber';
import { FaceNormals } from '../../../../components/3d/Helpers';

const SphereObject: React.FC = () => {
  const sphere = PolygonalModels.useStore((state: PolygonalModels.State) => state.sphere);
  const polyScene = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene);
  const saveCam = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions.saveSphereCamera);

  const [loading, setLoading] = useState(true);
  const sProps = useSpring({
    scale: loading ? [0.7, 0.7, 0.7] : sphere.scale,
  });

  const { scene } = useThree();
  const userpcd = scene.getObjectByName('User.pcd');
  if (userpcd) {
    scene.remove(userpcd);
  }
  const userobj = scene.getObjectByName('User.obj');
  if (userobj) {
    scene.remove(userobj);
  }
  const bunny_pcd = scene.getObjectByName('Zaghetto.pcd');
  if (bunny_pcd) {
    scene.remove(bunny_pcd);
  }

  const mesh = useCallback(() => {
    const geo = new THREE.SphereGeometry(sphere.radius, sphere.widthSegments, sphere.heightSegments);

    const mat = new THREE.MeshBasicMaterial({ color: polyScene.modelColor });
    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
  }, [sphere.radius, sphere.widthSegments, sphere.heightSegments, polyScene.modelColor]);

  const [normalsMesh, setNormalsMesh] = useState(mesh);

  useSavedCamera({ object: sphere, saveFunc: saveCam });

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setNormalsMesh(mesh());
  }, [mesh]);

  const geometry = (
    <sphereGeometry attach="geometry" args={[sphere.radius, sphere.widthSegments, sphere.heightSegments]} />
  );

  return (
    <>
      <a.group
        //@ts-ignore
        scale={sProps.scale}
      >
        <mesh visible={!sphere.isFlat && sphere.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial attach="material" color={polyScene.modelColor} />
          {geometry}
        </mesh>
        <mesh visible={sphere.isFlat && sphere.isVisible} position={[0, 0, 0]}>
          <meshPhysicalMaterial attach="material" flatShading={true} color={polyScene.modelColor} />
          {geometry}
        </mesh>
        <mesh visible={sphere.isWireframe} position={[0, 0, 0]}>
          <meshBasicMaterial
            attach="material"
            wireframe={true}
            color={polyScene.wireframeColor}
            wireframeLinewidth={polyScene.wireframeLineWidth}
          />
          {geometry}
        </mesh>

        <FaceNormals
          visible={sphere.isFaceNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.faceNormalsColor}
        />

        <VertexNormals
          visible={sphere.isVertexNormals}
          mesh={normalsMesh}
          length={polyScene.normalsLength}
          color={polyScene.vertexNormalsColor}
        />
      </a.group>
      <OrbitControls enablePan={true} />
    </>
  );
};

export default SphereObject;
