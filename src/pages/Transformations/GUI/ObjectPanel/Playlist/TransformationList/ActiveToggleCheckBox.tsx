import { Checkbox, makeStyles } from '@material-ui/core';
import React from 'react';

import { Transformations } from '../../../../../../stores';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: '-44px',
    top: '-3px',
  },
}));

interface Props {
  transformation: Transformations.Transformation;
}

export const ActiveToggleCheckBox: React.FC<Props> = ({ transformation }) => {
  const actions = Transformations.useStore((state: Transformations.State) => state.actions);

  const classes = useStyles();

  const handleChange = (): void => {
    actions.toggleTransformationSelected(transformation.id);
  };

  return (
    <div className={classes.root}>
      <Checkbox
        checked={transformation.active}
        onChange={handleChange}
        color={transformation.active ? 'primary' : 'default'}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
};
