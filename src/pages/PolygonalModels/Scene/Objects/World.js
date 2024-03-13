/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { DRACOLoader } from 'three-stdlib/loaders/DRACOLoader';
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader';

import LoadingSphere from '../../../../components/3d/LoadingSphere';
import { OrbitControls } from '../../../../components/3d/OrbitControls';
import { PolygonalModels } from '../../../../stores';
import { useSavedCamera } from '../../../../hooks/useSavedCamera';

export const Ship = ({ url, wireframe, scale, position, wireframeLineColor, wireframeBodyColor }) => {
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);
  });

  const rugGeometry = gltf.scene.getObjectByName('Ship_rug_0').geometry;
  const rugMaterial = gltf.scene.getObjectByName('Ship_rug_0').material;
  const trimsGeometry = gltf.scene.getObjectByName('Ship_wood_trims_0').geometry;
  const trimsMaterial = gltf.scene.getObjectByName('Ship_wood_trims_0').material;
  const planksGeometry = gltf.scene.getObjectByName('Ship_wood_planks_0').geometry;
  const planksMaterial = gltf.scene.getObjectByName('Ship_wood_planks_0').material;
  const paintedGeometry = gltf.scene.getObjectByName('Ship_wood_painted_0').geometry;
  const paintedMaterial = gltf.scene.getObjectByName('Ship_wood_painted_0').material;
  const sailsGeometry = gltf.scene.getObjectByName('Ship_sails_0').geometry;
  const sailsMaterial = gltf.scene.getObjectByName('Ship_sails_0').material;
  const buildingGeometry = gltf.scene.getObjectByName('Ship_building_mats_0').geometry;
  const buildingMaterial = gltf.scene.getObjectByName('Ship_building_mats_0').material;
  const emissiveGeometry = gltf.scene.getObjectByName('Ship_emissive_0').geometry;
  const emissiveMaterial = gltf.scene.getObjectByName('Ship_emissive_0').material;
  const foliageGeometry = gltf.scene.getObjectByName('Ship_foliage_0').geometry;
  const foliageMaterial = gltf.scene.getObjectByName('Ship_foliage_0').material;
  const foliage2Geometry = gltf.scene.getObjectByName('Ship_foliage_02_0').geometry;
  const foliage2Material = gltf.scene.getObjectByName('Ship_foliage_02_0').material;
  const causticsGeometry = gltf.scene.getObjectByName('Ship_sand_caustics_0').geometry;
  const causticsMaterial = gltf.scene.getObjectByName('Ship_sand_caustics_0').material;
  const sandtileGeometry = gltf.scene.getObjectByName('Ship_sand_tile_0').geometry;
  const sandtileMaterial = gltf.scene.getObjectByName('Ship_sand_tile_0').material;
  const rocktileGeometry = gltf.scene.getObjectByName('Ship_rock_tile_0').geometry;
  const rocktileMaterial = gltf.scene.getObjectByName('Ship_rock_tile_0').material;
  const uniqueGeometry = gltf.scene.getObjectByName('Ship_rocks_unique_0').geometry;
  const uniqueMaterial = gltf.scene.getObjectByName('Ship_rocks_unique_0').material;
  const lightGeometry = gltf.scene.getObjectByName('Ship_water_light_0').geometry;
  const lightMaterial = gltf.scene.getObjectByName('Ship_water_light_0').material;
  const bitsGeometry = gltf.scene.getObjectByName('Ship_bits_bobs_0').geometry;
  const bitsMaterial = gltf.scene.getObjectByName('Ship_bits_bobs_0').material;
  const skyGeometry = gltf.scene.getObjectByName('sky_sky_0').geometry;
  const skyMaterial = gltf.scene.getObjectByName('sky_sky_0').material;
  const noshadGeometry = gltf.scene.getObjectByName('No_Shad_emissive_0').geometry;
  const noshadMaterial = gltf.scene.getObjectByName('No_Shad_emissive_0').material;

  return (
    <group scale={scale} position={position}>
      <scene name="OSG_Scene">
        <object3D name="RootNode_(gltf_orientation_matrix)" rotation={[-1.5707963267948963, 0, 0]}>
          <object3D
            name="RootNode_(model_correction_matrix)"
            position={[0.1427582949399948, 0, -22325.513671875]}
            rotation={[-3.141592653589793, 0, -3.141592653589793]}
          >
            <object3D name="ShipFBX" rotation={[-Math.PI, 0, 0]}>
              <object3D name="RootNode">
                <object3D name="Ship" position={[0, 0, 0]}>
                  {/* ----------------------------------------------------------------------------------------- */}
                  <mesh name={'WRAPPER_Ship_rug_0'}>
                    <mesh name="Ship_rug_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...rugGeometry} />
                      <meshBasicMaterial attach="material" {...rugMaterial} name="material_2" wireframe={wireframe} />
                    </mesh>
                    <mesh name="Ship_rug_0_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...rugGeometry} />
                      <meshBasicMaterial
                        attach="material"
                        name="material_2"
                        wireframe={wireframe}
                        color={wireframeLineColor}
                      />
                    </mesh>
                    <mesh name="Ship_rug_0_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...rugGeometry} />
                      <meshStandardMaterial attach="material" name="material_2" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}
                  <mesh name={'WRAPPER_Ship_wood_trims_0'}>
                    <mesh name="Ship_wood_trims_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...trimsGeometry} />
                      <meshBasicMaterial attach="material" {...trimsMaterial} name="wood_trims" />
                    </mesh>
                    <mesh name="Ship_wood_trims_0_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...trimsGeometry} />
                      <meshBasicMaterial
                        attach="material"
                        name="wood_trims"
                        wireframe={true}
                        color={wireframeLineColor}
                      />
                    </mesh>
                    <mesh name="Ship_wood_trims_0_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...trimsGeometry} />
                      <meshStandardMaterial attach="material" name="wood_trims" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}
                  <mesh name={'WRAPPER_Ship_wood_planks_0'}>
                    <mesh name="Ship_wood_planks_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...planksGeometry} />
                      <meshBasicMaterial attach="material" {...planksMaterial} name="wood_planks" />
                    </mesh>
                    <mesh name="Ship_wood_planks_0_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...planksGeometry} />
                      <meshBasicMaterial
                        attach="material"
                        name="wood_planks_wireframe_mat"
                        wireframe={true}
                        color={wireframeLineColor}
                      />
                    </mesh>
                    <mesh name="Ship_wood_planks_0_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...planksGeometry} />
                      <meshStandardMaterial
                        attach="material"
                        name="wood_planks_wireframe_mat"
                        color={wireframeBodyColor}
                      />
                    </mesh>
                  </mesh>

                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_wood_painted_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...paintedGeometry} />
                      <meshBasicMaterial attach="material" {...paintedMaterial} name="wood_painted" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...paintedGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...paintedGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_sails_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...sailsGeometry} />
                      <meshBasicMaterial attach="material" name="sails" {...sailsMaterial} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...sailsGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...sailsGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_building_mats_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...buildingGeometry} />
                      <meshBasicMaterial attach="material" {...buildingMaterial} name="building_mats" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...buildingGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...buildingGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_emissive_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...emissiveGeometry} />
                      <meshBasicMaterial attach="material" {...emissiveMaterial} name="emissive" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...emissiveGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...emissiveGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_foliage_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...foliageGeometry} />
                      <meshBasicMaterial attach="material" {...foliageMaterial} name="foliage" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...foliageGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...foliageGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_foliage_02_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...foliage2Geometry} />
                      <meshBasicMaterial attach="material" {...foliage2Material} name="foliage_02" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...foliage2Geometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...foliage2Geometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_sand_caustics_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...causticsGeometry} />
                      <meshBasicMaterial attach="material" {...causticsMaterial} name="sand_caustics" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...causticsGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...causticsGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_sand_tile_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...sandtileGeometry} />
                      <meshBasicMaterial attach="material" {...sandtileMaterial} name="sand_tile" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...sandtileGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...sandtileGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_rock_tile_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...rocktileGeometry} />
                      <meshBasicMaterial attach="material" {...rocktileMaterial} name="rock_tile" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...rocktileGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...rocktileGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_rocks_unique_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...uniqueGeometry} />
                      <meshBasicMaterial attach="material" {...uniqueMaterial} name="rocks_unique" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...uniqueGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...uniqueGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}
                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_water_light_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...lightGeometry} />
                      <meshBasicMaterial attach="material" {...lightMaterial} name="water_light" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...lightGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...lightGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}

                  <mesh name={'WRAPPER'}>
                    <mesh name="Ship_bits_bobs_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...bitsGeometry} />
                      <meshBasicMaterial attach="material" {...bitsMaterial} name="bits_bobs" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...bitsGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...bitsGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </mesh>
                  {/* ----------------------------------------------------------------------------------------- */}
                </object3D>
                <object3D
                  name="sky"
                  position={[0, 0, 595.6158447265625]}
                  scale={[1.3289499282836914, 1.3289499282836914, 0.8719646334648132]}
                >
                  <object3D position={[0, 0, 9633.3212890625]}>
                    <mesh name="sky_sky_0" visible={!wireframe}>
                      <bufferGeometry attach="geometry" {...skyGeometry} />
                      <meshBasicMaterial attach="material" {...skyMaterial} name="material" />
                    </mesh>
                    <mesh name="NAME_WIREFRAME" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...skyGeometry} />
                      <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                    </mesh>
                    <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                      <bufferGeometry attach="geometry" {...skyGeometry} />
                      <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                    </mesh>
                  </object3D>
                </object3D>
                <object3D name="No_Shad" position={[0, 0.00008165721374098212, 0]}>
                  <mesh name="No_Shad_emissive_0" visible={!wireframe}>
                    <bufferGeometry attach="geometry" {...noshadGeometry} />
                    <meshBasicMaterial attach="material" {...noshadMaterial} name="emissive" />
                  </mesh>
                  <mesh name="NAME_WIREFRAME" visible={wireframe}>
                    <bufferGeometry attach="geometry" {...noshadGeometry} />
                    <meshBasicMaterial attach="material" name="" wireframe={true} color={wireframeLineColor} />
                  </mesh>
                  <mesh name="NAME_WIREFRAME_BODY" visible={wireframe}>
                    <bufferGeometry attach="geometry" {...noshadGeometry} />
                    <meshStandardMaterial attach="material" name="" color={wireframeBodyColor} />
                  </mesh>
                </object3D>
              </object3D>
            </object3D>
          </object3D>
        </object3D>
      </scene>
    </group>
  );
};

const World = () => {
  const world = PolygonalModels.useStore((state) => state.complex.models[PolygonalModels.EComplexModel.WORLD]);
  const saveCam = PolygonalModels.useStore((state) => state.actions.saveComplexCamera);

  const { scene, camera } = useThree();
  camera.position.set(0, 50, -150);
  camera.lookAt(0, 0, 0);
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

  useSavedCamera({ object: world, saveFunc: saveCam });

  return (
    <Suspense fallback={<LoadingSphere />}>
      <>
        <Ship
          url={world.file}
          wireframe={world.isWireframe}
          flat={world.isFlat}
          scale={world.scale}
          rotation={world.rotation}
          position={world.position}
          wireframeLineColor={'#ffffff'}
          wireframeBodyColor={'#6fa8dc'}
        />
        <OrbitControls enablePan={true} />
      </>
    </Suspense>
  );
};

export default World;
