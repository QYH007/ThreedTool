import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Cache, Box3, LoadingManager, TextureLoader } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { AO } from '../../../../../stores';
import { useModel } from '../../../ModelContext';
import { useDropzone } from 'react-dropzone';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const MANAGER = new LoadingManager();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco-gltf/');
Cache.enabled = true;

const ComplexGUI: React.FC = () => {
  const complex = AO.useStore((state: AO.State) => state.complex);
  const actions = AO.useStore((state: AO.State) => state.actions);
  const { model, setModel, modelType, setModelType } = useModel();

  function getFileExtension(filename: string | null) {
    if (filename) {
      const parts = filename.split('.');
      if (parts.length > 1) {
        return parts[parts.length - 1].toLowerCase();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  const load = (fileURL: string, rootPath: string, acceptedFiles: any, modelType: string) => {
    return new Promise((resolve, reject) => {
      if (modelType === 'glb') {
        const loader = new GLTFLoader();
        loader.load(fileURL, (glb) => {
          const box = new Box3().setFromObject(glb.scene);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());
          const scaling = 5 / size;
          const moveVector = new THREE.Vector3(0, 0, 0)
            .clone()
            .sub(center)
            .multiply(new THREE.Vector3(scaling, scaling, scaling));
          glb.scene.scale.setScalar(scaling);
          glb.scene.position.add(moveVector);
          glb.scene.name = 'User.obj';
          setModel(glb.scene);
        });
      } else if (modelType === 'obj') {
        let objDiffMap: any;
        const loader = new OBJLoader();
        loader.load(fileURL, (obj) => {
          const textureLoader = new TextureLoader();
          // find image as diffusion map
          acceptedFiles.forEach((file: any) => {
            const assertType = getFileExtension(file.name);
            if (assertType === 'png' || assertType === 'jpg' || assertType === 'jpeg' || assertType === 'tga') {
              const PNGUrl = URL.createObjectURL(file);
              objDiffMap = textureLoader.load(PNGUrl);
              objDiffMap.encoding = THREE.sRGBEncoding;
              objDiffMap.name = file.name;
              obj.traverse(function (child: any) {
                // aka setTexture
                if (child instanceof THREE.Mesh) {
                  //@ts-ignore
                  child.material.map = objDiffMap;
                }
              });
            }
          });

          const box = new Box3().setFromObject(obj);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());
          const scaling = 5 / size;
          const moveVector = new THREE.Vector3(0, 0, 0)
            .clone()
            .sub(center)
            .multiply(new THREE.Vector3(scaling, scaling, scaling));
          obj.scale.setScalar(scaling);
          obj.position.add(moveVector);
          obj.name = 'User.obj';
          setModel(obj);
        });
      }
    });
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    let rootFile: any;
    let rootPath: any;
    actions.loadedOBJ();
    setModel(null);

    acceptedFiles.forEach((file: any) => {
      if (file.name.match(/\.(gltf|glb|fbx|FBX|obj|OBJ|pcd|PCD)$/)) {
        rootFile = file;
        rootPath = file.path.replace(file.name, '');
        // setFileName(file.name);
      }
    });
    const type = getFileExtension(rootFile.name) || '';
    // setModelType(type);
    const fileURL = typeof rootFile === 'string' ? rootFile : URL.createObjectURL(rootFile);

    load(fileURL, rootPath, acceptedFiles, type);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <PanelAppear>
      <Typography variant="h5">OBJECT</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={complex.isDiffuse}
              onChange={(): void => actions.toggleComplexDiffuse()}
              value="checkedA"
            />
          }
          label="Diffuse Color"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={complex.isAO}
              onChange={(): void => actions.toggleComplexAO()}
              value="checkedA"
            />
          }
          label="Ambient Occlusion"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        label={'AO Radius'}
        value={complex.radius}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setComplexRadius(+v)}
      />
      <PanelSlider
        label={'AO Intensity'}
        value={complex.intensity}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setComplexIntensity(+v)}
      />
      <Divider />
      <br></br>
      <div
        {...getRootProps()}
        style={{ borderRadius: '0.5', background: '#333333', padding: '1em', textAlign: 'center' }}
      >
        <input {...getInputProps()} />
        <p style={{ color: '#dddddd' }}>
          Drop your .obj / folder here <br></br>or <br></br>Click to select .obj file
        </p>
      </div>
      <br></br>
      <Divider />
    </PanelAppear>
  );
};

export default ComplexGUI;
