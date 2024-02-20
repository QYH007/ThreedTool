import { Chip, createStyles, Fab, Grid, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ToggleButton from '@material-ui/lab/ToggleButton';
import React, { useEffect, useState } from 'react';

import { Transformations } from '../../../../stores';
import { Axis } from '../../../../types/common';
import { TooManyTransformationMessage } from './TooManyTransformationMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
    },
    axis: {
      margin: '0 8px',
    },
    sliderRow: {
      margin: theme.spacing(2, 0),
    },
    optionsSection: {
      height: 150,
    },
    buttonSection: {
      heigh: 30,
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
  }),
);

const ShearshearInCreationationCreator: React.FC = () => {
  const addTransformation = Transformations.useStore((state) => state.actions.addTransformation);
  const updateTransformation = Transformations.useStore((state) => state.actions.updateTransformation);
  const shearInCreation = Transformations.useStore((state) => state.inCreation.shear);
  const existingTransformations = Transformations.useStore((state) => state.activeObject.transformations);

  const [valueX, setValueX] = useState<number | number[]>();
  const [valueY, setValueY] = useState<number | number[]>();
  const [valueZ, setValueZ] = useState<number | number[]>();

  const [selectedAxis, setSelectedAxis] = useState<Axis>(Axis.X);

  useEffect(() => {
    setValueX(shearInCreation.x);
    setValueY(shearInCreation.y);
    setValueZ(shearInCreation.z);
  }, [shearInCreation]);

  useEffect(() => {
    updateTransformation({ x: 0, y: 0, z: 0 }, Transformations.ETransformationType.SHEAR);
  }, [selectedAxis, updateTransformation]);

  const handleOnChangeCommited = (params: Transformations.TransformationParameters): void => {
    updateTransformation(params, Transformations.ETransformationType.SHEAR);
  };

  const handleXSliderChange = (event: any, newValue: number | number[]): void => {
    setValueX(newValue);
  };
  const handleYSliderChange = (event: any, newValue: number | number[]): void => {
    setValueY(newValue);
  };
  const handleZSliderChange = (event: any, newValue: number | number[]): void => {
    setValueZ(newValue);
  };

  const valuetext = (v: number): string => v.toString();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.optionsSection}>
        <Grid container justify="space-evenly">
          <ToggleButton
            size="small"
            classes={{
              selected: classes.selected,
            }}
            value="check"
            selected={selectedAxis === Axis.X}
            onChange={(): void => setSelectedAxis(Axis.X)}
          >
            <Typography className={classes.axis}>X-Shear</Typography>
          </ToggleButton>
          <ToggleButton
            size="small"
            classes={{
              selected: classes.selected,
            }}
            value="check"
            selected={selectedAxis === Axis.Y}
            onChange={(): void => setSelectedAxis(Axis.Y)}
          >
            <Typography className={classes.axis}>Y-Shear</Typography>
          </ToggleButton>
          <ToggleButton
            size="small"
            classes={{
              selected: classes.selected,
            }}
            value="check"
            selected={selectedAxis === Axis.Z}
            onChange={(): void => setSelectedAxis(Axis.Z)}
          >
            <Typography className={classes.axis}>Z-Shear</Typography>
          </ToggleButton>
        </Grid>

        {/* -------------------------------------------- */}
        {selectedAxis !== Axis.X && (
          <Grid container justify="center" alignItems="center" className={classes.sliderRow}>
            <Grid item xs={2}>
              <Grid container alignItems="center">
                <Typography variant="h6" className={classes.axis}>
                  X
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Slider
                value={typeof valueX === 'number' ? valueX : 0}
                onChange={handleXSliderChange}
                onChangeCommitted={(e, v): void =>
                  handleOnChangeCommited({
                    axis: selectedAxis,
                    x: +v,
                    y: shearInCreation.y,
                    z: shearInCreation.z,
                  })
                }
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={-3}
                max={3}
              />
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Chip label={shearInCreation.x} />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* -------------------------------------------- */}
        {selectedAxis !== Axis.Y && (
          <Grid container justify="center" alignItems="center" className={classes.sliderRow}>
            <Grid item xs={2}>
              <Grid container alignItems="center">
                <Typography variant="h6" className={classes.axis}>
                  Y
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={typeof valueY === 'number' ? valueY : 0}
                onChange={handleYSliderChange}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={-3}
                max={3}
                onChangeCommitted={(e, v): void =>
                  handleOnChangeCommited({
                    axis: selectedAxis,
                    x: shearInCreation.x,
                    y: +v,
                    z: shearInCreation.z,
                  })
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Chip label={shearInCreation.y} />
              </Grid>
            </Grid>
          </Grid>
        )}
        {/* -------------------------------------------- */}
        {selectedAxis !== Axis.Z && (
          <Grid container justify="center" alignItems="center" className={classes.sliderRow}>
            <Grid item xs={2}>
              <Grid container alignItems="center">
                <Typography variant="h6" className={classes.axis}>
                  Z
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={typeof valueZ === 'number' ? valueZ : 0}
                onChange={handleZSliderChange}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={-3}
                max={3}
                onChangeCommitted={(e, v): void =>
                  handleOnChangeCommited({
                    axis: selectedAxis,
                    x: shearInCreation.x,
                    y: shearInCreation.y,
                    z: +v,
                  })
                }
              />
            </Grid>
            <Grid item xs={2}>
              <Grid container justify="flex-end">
                <Chip label={shearInCreation.z} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <div className={classes.buttonSection}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Fab
            disabled={existingTransformations.length >= 5}
            variant="extended"
            color="secondary"
            aria-label="reset"
            onClick={(): void =>
              addTransformation(
                {
                  axis: selectedAxis,
                  x: shearInCreation.x,
                  y: shearInCreation.y,
                  z: shearInCreation.z,
                },
                Transformations.ETransformationType.SHEAR,
              )
            }
          >
            <AddIcon /> Add
          </Fab>
          {existingTransformations.length >= 5 && <TooManyTransformationMessage />}
        </Grid>
      </div>
    </div>
  );
};

export default ShearshearInCreationationCreator;
