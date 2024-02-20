import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PolygonalModels } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';

const SphereGUI: React.FC = () => {
  const sphere = PolygonalModels.useStore((state: PolygonalModels.State) => state.sphere);
  const activeObject = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.activeObject);
  const actions = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PolygonalModels.ESceneObject.Sphere} />
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isVisible}
              onChange={(): void => actions.toggleSphereVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isWireframe}
              onChange={(): void => actions.toggleSphereWireframe()}
              value="checkedA"
            />
          }
          label="Wireframe"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isFlat}
              onChange={(): void => actions.toggleSphereFlatShading()}
              value="checkedA"
            />
          }
          label="Flat Shading"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isFaceNormals}
              onChange={(): void => actions.toggleSphereFaceNormals()}
              value="checkedA"
            />
          }
          label="Face Normals"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isVertexNormals}
              onChange={(): void => actions.toggleSphereVertexNormals()}
              value="checkedA"
            />
          }
          label="Vertex Normals"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        label={'Radius'}
        value={sphere.radius}
        step={0.5}
        min={sphere.minRadius}
        max={sphere.maxRadius}
        onChange={(_, v): void => actions.setSphereRadius(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Height Segments'}
        value={sphere.heightSegments}
        step={1}
        min={sphere.minHeightSegments}
        max={sphere.maxHeightSegments}
        onChange={(_, v): void => actions.setSphereHeightSegments(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Width Segments'}
        value={sphere.widthSegments}
        step={1}
        min={sphere.minWidthSegments}
        max={sphere.maxWidthSegments}
        onChange={(_, v): void => actions.setSphereWidthSegments(+v)}
      />
    </PanelAppear>
  );
};

export default SphereGUI;
