import { Store } from '@material-ui/icons';
import { BufferGeometry, Float32BufferAttribute, LineSegments, LineBasicMaterial, Matrix3, Vector3 } from 'three';
import { Transformations } from '../../stores';

const _v1 = new Vector3();
const _v2 = new Vector3();
const _v3 = new Vector3();
const _normalMatrix = new Matrix3();

class FaceNormalsHelper extends LineSegments {
  constructor(object, size = 1, color = 0xff0000, useFalseNormal) {
    const geometry = new BufferGeometry();

    const nFaces = object.geometry.index
      ? object.geometry.index.count / 3
      : object.geometry.attributes.position.count / 3;
    const positions = new Float32BufferAttribute(nFaces * 2 * 3, 3);
    const initPositions = new Float32BufferAttribute(nFaces * 2 * 3, 3);

    geometry.setAttribute('position', positions);
    geometry.setAttribute('initPosition', initPositions);

    super(geometry, new LineBasicMaterial({ color, toneMapped: false }));

    this.object = object;
    this.size = size;
    this.type = 'FaceNormalsHelper';
    this.useFalseNormal = useFalseNormal;

    this.matrixAutoUpdate = false;
    this.init();
    this.update();
  }

  init() {
    this.object.updateMatrixWorld(true);

    _normalMatrix.getNormalMatrix(this.object.matrixWorld);

    const position = this.geometry.attributes.position;
    const initPosition = this.geometry.attributes.initPosition;

    const objGeometry = this.object.geometry;

    if (objGeometry) {
      const objPos = objGeometry.attributes.position;
      const objIndex = objGeometry.index;

      let idx = 0;

      // Loop through each face and compute the face normal
      for (let f = 0; f < objGeometry.index.count; f += 3) {
        const a = objIndex ? objIndex.getX(f) : f;
        const b = objIndex ? objIndex.getX(f + 1) : f + 1;
        const c = objIndex ? objIndex.getX(f + 2) : f + 2;

        _v1.fromBufferAttribute(objPos, a);
        _v2.fromBufferAttribute(objPos, b);
        _v3.fromBufferAttribute(objPos, c);

        const faceNormal = new Vector3();
        faceNormal.crossVectors(_v2.clone().sub(_v1), _v3.clone().sub(_v1)).normalize().multiplyScalar(this.size);
        const faceCenter = _v1.clone().add(_v2).add(_v3).divideScalar(3);

        position.setXYZ(idx, faceCenter.x, faceCenter.y, faceCenter.z);
        initPosition.setXYZ(idx, faceCenter.x, faceCenter.y, faceCenter.z);
        idx = idx + 1;

        position.setXYZ(idx, faceCenter.x + faceNormal.x, faceCenter.y + faceNormal.y, faceCenter.z + faceNormal.z);
        initPosition.setXYZ(idx, faceCenter.x + faceNormal.x, faceCenter.y + faceNormal.y, faceCenter.z + faceNormal.z);
        idx = idx + 1;
      }
    }

    position.needsUpdate = true;
  }

  update() {
    this.object.updateMatrixWorld(true);

    _normalMatrix.getNormalMatrix(this.object.matrixWorld);

    const matrixWorld = this.object.matrixWorld;
    const useFalseNormal = this.useFalseNormal;

    const position = this.geometry.attributes.position;
    const initPosition = this.geometry.attributes.initPosition;

    const objGeometry = this.object.geometry;

    if (objGeometry) {
      if (useFalseNormal) {
        for (let idx = 0; idx < position.count; idx += 2) {
          const oldPosition1 = new Vector3(initPosition.getX(idx), initPosition.getY(idx), initPosition.getZ(idx));
          const oldPosition2 = new Vector3(
            initPosition.getX(idx + 1),
            initPosition.getY(idx + 1),
            initPosition.getZ(idx + 1),
          );

          const newPosition1 = oldPosition1.applyMatrix4(matrixWorld);
          const newPosition2 = oldPosition2.applyMatrix4(matrixWorld);
          const newNormal = newPosition2.clone().sub(newPosition1).normalize().multiplyScalar(this.size);

          const trueNewPosition2 = newPosition1.clone().add(newNormal);

          position.setXYZ(idx, newPosition1.x, newPosition1.y, newPosition1.z);

          position.setXYZ(idx + 1, trueNewPosition2.x, trueNewPosition2.y, trueNewPosition2.z);
        }
      } else {
        const objPos = objGeometry.attributes.position;
        const objIndex = objGeometry.index;

        let idx = 0;

        // Loop through each face and compute the face normal
        for (let f = 0; f < objGeometry.index.count; f += 3) {
          const a = objIndex ? objIndex.getX(f) : f;
          const b = objIndex ? objIndex.getX(f + 1) : f + 1;
          const c = objIndex ? objIndex.getX(f + 2) : f + 2;

          _v1.fromBufferAttribute(objPos, a).applyMatrix4(matrixWorld);
          _v2.fromBufferAttribute(objPos, b).applyMatrix4(matrixWorld);
          _v3.fromBufferAttribute(objPos, c).applyMatrix4(matrixWorld);

          const faceNormal = new Vector3();
          faceNormal.crossVectors(_v2.clone().sub(_v1), _v3.clone().sub(_v1)).normalize().multiplyScalar(this.size);
          const faceCenter = _v1.clone().add(_v2).add(_v3).divideScalar(3);

          position.setXYZ(idx, faceCenter.x, faceCenter.y, faceCenter.z);
          idx = idx + 1;

          position.setXYZ(idx, faceCenter.x + faceNormal.x, faceCenter.y + faceNormal.y, faceCenter.z + faceNormal.z);
          idx = idx + 1;
        }
      }
    }

    position.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export { FaceNormalsHelper };
