import React from 'react';
import { PBR } from '../../../../stores';
import BoxGUI from './Box/BoxGUI';
import SphereGUI from './Sphere/SphereGUI';
import TorusGUI from './Torus/TorusGUI';
import CerberusGUI from './Cerberus/CerberusGUI';

const ObjectGUIController: React.FC = () => {
  const scene = PBR.useStore((state: PBR.State) => state.scene);

  return (
    <div style={{ width: 300 }}>
      {scene.activeObject === PBR.ESceneObject.Box ? <BoxGUI /> : null}
      {scene.activeObject === PBR.ESceneObject.Sphere ? <SphereGUI /> : null}
      {scene.activeObject === PBR.ESceneObject.Torus ? <TorusGUI /> : null}
      {scene.activeObject === PBR.ESceneObject.Cerberus ? <CerberusGUI /> : null}
    </div>
  );
};

export default ObjectGUIController;
