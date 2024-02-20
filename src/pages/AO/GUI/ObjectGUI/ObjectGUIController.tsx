import React from 'react';
import { AO } from '../../../../stores';
import ComplexGUI from './Complex/ComplexGUI';

const ObjectGUIController: React.FC = () => {
  const scene = AO.useStore((state: AO.State) => state.scene);

  return <div style={{ width: 300 }}>{scene.activeObject === AO.ESceneObject.Complex ? <ComplexGUI /> : null}</div>;
};

export default ObjectGUIController;
