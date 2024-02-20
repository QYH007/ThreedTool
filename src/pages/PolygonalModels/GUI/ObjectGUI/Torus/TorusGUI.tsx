import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PolygonalModels } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';

const TorusGUI: React.FC = () => {
  const torus = PolygonalModels.useStore((state: PolygonalModels.State) => state.torus);
  const activeObject = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.activeObject);
  const actions = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PolygonalModels.ESceneObject.Torus} />
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isVisible}
              onChange={(): void => actions.toggleTorusVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isWireframe}
              onChange={(): void => actions.toggleTorusWireframe()}
              value="checkedA"
            />
          }
          label="Wireframe"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isFlat}
              onChange={(): void => actions.toggleTorusFlatShading()}
              value="checkedA"
            />
          }
          label="Flat Shading"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isFaceNormals}
              onChange={(): void => actions.toggleTorusFaceNormals()}
              value="checkedA"
            />
          }
          label="Face Normals"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isVertexNormals}
              onChange={(): void => actions.toggleTorusVertexNormals()}
              value="checkedA"
            />
          }
          label="Vertex Normals"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        label={'Radius'}
        value={torus.radius}
        step={0.5}
        min={torus.minRadius}
        max={torus.maxRadius}
        onChange={(_, v): void => actions.setTorusRadius(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Tube Width'}
        value={torus.tubeWidth}
        step={0.1}
        min={torus.minTubeWidth}
        max={torus.maxTubeWidth}
        onChange={(_, v): void => actions.setTorusTubeWidth(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Radial Segments'}
        value={torus.radialSegments}
        step={1}
        min={torus.minRadialSegments}
        max={torus.maxRadialSegments}
        onChange={(_, v): void => actions.setTorusRadialSegments(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Tubular Segments'}
        value={torus.tubularSegments}
        step={1}
        min={torus.minTubularSegments}
        max={torus.maxTubularSegments}
        onChange={(_, v): void => actions.setTorusTubularSegments(+v)}
      />
    </PanelAppear>
  );
};

export default TorusGUI;
