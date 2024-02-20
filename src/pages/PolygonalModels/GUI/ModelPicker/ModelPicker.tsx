import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { PolygonalModels } from '../../../../stores';

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
  const scene = PolygonalModels.useStore((state: PolygonalModels.State) => state.scene);
  const actions = PolygonalModels.useStore((state: PolygonalModels.State) => state.actions);

  const classes = useStyles();
  return (
    <ToggleButtonGroup className={classes.group} size="large" exclusive>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.Box)}
        selected={scene.activeObject === PolygonalModels.ESceneObject.Box}
        key={1}
        value={'toggle'}
      >
        <Typography variant="subtitle2"> {PolygonalModels.ESceneObject.Box}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        className={classes.toggleButton}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.Sphere)}
        selected={scene.activeObject === PolygonalModels.ESceneObject.Sphere}
        key={2}
        value={'toggle'}
      >
        <Typography variant="subtitle2">{PolygonalModels.ESceneObject.Sphere}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.Torus)}
        className={classes.toggleButton}
        selected={scene.activeObject === PolygonalModels.ESceneObject.Torus}
        key={3}
        value={'toggle'}
      >
        <Typography variant="subtitle2"> {PolygonalModels.ESceneObject.Torus}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.Bunny)}
        selected={scene.activeObject === PolygonalModels.ESceneObject.Bunny}
        className={classes.toggleButton}
        key={4}
        value={'toggle'}
      >
        <Typography variant="subtitle2">{PolygonalModels.ESceneObject.Bunny}</Typography>
      </ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.World)}
        selected={scene.activeObject === PolygonalModels.ESceneObject.World}
        className={classes.toggleButton}
        key={5}
        value={'toggle'}
      >
        <Typography variant="subtitle2">{PolygonalModels.ESceneObject.World}</Typography>
      </ToggleButton>
      {/* New button */}
      <ToggleButton
        classes={{
          selected: classes.selected,
        }}
        onClick={(): void => actions.setActiveSceneObject(PolygonalModels.ESceneObject.UserMesh)}
        selected={scene.activeObject === PolygonalModels.ESceneObject.UserMesh}
        className={classes.toggleButton}
        key={6}
        value={'toggle'}
      >
        <Typography variant="subtitle2">{PolygonalModels.ESceneObject.UserMesh}</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ModelPicker;
