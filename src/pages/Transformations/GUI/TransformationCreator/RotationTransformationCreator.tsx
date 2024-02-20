import { createStyles, Fab, Grid, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
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
      fontWeight: 800,
    },
    toggleButton: {
      height: 40,
      width: 40,
      marginBottom: 3,
    },
    footer: {
      position: 'relative',
    },
    optionsSection: {
      height: 150,
    },
    buttonSection: {
      heigh: 30,
    },
    slider: {
      padding: '0 1em',
    },
    gridItem: {
      marginTop: '1em',
    },
    negativeToggleButton: {
      marginLeft: '3em',
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

interface Mark {
  value: number;
  label: string;
}

const getMarks = (negative: boolean): Mark[] => [
  {
    value: 0,
    label: !negative ? '0°' : '-0°',
  },
  {
    value: 90,
    label: !negative ? '90°' : '-90°',
  },
  {
    value: 180,
    label: !negative ? '180°' : '-180°',
  },
  {
    value: 270,
    label: !negative ? '270°' : '-270°',
  },
  {
    value: 360,
    label: !negative ? '360°' : '-360°',
  },
];

const RotationTransformationCreator: React.FC = () => {
  const addTransformation = Transformations.useStore((state) => state.actions.addTransformation);
  const updateTransformation = Transformations.useStore((state) => state.actions.updateTransformation);
  const rotationInCreation = Transformations.useStore((state) => state.inCreation.rotation);
  const existingTransformations = Transformations.useStore((state) => state.activeObject.transformations);

  const [selectedAxis, setSelectedAxis] = useState<Axis>(Axis.X);

  const [angle, setAngle] = useState<any>(0);
  const [negative, setNegative] = useState(1);
  const [marks, setMarks] = useState(getMarks(false));

  const handleNegativeToggle = (): void => {
    setNegative(negative * -1);
  };

  const handleOnChangeCommited = (params: Transformations.TransformationParameters): void => {
    updateTransformation(params, Transformations.ETransformationType.ROTATION);
  };

  const handleOnChange = (event: any, newValue: any): void => {
    setAngle(newValue);
  };

  useEffect(() => {
    // everytime the negative toggle button is pressed,
    // set new marks for the slider
    setMarks(getMarks(negative === -1));
  }, [negative]);

  const valuetext = (v: number): string => v.toString();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.optionsSection}>
        <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" justify="center" align-items="center">
              <Grid item xs={3}>
                <Typography variant="h6" className={classes.axis}>
                  Axis
                </Typography>
              </Grid>

              <Grid item xs={9}>
                <Grid container alignItems="center" justify="space-evenly">
                  <ToggleButton
                    classes={{
                      selected: classes.selected,
                    }}
                    size="small"
                    value="check"
                    selected={selectedAxis === Axis.X}
                    onChange={(): void => setSelectedAxis(Axis.X)}
                    className={classes.toggleButton}
                  >
                    <Typography className={classes.axis}>X</Typography>
                  </ToggleButton>
                  <ToggleButton
                    classes={{
                      selected: classes.selected,
                    }}
                    size="small"
                    value="check"
                    selected={selectedAxis === Axis.Y}
                    onChange={(): void => setSelectedAxis(Axis.Y)}
                    className={classes.toggleButton}
                  >
                    <Typography className={classes.axis}>Y</Typography>
                  </ToggleButton>
                  <ToggleButton
                    classes={{
                      selected: classes.selected,
                    }}
                    size="small"
                    value="check"
                    selected={selectedAxis === Axis.Z}
                    onChange={(): void => setSelectedAxis(Axis.Z)}
                    className={classes.toggleButton}
                  >
                    <Typography className={classes.axis}>Z</Typography>
                  </ToggleButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="row" justify="center" align-items="center">
              <Grid item xs={3}>
                <Typography variant="h6" className={classes.axis}>
                  Degrees
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <div style={{ textAlign: 'center' }}>
                  <Typography variant="h5" className={classes.axis}>
                    {negative * angle}°
                    <ToggleButton
                      size="small"
                      classes={{
                        selected: classes.selected,
                      }}
                      className={classes.negativeToggleButton}
                      value="check"
                      selected={negative === -1}
                      onChange={handleNegativeToggle}
                    >
                      <Typography variant="caption">negative</Typography>
                    </ToggleButton>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <div className={classes.slider}>
              <Slider
                value={typeof angle === 'number' ? angle : 0}
                onChange={handleOnChange}
                defaultValue={rotationInCreation.degree}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks={marks}
                min={0}
                max={360}
                onChangeCommitted={(): void => handleOnChangeCommited({ axis: selectedAxis, degree: angle as number })}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.buttonSection}>
        <Grid className={classes.footer} container direction="column" justify="center" alignItems="center">
          <Fab
            disabled={existingTransformations.length >= 5}
            variant="extended"
            color="secondary"
            aria-label="reset"
            onClick={(): void =>
              addTransformation(
                { axis: selectedAxis, degree: (angle as number) * negative },
                Transformations.ETransformationType.ROTATION,
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

export default RotationTransformationCreator;
