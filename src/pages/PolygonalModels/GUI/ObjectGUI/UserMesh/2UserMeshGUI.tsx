/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React, { useState, ChangeEvent, useEffect, useCallback } from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import { PolygonalModels } from '../../../../../stores';
import { useModelContext, useModel } from '../../../ModelContext';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useDropzone } from 'react-dropzone';
import { Cache, Box3, LoaderUtils, LoadingManager, TextureLoader } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useThree } from '@react-three/fiber';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { GithubPicker } from 'react-color';

const MANAGER = new LoadingManager();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco-gltf/');

Cache.enabled = true;

const UserMeshGUI: React.FC = () => {
  const activeObject = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.activeObject);
  const { model, setModel, modelType, setModelType } = useModel();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const [diffMap, setDiffMap] = useState<THREE.Texture | null>(null);
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null);
  const [roughnessMap, setRoughnessMap] = useState<THREE.Texture | null>(null);
  const [metalnessMap, setMetalnessMap] = useState<THREE.Texture | null>(null);
  const [originDiffMap, setOriginDiffMap] = useState<THREE.Texture | null>(null);
  const [useDiff, setUseDiff] = useState<boolean>(false);
  const [useNormal, setUseNormal] = useState<boolean>(false);
  const [useMetal, setUseMetal] = useState<boolean>(false);
  const [useRough, setUseRough] = useState<boolean>(false);

  const [pcdSize, setPcdSize] = useState<number>(0.001);
  const [pcdColor, setPcdColor] = useState<THREE.Color>(new THREE.Color(0x888888));

  useEffect(() => {
    if (model) {
      updateObj();
    }
  }, [useDiff, useNormal, useMetal, useRough]);

  // useEffect(() => {
  //   if (model) {
  //     updatePcd();
  //   }
  // }, [pcdSize, pcdColor]);

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

  const handleDiffFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    setDiffMap(originDiffMap);
    setUseDiff(false);
    if (file) {
      const loader = new TextureLoader();
      const textureUrl = URL.createObjectURL(file);
      const texture = loader.load(textureUrl);
      texture.encoding = THREE.sRGBEncoding;
      texture.name = file.name;
      setDiffMap(texture);
      setUseDiff(false);
    }
    updateObj();
  };

  const handleNormalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    setUseNormal(false);
    if (file) {
      const loader = new TextureLoader();
      const textureUrl = URL.createObjectURL(file);
      const texture = loader.load(textureUrl);
      texture.name = file.name;
      setNormalMap(texture);
      setUseNormal(false);
    }
    updateObj();
  };

  const handleMetalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    setUseMetal(false);
    if (file) {
      const loader = new TextureLoader();
      const textureUrl = URL.createObjectURL(file);
      const texture = loader.load(textureUrl);
      texture.name = file.name;
      setMetalnessMap(texture);
      setUseMetal(false);
    }
    updateObj();
  };

  const handleRoughFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    setUseRough(false);
    if (file) {
      const loader = new TextureLoader();
      const textureUrl = URL.createObjectURL(file);
      const texture = loader.load(textureUrl);
      texture.name = file.name;
      setRoughnessMap(texture);
      setUseRough(false);
    }
    updateObj();
  };

  const toggleUseDiffMap = () => {
    setUseDiff(!useDiff);
  };
  const toggleUseNormalMap = () => {
    setUseNormal(!useNormal);
  };

  const updateObj = () => {
    if (useDiff || useNormal || useRough || useMetal) {
      const mat = new THREE.MeshStandardMaterial({
        color: '#eeeeee',
        map: useDiff ? diffMap : originDiffMap,
        normalMap: useNormal ? normalMap : null,
        roughnessMap: useRough ? roughnessMap : null,
        metalnessMap: useMetal ? metalnessMap : null,
        metalness: useMetal ? 0.9 : 0,
        roughness: useRough ? 0.9 : 0,
      });
      model.traverse(function (child: any) {
        // aka setTexture
        if (child instanceof THREE.Mesh) {
          // //@ts-ignore
          child.material = mat;
        }
      });
    }
    setModel(model);
  };

  const updatePcd = () => {
    if (model) {
      model.material.size = pcdSize;
    }
    setModel(model);
  };

  const load = (fileURL: string, rootPath: string, acceptedFiles: any, modelType: string) => {
    const baseURL = LoaderUtils.extractUrlBase(fileURL);

    return new Promise((resolve, reject) => {
      if (modelType === 'glb') {
        const loader = new GLTFLoader();
        loader.load(fileURL, (glb) => {
          const box = new Box3().setFromObject(glb.scene);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());
          const scaling = 10 / size;
          const moveVector = new THREE.Vector3(0, 0, 0)
            .clone()
            .sub(center)
            .multiply(new THREE.Vector3(scaling, scaling, scaling));
          glb.scene.scale.setScalar(scaling);
          glb.scene.position.add(moveVector);
          glb.scene.name = 'Usermesh';
          setModel(glb.scene);
        });
      } else if (modelType === 'obj') {
        let objDiffMap: any;
        const loader = new OBJLoader();
        loader.load(fileURL, (obj) => {
          const textureLoader = new TextureLoader();
          obj.traverse(function (child: any) {
            // aka setTexture
            if (child instanceof THREE.Mesh) {
              //@ts-ignore
              child.material.map = originDiffMap;
            }
          });

          // find image as diffusion map
          acceptedFiles.forEach((file: any) => {
            const assertType = getFileExtension(file.name);
            if (assertType === 'png' || assertType === 'jpg' || assertType === 'jpeg' || assertType === 'tga') {
              const PNGUrl = URL.createObjectURL(file);
              objDiffMap = textureLoader.load(PNGUrl);
              objDiffMap.encoding = THREE.sRGBEncoding;
              objDiffMap.name = file.name;
              setOriginDiffMap(objDiffMap);
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
          const scaling = 10 / size;
          const moveVector = new THREE.Vector3(0, 0, 0)
            .clone()
            .sub(center)
            .multiply(new THREE.Vector3(scaling, scaling, scaling));
          obj.scale.setScalar(scaling);
          obj.position.add(moveVector);
          obj.name = 'Usermesh';
          setModel(obj);
        });
      } else if (modelType === 'pcd') {
        const pcdLoader = new PCDLoader();
        pcdLoader.load(fileURL, function (points) {
          const box = new Box3().setFromObject(points);
          const size = box.getSize(new THREE.Vector3()).length();
          const scaling = 10 / size;
          points.scale.setScalar(scaling);
          points.geometry.center();
          points.geometry.rotateX(Math.PI);
          points.name = 'Usermesh';
          setModel(points);
        });
      }
    });
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    let rootFile: any;
    let rootPath: any;
    setFileType(null);
    setModel(null);

    const textureLoader = new TextureLoader();
    const defaltDiffMap = textureLoader.load('/polygonalModels/WhiteBoard.png');
    setOriginDiffMap(defaltDiffMap);

    acceptedFiles.forEach((file: any) => {
      if (file.name.match(/\.(gltf|glb|fbx|FBX|obj|OBJ|pcd|PCD)$/)) {
        rootFile = file;
        rootPath = file.path.replace(file.name, '');
        setFileName(file.name);
      }
    });
    const type = getFileExtension(rootFile.name) || '';
    setModelType(type);
    const fileURL = typeof rootFile === 'string' ? rootFile : URL.createObjectURL(rootFile);

    load(fileURL, rootPath, acceptedFiles, type);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <PanelAppear>
      <Typography variant="h6">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <Typography variant="subtitle1">Current Model: {fileName ?? 'None'}</Typography>
        <Divider />
        <br></br>
        <div
          {...getRootProps()}
          style={{ borderRadius: '0.5', background: '#333333', padding: '1em', textAlign: 'center' }}
        >
          <input {...getInputProps()} />
          <p style={{ color: '#dddddd' }}>
            Drop your file/folder here <br></br>or <br></br>Click to select file
          </p>
        </div>
        <br></br>
        <Divider />
        {modelType === 'obj' ? (
          <>
            <Typography variant="subtitle1">Adding Assert:</Typography>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  value="checkedA"
                  onChange={toggleUseDiffMap}
                  checked={useDiff}
                  disabled={!diffMap}
                />
              }
              //@ts-ignore
              label={diffMap && useDiff ? 'Diffuse Map:' + diffMap.name : 'Diffuse Map:' + originDiffMap.name}
            />
            <input type="file" onChange={handleDiffFileChange} />

            <FormControlLabel
              control={<Switch color="primary" value="checkedA" onChange={toggleUseNormalMap} disabled={!normalMap} />}
              label={normalMap && useNormal ? 'Normal Map:' + normalMap.name : 'Normal Map:' + ''}
            />
            <input type="file" onChange={handleNormalFileChange} />

            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  value="checkedA"
                  onChange={() => setUseMetal(!useMetal)}
                  disabled={!metalnessMap}
                />
              }
              label={metalnessMap && useMetal ? 'Matelness Map:' + metalnessMap.name : 'Matelness Map:' + ''}
            />
            <input type="file" onChange={handleMetalFileChange} />

            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  value="checkedA"
                  onChange={() => setUseRough(!useRough)}
                  disabled={!roughnessMap}
                />
              }
              label={roughnessMap && useRough ? 'Roughness Map:' + roughnessMap.name : 'Roughness Map:' + ''}
            />
            <input type="file" onChange={handleRoughFileChange} />
          </>
        ) : null}

        {modelType === 'pcd' ? (
          <div>
            <PanelSlider
              label={'Point Size (10^-3)'}
              value={pcdSize * 1000}
              step={1}
              min={1}
              max={50}
              onChange={(_, v): void => setPcdSize(+v / 1000)}
            />
          </div>
        ) : null}
      </FormGroup>
    </PanelAppear>
  );
};

export default UserMeshGUI;
