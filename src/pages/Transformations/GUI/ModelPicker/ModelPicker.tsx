import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { Transformations } from '../../../../stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toggleButtonGroup: {
      width: '100%',
    },
    toggleButton: {
      padding: theme.spacing(1, 2),
      height: '100%',
      width: '26%',
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

const ModelPicker: React.FC = () => {
  const activateModel = Transformations.useStore((state: Transformations.State) => state.actions.activateModel);
  const activeObjectType = Transformations.useStore((state: Transformations.State) => state.activeObject.type);

  const classes = useStyles();
  return (
    <ToggleButtonGroup size="large" exclusive className={classes.toggleButtonGroup}>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => activateModel(Transformations.ESceneObject.BOX)}
        selected={activeObjectType === Transformations.ESceneObject.BOX}
        key={1}
        value={'toggle'}
      >
        {Transformations.ESceneObject.BOX}
      </ToggleButton>

      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => activateModel(Transformations.ESceneObject.SPHERE)}
        selected={activeObjectType === Transformations.ESceneObject.SPHERE}
        key={3}
        value={'toggle'}
      >
        {Transformations.ESceneObject.SPHERE}
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => activateModel(Transformations.ESceneObject.TORUS)}
        selected={activeObjectType === Transformations.ESceneObject.TORUS}
        key={2}
        value={'toggle'}
      >
        {Transformations.ESceneObject.TORUS}
      </ToggleButton>
      {/* <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => activateModel(Transformations.ESceneObject.GROUP)}
        selected={activeObjectType === Transformations.ESceneObject.GROUP}
        key={5}
        value={'toggle'}
      >
        GROUP
      </ToggleButton> */}
    </ToggleButtonGroup>
  );
};

export default ModelPicker;
