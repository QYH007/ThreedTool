import * as THREE from 'three';

import { Transformations } from '../stores';
import { Axis } from '../types/common';

const utils = {
  computeTransformationMatrix: (t: Transformations.Transformation): THREE.Matrix4 => {
    const singleTransform = new THREE.Matrix4();
    if (
      t.type === Transformations.ETransformationType.SCALING &&
      t.x !== undefined &&
      t.y !== undefined &&
      t.z !== undefined
    ) {
      singleTransform.makeScale(t.x, t.y, t.z);
    } else if (
      t.type === Transformations.ETransformationType.TRANSLATION &&
      t.x !== undefined &&
      t.y !== undefined &&
      t.z !== undefined
    ) {
      singleTransform.makeTranslation(t.x, t.y, t.z);
    } else if (
      t.type === Transformations.ETransformationType.SHEAR &&
      t.x !== undefined &&
      t.y !== undefined &&
      t.z !== undefined
    ) {
      // prettier-ignore
      singleTransform.set(
          1,   t.y,  t.z, 0, 
          t.x,  1,   t.z, 0,
          t.x, t.y,   1,  0, 
          0,    0,    0,  1
        )
    } else if (
      t.type === Transformations.ETransformationType.ROTATION &&
      t.rotation !== undefined &&
      t.degree !== undefined
    ) {
      // the values inside the animation object
      const angle = t.degree;
      const angleRad = THREE.MathUtils.degToRad(angle);

      if (t.rotation === Axis.X) {
        singleTransform.makeRotationX(angleRad);
      } else if (t.rotation === Axis.Y) {
        singleTransform.makeRotationY(angleRad);
      } else if (t.rotation === Axis.Z) {
        singleTransform.makeRotationZ(angleRad);
      }
    }
    return singleTransform;
  },

  makeXShear: (y: number, z: number): THREE.Matrix4 => {
    // prettier-ignore
    return new THREE.Matrix4().set(
        1,  y,  z,  0, // influence on x axis
        0,  1,  0,  0, // influence on y axis
        0,  0,  1,  0, // influence on z axis
        0,  0,  0,  1
      )
  },

  makeYShear: (x: number, z: number): THREE.Matrix4 => {
    // prettier-ignore
    return new THREE.Matrix4().set(
        1,  0,  0,  0, // influence on x axis
        x,  1,  z,  0, // influence on y axis
        0,  0,  1,  0, // influence on z axis
        0,  0,  0,  1
      )
  },

  makeZShear: (x: number, y: number): THREE.Matrix4 => {
    // prettier-ignore
    return new THREE.Matrix4().set(
        1,  0,  0,  0, // influence on x axis
        0,  1,  0,  0, // influence on y axis
        x,  y,  1,  0, // influence on z axis
        0,  0,  0,  1
      )
  },

  applyMatrix4ToVertices: (targetMesh: any, m: THREE.Matrix4): void => {
    const vertices = targetMesh.geometry.vertices;
    for (let i = 0, il = vertices.length; i < il; i++) {
      const vertex = vertices[i];
      vertex.applyMatrix4(m);
    }
    targetMesh.geometry.verticesNeedUpdate = true;
  },

  setFalseNormalMatrixFromMatrix4: (targetMesh: any, m: THREE.Matrix4): void => {
    const faces = targetMesh.geometry.faces;
    const normalMatrix = new THREE.Matrix3().setFromMatrix4(m);
    for (let i = 0, il = targetMesh.geometry.faces.length; i < il; i++) {
      const face = faces[i];
      face.normal.applyMatrix3(normalMatrix).normalize();
      for (let j = 0, jl = face.vertexNormals.length; j < jl; j++) {
        face.vertexNormals[j].applyMatrix3(normalMatrix).normalize();
      }
      targetMesh.geometry.faces[i] = face;
    }

    targetMesh.geometry.normalsNeedUpdate = true;
  },

  applyToVertices: (targetMesh: any, m: THREE.Matrix4, targetGeometry: any): void => {
    const newVerts: THREE.Vector3[] = [...targetGeometry.vertices];

    const verts: THREE.Vector3[] = targetMesh.geometry.vertices;

    for (let i = 0, il = verts.length; i < il; i++) {
      const vert = new THREE.Vector3().copy(newVerts[i]);
      vert.applyMatrix4(m);

      const finalVertex = verts[i];
      finalVertex.set(vert.x, vert.y, vert.z);
    }

    targetMesh.geometry.verticesNeedUpdate = true;
    targetMesh.geometry.normalsNeedUpdate = true;
  },
};

export default utils;
