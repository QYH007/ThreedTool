import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { Appear } from '../../animations/Appear';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 3),
  },
}));

interface Props {
  children: React.ReactNode;
}

export const PanelAppear: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <Appear>
      <Paper className={classes.root}>{children}</Paper>
    </Appear>
  );
};
