import { Box, Button, makeStyles, Slider, Tooltip, Typography } from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { ReactElement } from 'react';

import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import { LabelWithValue } from '../../../../components/forms/LabelWithValue';
import { StyledDivider } from '../../../../components/layouts/StyledDivider';
import { Illumination } from '../../../../stores';
import { PlaneVisibilityToggle } from '../PlaneVisibilityToggle/PlaneVisibilityToggle';

const useStyles = makeStyles((theme) => ({
  toggleButton: {
    width: 105,
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

export function GlobalOptions(): ReactElement {
  const backgroundColor = Illumination.useStore((store: Illumination.Store) => store.state.scene.backgroundColor);
  const globals = Illumination.useStore((store: Illumination.Store) => store.state.globals);
  const settingName = Illumination.useStore((store: Illumination.Store) => store.default.name);

  const setBackgroundColor = Illumination.useStore((store: Illumination.Store) => store.actions.setBackgroundColor);
  const resetState = Illumination.useStore((store: Illumination.Store) => store.actions.resetState);
  const resetLights = Illumination.useStore((store: Illumination.Store) => store.actions.resetLights);
  const resetObjects = Illumination.useStore((store: Illumination.Store) => store.actions.resetObjects);
  const setShaderTerm = Illumination.useStore((store: Illumination.Store) => store.actions.setShaderTerm);
  const setShadingModel = Illumination.useStore((store: Illumination.Store) => store.actions.setGlobalShadingModel);

  function valuetext(value: number): string {
    return `${value}`;
  }

  const handleToggle = (event: React.MouseEvent<HTMLElement>, newValue: Illumination.EShadingModel | string): void => {
    if (newValue === 'flat') {
      setShadingModel(Illumination.EShadingModel.PHONG, true);
    } else {
      setShadingModel(newValue as Illumination.EShadingModel);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <Box textAlign="center">
        <Typography variant="caption" color="textSecondary">
          current base setting: <span style={{ fontWeight: 'bold' }}>{settingName}</span>
        </Typography>
      </Box>
      <ColorSelector
        caption="background color"
        activeColor={backgroundColor}
        onColorChange={(color): void => setBackgroundColor(color)}
        bgColor={true}
      />
      <StyledDivider />

      <div style={{ marginBottom: '1em' }}>
        <ToggleButtonGroup exclusive size="small" onChange={handleToggle}>
          <ToggleButton
            selected={globals.shadingModel === Illumination.EShadingModel.GOURAUD}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value={Illumination.EShadingModel.GOURAUD}
          >
            GOURAUD
          </ToggleButton>
          <ToggleButton
            selected={globals.shadingModel === Illumination.EShadingModel.PHONG}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value={Illumination.EShadingModel.PHONG}
          >
            PHONG
          </ToggleButton>
          <ToggleButton
            selected={globals.shadingModel === 'flat'}
            classes={{
              selected: classes.selected,
            }}
            className={classes.toggleButton}
            value={'flat'}
          >
            FLAT
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <StyledDivider />

      <LabelWithValue label={'Global Ambient'} value={globals.ambient} />
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        value={globals.ambient}
        onChange={(_, v): void => {
          setShaderTerm(Illumination.ShaderTerm.AMBIENT, +v);
        }}
      />
      <StyledDivider />
      <LabelWithValue label={'Global Diffuse'} value={globals.diffuse} />
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        value={globals.diffuse}
        onChange={(_, v): void => {
          setShaderTerm(Illumination.ShaderTerm.DIFFUSE, +v);
        }}
      />

      <StyledDivider />
      <LabelWithValue label={'Global Specular'} value={globals.specular} />
      <Slider
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        min={0}
        max={1}
        marks
        value={globals.specular}
        onChange={(_, v): void => {
          setShaderTerm(Illumination.ShaderTerm.SPECULAR, +v);
        }}
      />

      <StyledDivider />
      <div style={{ marginBottom: '1em' }}>
        <Typography gutterBottom>Resets</Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tooltip title="reset all lights to the default">
            <Button startIcon={<RotateLeftIcon />} size="small" onClick={(): void => resetLights()} variant="outlined">
              lights
            </Button>
          </Tooltip>
          <Tooltip title="reset all object to the default">
            <Button
              startIcon={<RotateLeftIcon />}
              size="small"
              onClick={(): void => {
                resetObjects();
              }}
              variant="outlined"
            >
              objects
            </Button>
          </Tooltip>
          <Tooltip title="reset everything to the default">
            <Button
              startIcon={<RotateLeftIcon />}
              size="small"
              onClick={(): void => {
                resetState();
              }}
              variant="outlined"
            >
              all
            </Button>
          </Tooltip>
        </div>
      </div>
      <StyledDivider />
      <div>
        <PlaneVisibilityToggle />
      </div>
    </div>
  );
}
