/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { DRACOLoader } from 'three-stdlib/loaders/DRACOLoader';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';
import * as THREE from 'three';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useSavedCamera } from '../../../../hooks/useSavedCamera';
import { PCDLoader, VertexNormalsHelper } from 'three-stdlib';

export const Asset = ({
  url,
  sceneData,
  wireframe,
  flat,
  scale,
  rotation,
  position,
  normals,
  vertexNormalsColor,
  visible,
}) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);
  });

  const Bunny = ({ isWireframe, isFlat, isNormals }) => {
    // const [ref, obj] = useState();
    const ref = useRef(THREE.Mesh);

    const geo = gltf.scene.getObjectByName('mesh_0').geometry;
    const mat = gltf.scene.getObjectByName('mesh_0').material;

    const this_scene = gltf.scene.getObjectByName('mesh_0');

    return (
      <scene name="OSG_Scene">
        <object3D name="RootNode_(gltf_orientation_matrix)" rotation={[-1.5707963267948963, 0, 0]}>
          <object3D name="RootNode_(model_correction_matrix)" rotation={[1.5707963267948963, 0, 0]}>
            <object3D name="Geode" scale={scale} position={position} rotation={rotation}>
              <mesh ref={ref} visible={visible}>
                <bufferGeometry attach="geometry" {...geo} />
                <meshStandardMaterial
                  attach="material"
                  {...mat}
                  name="Scene_-_Root"
                  flatShading={isFlat}
                  wireframe={isWireframe}
                  color={isWireframe ? sceneData.wireframeColor : sceneData.modelColor}
                />
              </mesh>
              {isNormals && ref.current ? <vertexNormalsHelper args={[this_scene, 0.003, vertexNormalsColor]} /> : null}
            </object3D>
          </object3D>
        </object3D>
      </scene>
    );
  };

  return (
    <group>
      {!flat && <Bunny isWireframe={false} isFlat={false} isNormals={normals} />}
      {flat && <Bunny isWireframe={false} isFlat={true} isNormals={normals} />}

      {wireframe && <Bunny isWireframe={true} isFlat={false} isNormals={normals} />}
    </group>
  );
};

const BunnyObject = () => {
  const bunny = PolygonalModels.useStore((state) => state.complex.models[PolygonalModels.EComplexModel.BUNNY]);
  const scene1 = PolygonalModels.useStore((state) => state.scene);
  const saveCam = PolygonalModels.useStore((state) => state.actions.saveComplexCamera);
  const { scene, gl } = useThree();
  useSavedCamera({ object: bunny, saveFunc: saveCam });
  const userpcd = scene.getObjectByName('User.pcd');
  if (userpcd) {
    scene.remove(userpcd);
  }
  const userobj = scene.getObjectByName('User.obj');
  if (userobj) {
    scene.remove(userobj);
  }

  const PCDloader = new PCDLoader();
  PCDloader.load('/polygonalModels/PCD/rabbit.pcd', function (points) {
    while (scene.getObjectByName('Zaghetto.pcd')) {
      const de = scene.getObjectByName('Zaghetto.pcd');
      scene.remove(de);
    }
    points.geometry.center();
    points.geometry.translate(-1.06, 3.509, -0.15);
    points.geometry.scale(0.4005, 0.4005, 0.4005);
    points.name = 'Zaghetto.pcd';
    const material = new THREE.PointsMaterial({ color: 0xdd0000, size: 0.01 });
    points.material = material;
    if (bunny.isPointClouds) {
      scene.add(points);
    }
  });
  // console.log(bunny.isVisible);

  return (
    <Suspense fallback={<LoadingSphere />}>
      <>
        <Asset
          sceneData={scene1}
          url={bunny.file}
          wireframe={bunny.isWireframe}
          flat={bunny.isFlat}
          scale={bunny.scale}
          rotation={bunny.rotation}
          position={bunny.position}
          normals={bunny.isFaceNormals}
          vertexNormalsColor={scene1.vertexNormalsColor}
          visible={bunny.isVisible}
        />
        {/* <bufferGeometry>{PC}</bufferGeometry> */}
        <OrbitControls enablePan={true} />
      </>
    </Suspense>
  );
};

export default BunnyObject;
