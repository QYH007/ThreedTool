import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { PolygonalModels } from '../stores';

interface Props {
  object: PolygonalModels.Torus | PolygonalModels.Box | PolygonalModels.ComplexModel | PolygonalModels.Sphere;
  saveFunc: (camToSave: PolygonalModels.SavedCamera, target?: PolygonalModels.EComplexModel) => void;
}

export const useSavedCamera = ({ object, saveFunc }: Props): void => {
  const { camera } = useThree();

  useEffect(() => {
    const camPos = object.savedCam.position.clone();
    const camRot = object.savedCam.rotation.clone();

    camera.position.set(camPos.x, camPos.y, camPos.z);
    camera.rotation.setFromVector3(camRot);
    camera.updateProjectionMatrix();

    return (): void => {
      const pos: THREE.Vector3 = camera.position.clone();
      // const rot: THREE.Vector3 = camera.rotation.toVector3().clone();
      const rot = new THREE.Vector3();
      rot.setFromEuler(camera.rotation.clone());
      if (object.name === 'ship') {
        saveFunc({ position: pos, rotation: rot }, PolygonalModels.EComplexModel.WORLD);
      } else if (object.name === 'bunny') {
        saveFunc({ position: pos, rotation: rot }, PolygonalModels.EComplexModel.BUNNY);
      } else {
        saveFunc({ position: pos, rotation: rot });
      }
    };
  }, [camera, object.name, object.savedCam.position, object.savedCam.rotation, saveFunc]);
};
