import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { PBR } from '../../../stores';
import PanelSlider from '../../../components/forms/PanelSlider';

const ScenePicker: React.FC = () => {
  const scene1 = PBR.useStore((state: PBR.State) => state.scene);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  const useStyles = makeStyles((theme) => ({
    group: {
      background: 'white',
    },
    toggleButton: {
      width: 85,
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

  const classes = useStyles();

  return (
    <>
      {/* <Typography variant='subtitle2'>Background</Typography> */}
      <ToggleButtonGroup className={classes.group}>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => actions.setBackground(1)}
          selected={scene1.background === 1}
          key={1}
          value={'toggle'}
        >
          <Typography variant="subtitle2">Studio</Typography>
        </ToggleButton>

        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => actions.setBackground(2)}
          selected={scene1.background === 2}
          key={2}
          value={'toggle'}
        >
          <Typography variant="subtitle2">Street</Typography>
        </ToggleButton>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => actions.setBackground(3)}
          selected={scene1.background === 3}
          key={3}
          value={'toggle'}
        >
          <Typography variant="subtitle2">Garden</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <PanelSlider
        label={'Environment Intensity'}
        value={scene1.backgroundIntensity}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setBackgroundIntensity(+v)}
      />
    </>
  );
};

export default ScenePicker;
