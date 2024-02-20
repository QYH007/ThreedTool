import { Grid, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { Transformations } from '../../../../stores';
import ModelPicker from '../ModelPicker/ModelPicker';
import AxisToggle from '../Toggles/AxisToggle';
import GridToggle from '../Toggles/GridToggle';
import RotationTransformationCreator from './RotationTransformationCreator';
import ScalingTransformationCreator from './ScalingTransformationCreator';
import ShearTransformationCreator from './ShearTransformationCreator';
import TransformationTypeSelection from './TransformationTypeSelection';
import TranslationTransformationCreator from './TranslationTransformationCreator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
    title: {
      margin: theme.spacing(1, 0),
    },
  }),
);

const TransformationCreator: React.FC = () => {
  const inCreation = Transformations.useStore((state: Transformations.State) => state.inCreation);

  let activeTransformationPanel: React.ReactNode;

  switch (inCreation.active) {
    case Transformations.ETransformationType.SCALING:
      activeTransformationPanel = <ScalingTransformationCreator />;
      break;
    case Transformations.ETransformationType.TRANSLATION:
      activeTransformationPanel = <TranslationTransformationCreator />;
      break;
    case Transformations.ETransformationType.SHEAR:
      activeTransformationPanel = <ShearTransformationCreator />;
      break;
    case Transformations.ETransformationType.ROTATION:
      activeTransformationPanel = <RotationTransformationCreator />;
      break;
    default:
      activeTransformationPanel = null;
  }

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container direction="row" justify="space-between">
        <AxisToggle />
        <GridToggle />
      </Grid>
      <Typography className={classes.title} variant="h6">
        1. Select Model
      </Typography>
      <ModelPicker />
      <Typography className={classes.title} variant="h6">
        2. Choose Transformation
      </Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <TransformationTypeSelection activePanel={inCreation.active} />
        </Grid>
      </Grid>

      <Typography className={classes.title} variant="h6">
        3. Create Transformation
      </Typography>
      {activeTransformationPanel}
    </Paper>
  );
};

export default TransformationCreator;
