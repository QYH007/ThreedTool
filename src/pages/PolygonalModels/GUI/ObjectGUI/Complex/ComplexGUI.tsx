import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import { PolygonalModels } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';
import { Divider } from '@material-ui/core';

interface Props {
  model: PolygonalModels.ComplexModel;
}

const ComplexGUI: React.FC<Props> = ({ model }) => {
  const activeObject = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.activeObject);
  const actions = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset
        type={
          model.type === PolygonalModels.EComplexModel.BUNNY
            ? PolygonalModels.ESceneObject.Bunny
            : PolygonalModels.ESceneObject.World
        }
      />
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        {model.type === PolygonalModels.EComplexModel.BUNNY ? (
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={model.isVisible}
                onChange={(): void => actions.toggleComplexVisible(model.type)}
              />
            }
            label="Mesh Visible"
          />
        ) : null}
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={model.isWireframe}
              onChange={(): void => actions.toggleComplexWireframe(model.type)}
              value="checkedA"
            />
          }
          label="Wireframe"
        />
        {model.type === PolygonalModels.EComplexModel.BUNNY ? (
          <>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={model.isFlat}
                  onChange={(): void => actions.toggleComplexFlat(model.type)}
                />
              }
              label="Flat Shading"
            />
            <Divider></Divider>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={model.isFaceNormals}
                  onChange={(): void => actions.toggleComplexFaceNormals(model.type)}
                />
              }
              label="Normals"
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={model.isPointClouds}
                  onChange={(): void => actions.toggleComplexPointClouds(model.type)}
                />
              }
              label="PointClouds"
            />
          </>
        ) : null}
      </FormGroup>
    </PanelAppear>
  );
};

export default ComplexGUI;
