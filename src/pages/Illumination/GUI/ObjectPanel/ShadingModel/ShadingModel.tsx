/* eslint-disable @typescript-eslint/naming-convention */
import { FormControlLabel, Slider, Switch } from '@material-ui/core';
import React from 'react';

import { LabelWithValue } from '../../../../../components/forms/LabelWithValue';
import { StyledDivider } from '../../../../../components/layouts/StyledDivider';
import { Illumination } from '../../../../../stores';

interface Props {
  objectData: Illumination.SceneObject;
}

export const ShadingModel: React.FC<Props> = ({ objectData }) => {
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);

  const shadingModel = objectData.shadingModel;

  function valuetext(value: number): string {
    return `${value}`;
  }

  return (
    <>
      <LabelWithValue label={'Ka (ambient)'} value={objectData.shadingParameters[shadingModel].k_a} />
      <Slider
        value={objectData.shadingParameters[shadingModel].k_a}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => {
          actions.setShadingParams(
            objectData.id,
            objectData.type,
            {
              ...objectData.shadingParameters[shadingModel],
              k_a: +v,
            },
            shadingModel,
          );
        }}
      />

      <StyledDivider />

      <LabelWithValue label={'Kd (diffuse)'} value={objectData.shadingParameters[shadingModel].k_d} />
      <Slider
        value={objectData.shadingParameters[shadingModel].k_d}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => {
          actions.setShadingParams(
            objectData.id,
            objectData.type,
            {
              ...objectData.shadingParameters[shadingModel],
              k_d: +v,
            },
            shadingModel,
          );
        }}
      />

      <StyledDivider />

      <LabelWithValue label={'Ks (specular)'} value={objectData.shadingParameters[shadingModel].k_s} />
      <Slider
        value={objectData.shadingParameters[shadingModel].k_s}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => {
          actions.setShadingParams(
            objectData.id,
            objectData.type,
            {
              ...objectData.shadingParameters[shadingModel],
              k_s: +v,
            },
            shadingModel,
          );
        }}
      />

      <StyledDivider />

      <LabelWithValue label={'α (shininess)'} value={objectData.shadingParameters[shadingModel].alpha_s} />
      <Slider
        value={objectData.shadingParameters[shadingModel].alpha_s}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1.0}
        min={1.0}
        max={200}
        onChange={(_, v): void => {
          actions.setShadingParams(
            objectData.id,
            objectData.type,
            {
              ...objectData.shadingParameters[shadingModel],
              alpha_s: +v,
            },
            shadingModel,
          );
        }}
      />

      {/* Show a toggle button if the shading model is PHONG */}
      {objectData.shadingModel === Illumination.EShadingModel.PHONG ? (
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={objectData.shadingParameters[shadingModel].flat}
              value="checkedA"
              onChange={(): void => {
                actions.setShadingParams(
                  objectData.id,
                  objectData.type,
                  {
                    ...objectData.shadingParameters[shadingModel],
                    flat: !objectData.shadingParameters[shadingModel].flat,
                  },
                  shadingModel,
                );
              }}
            />
          }
          label="Flat Shaded"
        />
      ) : null}
    </>
  );
};
