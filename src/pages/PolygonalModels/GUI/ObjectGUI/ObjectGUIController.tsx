import React from 'react';
import { PolygonalModels } from '../../../../stores';
import BoxGUI from './Box/BoxGUI';
import ComplexGUI from './Complex/ComplexGUI';
import SphereGUI from './Sphere/SphereGUI';
import TorusGUI from './Torus/TorusGUI';
import UserMeshGUI from './UserMesh/UserMeshGUI';

const ObjectGUIController: React.FC = () => {
  const scene = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene);
  const complex = PolygonalModels.useStore((state: PolygonalModels.State) => state.complex);

  return (
    <div style={{ width: 300 }}>
      {scene.activeObject === PolygonalModels.ESceneObject.Box ? <BoxGUI /> : null}
      {scene.activeObject === PolygonalModels.ESceneObject.Sphere ? <SphereGUI /> : null}
      {scene.activeObject === PolygonalModels.ESceneObject.Torus ? <TorusGUI /> : null}
      {scene.activeObject === PolygonalModels.ESceneObject.Bunny ? (
        <ComplexGUI model={complex.models[PolygonalModels.EComplexModel.BUNNY]} />
      ) : null}
      {scene.activeObject === PolygonalModels.ESceneObject.World ? (
        <ComplexGUI model={complex.models[PolygonalModels.EComplexModel.WORLD]} />
      ) : null}
      {/* UserMesh GUI at topright */}
      {scene.activeObject === PolygonalModels.ESceneObject.UserMesh ? <UserMeshGUI /> : null}
    </div>
  );
};

export default ObjectGUIController;
