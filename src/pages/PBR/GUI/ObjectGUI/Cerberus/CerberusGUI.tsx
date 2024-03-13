import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PBR } from '../../../../../stores';
import ScenePicker from '../../ScenePicker';

const CerberusGUI: React.FC = () => {
  const scene = PBR.useStore((state: PBR.State) => state.scene);
  const cerberus = PBR.useStore((state: PBR.State) => state.cerberus);
  const activeObject = PBR.useStore((state: PBR.State) => state.scene.activeObject);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <PanelAppear>
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={cerberus.isVisible}
              onChange={(): void => actions.toggleCerberusVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={scene.moveLight}
              onChange={(): void => actions.toggleMovingLight()}
              value="checkedA"
            />
          }
          label="Moving Point Light"
        />
        <ScenePicker />
        <Divider />

        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={cerberus.colorMap}
              onChange={(): void => actions.toggleCerberusColorMap()}
              value="checkedB"
            />
          }
          label="Toggle DisffusionMap"
        />

        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={cerberus.metalnessMap}
              onChange={(): void => actions.toggleCerberusMetalnessMap()}
              value="checkedC"
            />
          }
          label="Toggle MetalnessMap"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={cerberus.roughnessMap}
              onChange={(): void => actions.toggleCerberusRoughnessMap()}
              value="checkedD"
            />
          }
          label="Toggle RoughnessMap"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={cerberus.normalMap}
              onChange={(): void => actions.toggleCerberusNormalMap()}
              value="checkedE"
            />
          }
          label="Toggle normalMap"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        label={'Metalness'}
        value={cerberus.metalness}
        step={0.05}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setCerberusMetalness(+v)}
      />
      <PanelSlider
        label={'Roughness'}
        value={cerberus.roughness}
        step={0.05}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setCerberusRoughness(+v)}
      />
    </PanelAppear>
  );
};

export default CerberusGUI;
