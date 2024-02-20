import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { AO } from '../../../../../stores';

const ComplexGUI: React.FC = () => {
  const complex = AO.useStore((state: AO.State) => state.complex);
  const actions = AO.useStore((state: AO.State) => state.actions);

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
    </PanelAppear>
  );
};

export default ComplexGUI;
