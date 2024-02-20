import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { useTexturingStore } from '../../stores/texturing/store';
import { ETexturingUnit } from '../../types/texturingUnit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'absolute',
      bottom: '1em',
      left: '1em',
    },
    toggleButtonGroup: {
      background: 'white',
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

export const UnitNavigation: React.FC = () => {
  const classes = useStyles();
  const { unit, setUnit } = useTexturingStore((store) => store.general);

  return (
    <div className={classes.wrapper}>
      <ToggleButtonGroup size="large" exclusive className={classes.toggleButtonGroup}>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          onClick={(): void => setUnit(ETexturingUnit.TEXTURE_MAPPING)}
          selected={unit === ETexturingUnit.TEXTURE_MAPPING}
          key={1}
          value={'toggle'}
        >
          texture mapping
        </ToggleButton>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          onClick={(): void => setUnit(ETexturingUnit.ANTIALIASING)}
          selected={unit === ETexturingUnit.ANTIALIASING}
          key={0}
          value={'toggle'}
        >
          anti-aliasing
        </ToggleButton>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          onClick={(): void => setUnit(ETexturingUnit.MULTI_MAPPING)}
          selected={unit === ETexturingUnit.MULTI_MAPPING}
          key={2}
          value={'toggle'}
        >
          multimapping
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
