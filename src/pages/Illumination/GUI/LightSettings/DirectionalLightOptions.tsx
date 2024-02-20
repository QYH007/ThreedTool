import { FormControlLabel, Slider, Switch } from '@material-ui/core';
import React from 'react';

import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import { LabelWithValue } from '../../../../components/forms/LabelWithValue';
import { StyledDivider } from '../../../../components/layouts/StyledDivider';
import { Illumination } from '../../../../stores';

export const DirectionalLightOptions = (): JSX.Element => {
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const light = Illumination.useStore((store: Illumination.Store) => store.state.lights.directional);

  function valuetext(value: number): string {
    return `${value}`;
  }

  return (
    <>
      <ColorSelector
        caption="light color"
        activeColor={light.color}
        onColorChange={(color): void => actions.setLightColor(color, Illumination.ESceneLight.DIRECTIONAL)}
      />
      <StyledDivider />
      <LabelWithValue label={'Intensity'} value={light.intensity} />
      <Slider
        value={light.intensity}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => actions.setLightIntensity(+v, Illumination.ESceneLight.DIRECTIONAL)}
      />
      <StyledDivider />
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={light.showHelper}
            onChange={(): void => actions.toggleLightHelper(Illumination.ESceneLight.DIRECTIONAL)}
            value="checkedA"
          />
        }
        label="Light Helper"
      />
    </>
  );
};
