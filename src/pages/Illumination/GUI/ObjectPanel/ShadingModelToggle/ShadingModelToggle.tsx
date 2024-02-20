import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Illumination } from '../../../../../stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
    toggleButton: {
      width: 126,
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

interface Props {
  objectData: Illumination.SceneObject;
  setShadingModel: (id: string, type: Illumination.ESceneObject, shadingModel: Illumination.EShadingModel) => void;
}

export const ShadingModelToggle: React.FC<Props> = ({ objectData, setShadingModel }) => {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: '1em' }}>
      <ToggleButtonGroup exclusive size="small">
        <ToggleButton
          className={classes.toggleButton}
          classes={{
            selected: classes.selected,
          }}
          onClick={(): void => setShadingModel(objectData.id, objectData.type, Illumination.EShadingModel.GOURAUD)}
          selected={objectData.shadingModel === Illumination.EShadingModel.GOURAUD}
          key={uuidv4()}
          value={'toggle'}
        >
          <Typography variant="subtitle2">Gouraud</Typography>
        </ToggleButton>
        <ToggleButton
          className={classes.toggleButton}
          classes={{
            selected: classes.selected,
          }}
          onClick={(): void => setShadingModel(objectData.id, objectData.type, Illumination.EShadingModel.PHONG)}
          selected={objectData.shadingModel === Illumination.EShadingModel.PHONG}
          key={uuidv4()}
          value={'toggle'}
        >
          <Typography variant="subtitle2">Phong</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
