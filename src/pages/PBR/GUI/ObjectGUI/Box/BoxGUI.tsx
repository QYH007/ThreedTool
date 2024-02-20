import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PBR } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';

const BoxGUI: React.FC = () => {
  const box = PBR.useStore((state: PBR.State) => state.box);
  const activeObject = PBR.useStore((state: PBR.State) => state.scene.activeObject);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PBR.ESceneObject.Box} />
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

      <PanelSlider
        label={'Width'}
        value={box.width}
        step={1}
        min={box.minWidth}
        max={box.maxWidth}
        onChange={(_, v): void => actions.setBoxWidth(+v)}
      />

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
        label={'Metalness'}
        value={box.metalness}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setBoxMetalness(+v)}
      />
      <PanelSlider
        label={'Roughness'}
        value={box.roughness}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setBoxRoughness(+v)}
      />
    </PanelAppear>
  );
};

export default BoxGUI;
