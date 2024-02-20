import { a } from '@react-spring/three';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

import { Transformations } from '../../../../stores';
import { groupAnimationStoreApi } from './animationStores';
import { GroupObject } from './GroupObject';
import { useAnimations } from '../../../../hooks/useAnimations';
import { useObjectID } from '../../../../hooks/useObjectID';

interface GroupBoxObject {
  name: string;
  position: THREE.Vector3;
  inGroup: boolean;
}

const initialSceneBoxes: GroupBoxObject[] = [
  {
    name: 'box-' + 0,
    inGroup: false,
    position: new THREE.Vector3(1, 1, 1),
  },
  {
    name: 'box-' + 1,
    inGroup: false,
    position: new THREE.Vector3(-1, 1, -1),
  },
  {
    name: 'box-' + 2,
    inGroup: false,
    position: new THREE.Vector3(1, 2, 3),
  },
];

const initialGroupBoxes: GroupBoxObject[] = [];

interface Props {
  objectData: Transformations.SceneObject;
  modelColor: string;
}

export const ObjectGroup: React.FC<Props> = ({ objectData, modelColor }) => {
  const [groupBoxes, setGroupBoxes] = useState(initialGroupBoxes);
  const [sceneBoxes, setSceneBoxes] = useState(initialSceneBoxes);

  const ref = useRef<any>(new THREE.Mesh());
  useObjectID(ref);

  useAnimations(objectData.transformations, ref, groupAnimationStoreApi);

  const toggleGroup = (index: number, name: string, inGroup: boolean): void => {
    if (inGroup) {
      for (let i = 0; i < groupBoxes.length; i++) {
        const box = groupBoxes[i];
        if (box.name === name) {
          box.inGroup = false;
          const newGroup = Array.from(groupBoxes);
          const newScene = Array.from(sceneBoxes);
          newGroup.splice(i, 1);
          newScene.push(box);
          setGroupBoxes(newGroup);
          setSceneBoxes(newScene);
        }
      }
    } else {
      for (let i = 0; i < sceneBoxes.length; i++) {
        const box = sceneBoxes[i];
        if (box.name === name) {
          box.inGroup = true;
          const newGroup = Array.from(groupBoxes);
          const newScene = Array.from(sceneBoxes);
          newScene.splice(i, 1);
          newGroup.push(box);
          setGroupBoxes(newGroup);
          setSceneBoxes(newScene);
        }
      }
    }
  };

  return (
    <a.mesh>
      <mesh ref={ref} name={'transformation-group'}>
        {groupBoxes.length !== 0 &&
          groupBoxes.map((box, index) => (
            <GroupObject
              key={index}
              index={index}
              name={box.name}
              inGroup={box.inGroup}
              toggleGroup={toggleGroup}
              position={box.position}
              modelColor={modelColor}
            />
          ))}
      </mesh>
      {sceneBoxes.map((box, index) => (
        <GroupObject
          key={index}
          index={index}
          name={box.name}
          inGroup={box.inGroup}
          toggleGroup={toggleGroup}
          position={box.position}
          modelColor={modelColor}
        />
      ))}
    </a.mesh>
  );
};
