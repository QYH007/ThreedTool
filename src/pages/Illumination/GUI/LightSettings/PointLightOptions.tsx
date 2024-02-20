import { FormControlLabel, Slider, Switch } from '@material-ui/core';
import React from 'react';

import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import { LabelWithValue } from '../../../../components/forms/LabelWithValue';
import { StyledDivider } from '../../../../components/layouts/StyledDivider';
import { Illumination } from '../../../../stores';

export const PointLightOptions = (): JSX.Element => {
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const light = Illumination.useStore((store: Illumination.Store) => store.state.lights.point);

  function valuetext(value: number): string {
    return `${value}`;
  }

  return (
    <>
      <ColorSelector
        caption="light color"
        activeColor={light.color}
        onColorChange={(color): void => actions.setLightColor(color, Illumination.ESceneLight.POINT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Intensity'} value={light.intensity} />
      <Slider
        value={light.intensity}
        getAriaValueText={valuetext}
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => actions.setLightIntensity(+v, Illumination.ESceneLight.POINT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Distance'} value={light.distance} />
      <Slider
        value={light.distance}
        getAriaValueText={valuetext}
        step={1}
        min={0}
        max={30}
        marks
        onChange={(_, v): void => actions.setLightDistance(+v, Illumination.ESceneLight.POINT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Decay'} value={light.decay} />
      <Slider
        value={light.decay}
        getAriaValueText={valuetext}
        step={0.25}
        min={0}
        max={2}
        marks
        onChange={(_, v): void => actions.setLightDecay(+v, Illumination.ESceneLight.POINT)}
      />

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={light.showHelper}
            onChange={(): void => actions.toggleLightHelper(Illumination.ESceneLight.POINT)}
            value="checkedA"
          />
        }
        label="Toggle Light Helper"
      />

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={light.moveLights}
            onChange={(): void => actions.toggleLightMovement(Illumination.ESceneLight.POINT)}
            value="checkedA"
          />
        }
        label="Move Lights"
      />
    </>
  );
};
