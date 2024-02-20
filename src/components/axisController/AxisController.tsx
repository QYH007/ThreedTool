import { makeStyles, Paper, Slider, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import create from 'zustand';

import { LabelWithValue } from '../forms/LabelWithValue';

const MIN_X = -10;
const MAX_X = 10;
const MIN_Y = -10;
const MAX_Y = 10;
const MIN_Z = -10;
const MAX_Z = 10;
const SLIDER_STEP = 0.01;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    padding: theme.spacing(2, 2),
  },
}));

type AxisControllerStore = {
  position: number[];
  setPosition: (newPos: number[]) => void;
};

export const useAxisControllerStore = create<AxisControllerStore>((set) => ({
  position: [0, 0, 0],
  setPosition: (newPos: number[]) => set({ position: newPos }),
}));

export const api = useAxisControllerStore.getState();

const AxisController = (): JSX.Element => {
  const setPosition = useAxisControllerStore((state) => state.setPosition);
  const position = useAxisControllerStore((state) => state.position);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const handleXChange = (_: React.ChangeEvent<{}>, value: number | number[]): void => {
    setX(value as number);
    setPosition([value as number, y, z]);
  };

  const handleYChange = (_: React.ChangeEvent<{}>, value: number | number[]): void => {
    setY(value as number);
    setPosition([x, value as number, z]);
  };

  const handleZChange = (_: React.ChangeEvent<{}>, value: number | number[]): void => {
    setZ(value as number);
    setPosition([x, y, value as number]);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">Texture Position</Typography>
      <div>
        <LabelWithValue value={position[0]} label={'X Position'} />
        <Slider value={position[0]} step={SLIDER_STEP} min={MIN_X} max={MAX_X} onChange={handleXChange} />
        <LabelWithValue value={position[1]} label={'Y Position'} />
        <Slider value={position[1]} step={SLIDER_STEP} min={MIN_Y} max={MAX_Y} onChange={handleYChange} />
        <LabelWithValue value={position[2]} label={'Z Position'} />
        <Slider value={position[2]} step={SLIDER_STEP} min={MIN_Z} max={MAX_Z} onChange={handleZChange} />
      </div>
    </Paper>
  );
};

export default AxisController;
