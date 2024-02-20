import { createStyles, makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

import { Transformations } from '../../../../stores';

const useStyles = makeStyles((theme) =>
  createStyles({
    toggleButton: {
      padding: theme.spacing(1, 2),
      height: '100%',
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
  activePanel: Transformations.ETransformationType | null;
}

const TransformationTypeSelection: React.FC<Props> = ({ activePanel }) => {
  const activateCreationPanel = Transformations.useStore(
    (state: Transformations.State) => state.actions.activateCreationPanel,
  );

  const classes = useStyles();

  return (
    <div>
      <ToggleButtonGroup exclusive>
        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => activateCreationPanel(Transformations.ETransformationType.TRANSLATION)}
          selected={activePanel === Transformations.ETransformationType.TRANSLATION}
          value={'toggle'}
        >
          translate
        </ToggleButton>

        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => activateCreationPanel(Transformations.ETransformationType.SCALING)}
          selected={activePanel === Transformations.ETransformationType.SCALING}
          value={'toggle'}
        >
          scale
        </ToggleButton>

        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => activateCreationPanel(Transformations.ETransformationType.ROTATION)}
          selected={activePanel === Transformations.ETransformationType.ROTATION}
          value={'toggle'}
        >
          rotate
        </ToggleButton>

        <ToggleButton
          classes={{
            selected: classes.selected,
          }}
          className={classes.toggleButton}
          onClick={(): void => activateCreationPanel(Transformations.ETransformationType.SHEAR)}
          selected={activePanel === Transformations.ETransformationType.SHEAR}
          value={'toggle'}
        >
          shear
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default TransformationTypeSelection;
