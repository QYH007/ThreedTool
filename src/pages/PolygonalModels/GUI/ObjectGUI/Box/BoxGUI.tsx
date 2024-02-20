import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PolygonalModels } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';

const BoxGUI: React.FC = () => {
  const box = PolygonalModels.useStore((state: PolygonalModels.State) => state.box);
  const activeObject = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene.activeObject);
  const actions = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PolygonalModels.ESceneObject.Box} />
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={box.isVisible}
              onChange={(): void => actions.toggleBoxVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={box.isWireframe}
              onChange={(): void => actions.toggleBoxWireframe()}
              value="checkedA"
            />
          }
          label="Wireframe"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={box.isFaceNormals}
              onChange={(): void => actions.toggleBoxFaceNormals()}
              value="checkedA"
            />
          }
          label="Face Normals"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={box.isVertexNormals}
              onChange={(): void => actions.toggleBoxVertexNormals()}
              value="checkedA"
            />
          }
          label="Vertex Normals"
        />
      </FormGroup>

      <Divider />

      <PanelSlider
        label={'Height'}
        value={box.height}
        step={1}
        min={box.minHeight}
        max={box.maxHeight}
        onChange={(_, v): void => actions.setBoxHeight(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Width'}
        value={box.width}
        step={1}
        min={box.minWidth}
        max={box.maxWidth}
        onChange={(_, v): void => actions.setBoxWidth(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Depth'}
        value={box.depth}
        step={1}
        min={box.minDepth}
        max={box.maxDepth}
        onChange={(_, v): void => actions.setBoxDepth(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Width Segments'}
        value={box.widthSegments}
        step={1}
        min={box.minWidthSegments}
        max={box.maxWidthSegments}
        onChange={(_, v): void => actions.setBoxWidthSegments(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Height Segments'}
        value={box.heightSegments}
        step={1}
        min={box.minHeightSegments}
        max={box.maxHeightSegments}
        onChange={(_, v): void => actions.setBoxHeightSegments(+v)}
      />

      <Divider />

      <PanelSlider
        label={'Depth Segments'}
        value={box.depthSegments}
        step={1}
        min={box.minDepthSegments}
        max={box.maxDepthSegments}
        onChange={(_, v): void => actions.setBoxDepthSegments(+v)}
      />
    </PanelAppear>
  );
};

export default BoxGUI;
