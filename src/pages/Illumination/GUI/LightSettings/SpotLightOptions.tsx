import { FormControlLabel, makeStyles, Slider, Switch } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useState } from 'react';

import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import { LabelWithValue } from '../../../../components/forms/LabelWithValue';
import { StyledDivider } from '../../../../components/layouts/StyledDivider';
import { Illumination } from '../../../../stores';

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    width: 100,
  },
  selected: {
    '&$selected': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

export const SpotLightOptions: React.FC = () => {
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const spotLight = Illumination.useStore((store: Illumination.Store) => store.state.lights.spot);
  const [position, setPosition] = useState<string>('left');

  function valuetext(value: number): string {
    return `${value}`;
  }

  const handleToggle = (event: React.MouseEvent<HTMLElement>, newValue: string): void => {
    setPosition(newValue);
    switch (newValue) {
      case 'left':
        actions.setLightPosition([0, 10, 5], Illumination.ESceneLight.SPOT);
        break;
      case 'top':
        actions.setLightPosition([0, 10, 0], Illumination.ESceneLight.SPOT);
        break;
      case 'right':
        actions.setLightPosition([0, 10, -5], Illumination.ESceneLight.SPOT);
        break;

      default:
        break;
    }
  };

  const classes = useStyles();
  return (
    <div style={{ maxHeight: '350px', overflowY: 'scroll' }}>
      <ColorSelector
        caption="light color"
        activeColor={spotLight.color}
        onColorChange={(color): void => actions.setLightColor(color, Illumination.ESceneLight.SPOT)}
      />

      <StyledDivider />

      <LabelWithValue label={'Position'} value={''} />
      <div style={{ marginBottom: '1em' }}>
        <ToggleButtonGroup exclusive size="small" onChange={handleToggle}>
          <ToggleButton
            selected={position === 'left'}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value="left"
          >
            Left
          </ToggleButton>
          <ToggleButton
            selected={position === 'top'}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value="top"
          >
            Top
          </ToggleButton>
          <ToggleButton
            selected={position === 'right'}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value="right"
          >
            Right
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <StyledDivider />
      <LabelWithValue label={'Intensity'} value={spotLight.intensity} />
      <Slider
        value={spotLight.intensity}
        getAriaValueText={valuetext}
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => actions.setLightIntensity(+v, Illumination.ESceneLight.SPOT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Distance'} value={spotLight.distance} />
      <Slider
        value={spotLight.distance}
        getAriaValueText={valuetext}
        step={2}
        min={2}
        max={40}
        marks
        onChange={(_, v): void => actions.setLightDistance(+v, Illumination.ESceneLight.SPOT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Angle'} value={spotLight.angle.toPrecision(2)} />
      <Slider
        value={spotLight.angle}
        getAriaValueText={valuetext}
        step={0.2}
        min={0}
        max={Math.PI / 2}
        marks
        onChange={(_, v): void => actions.setLightAngle(+v, Illumination.ESceneLight.SPOT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Penumbra'} value={spotLight.penumbra.toPrecision(2)} />
      <Slider
        value={spotLight.penumbra}
        getAriaValueText={valuetext}
        step={0.1}
        min={0}
        max={1}
        marks
        onChange={(_, v): void => actions.setLightPenumbra(+v, Illumination.ESceneLight.SPOT)}
      />

      <StyledDivider />
      <LabelWithValue label={'Decay'} value={spotLight.decay.toPrecision(2)} />
      <Slider
        value={spotLight.decay}
        getAriaValueText={valuetext}
        step={0.2}
        min={0}
        max={2}
        marks
        onChange={(_, v): void => actions.setLightDecay(+v, Illumination.ESceneLight.SPOT)}
      />

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={spotLight.showHelper}
            onChange={(): void => actions.toggleLightHelper(Illumination.ESceneLight.SPOT)}
            value="checkedA"
          />
        }
        label="Toggle Light Helper"
      />
    </div>
  );
};
