import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { PBR } from '../../../../stores';

const useStyles = makeStyles((theme) => ({
  group: {
    background: 'white',
  },
  toggleButton: {
    width: 90,
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

const ModelPicker: React.FC = () => {
  const scene = PBR.useStore((state: PBR.State) => state.scene);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  const classes = useStyles();
  return (
    <ToggleButtonGroup className={classes.group} size="large" exclusive>

      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => actions.setActiveSceneObject(PBR.ESceneObject.Sphere)}
        selected={scene.activeObject === PBR.ESceneObject.Sphere}
        key={1}
        value={'toggle'}
      >
        <Typography variant="subtitle2">{PBR.ESceneObject.Sphere}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        onClick={(): void => actions.setActiveSceneObject(PBR.ESceneObject.Torus)}
        className={classes.toggleButton}
        selected={scene.activeObject === PBR.ESceneObject.Torus}
        key={2}
        value={'toggle'}
      >
        <Typography variant="subtitle2"> {PBR.ESceneObject.Torus}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => actions.setActiveSceneObject(PBR.ESceneObject.Box)}
        selected={scene.activeObject === PBR.ESceneObject.Box}
        key={3}
        value={'toggle'}
      >
        <Typography variant="subtitle2"> {PBR.ESceneObject.Box}</Typography>
      </ToggleButton>

      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => actions.setActiveSceneObject(PBR.ESceneObject.Cerberus)}
        selected={scene.activeObject === PBR.ESceneObject.Cerberus}
        key={4}
        value={'toggle'}
      >
        <Typography variant="subtitle2"> {PBR.ESceneObject.Cerberus}</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ModelPicker;
