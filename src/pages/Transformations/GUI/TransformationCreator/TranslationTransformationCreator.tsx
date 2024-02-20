import { Chip, createStyles, Fab, Grid, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';

import { Transformations } from '../../../../stores';
import { TooManyTransformationMessage } from './TooManyTransformationMessage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 0),
    },
    axis: {
      margin: '0 8px',
      fontWeight: 800,
    },
    sliderRow: {
      marginBottom: '1em',
    },
    optionsSection: {
      height: 150,
    },
    buttonSection: {
      heigh: 30,
    },
  }),
);

const TranslationTransformationCreator: React.FC = () => {
  const addTransformation = Transformations.useStore((state) => state.actions.addTransformation);
  const updateTransformation = Transformations.useStore((state) => state.actions.updateTransformation);
  const translationInCreation = Transformations.useStore((state) => state.inCreation.translation);
  const existingTransformations = Transformations.useStore((state) => state.activeObject.transformations);

  const [valueX, setValueX] = useState<number | number[]>();
  const [valueY, setValueY] = useState<number | number[]>();
  const [valueZ, setValueZ] = useState<number | number[]>();

  useEffect(() => {
    setValueX(translationInCreation.x);
    setValueY(translationInCreation.y);
    setValueZ(translationInCreation.z);
  }, [translationInCreation]);

  const handleOnChangeCommited = (params: Transformations.TransformationParameters): void => {
    updateTransformation(params, Transformations.ETransformationType.TRANSLATION);
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
                  x: +v,
                  y: translationInCreation.y,
                  z: translationInCreation.z,
                })
              }
              defaultValue={translationInCreation.x}
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
              <Chip label={translationInCreation.x} />
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------- */}
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
              defaultValue={translationInCreation.y}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={-3}
              max={3}
              onChangeCommitted={(e, v): void =>
                handleOnChangeCommited({
                  x: translationInCreation.x,
                  y: +v,
                  z: translationInCreation.z,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-end">
              <Chip label={translationInCreation.y} />
            </Grid>
          </Grid>
        </Grid>
        {/* -------------------------------------------- */}
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
              defaultValue={translationInCreation.z}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={-3}
              max={3}
              onChangeCommitted={(e, v): void =>
                handleOnChangeCommited({
                  x: translationInCreation.x,
                  y: translationInCreation.y,
                  z: +v,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-end">
              <Chip label={translationInCreation.z} />
            </Grid>
          </Grid>
        </Grid>
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
                  x: translationInCreation.x,
                  y: translationInCreation.y,
                  z: translationInCreation.z,
                },
                Transformations.ETransformationType.TRANSLATION,
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

export default TranslationTransformationCreator;
