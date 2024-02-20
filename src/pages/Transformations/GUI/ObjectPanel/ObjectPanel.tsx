import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';

import { Transformations } from '../../../../stores';
import Matrices from './Matrices/Matrices';
import Playlist from './Playlist/Playlist';
import TransformationOptions from './TransformationOptions/TransformationOptions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
  }),
);

const ObjectPanel: React.FC = () => {
  const activeObject = Transformations.useStore((state: Transformations.State) => state.activeObject);

  const classes = useStyles();
  return (
    <Wrapper>
      <Paper className={classes.root}>
        <Box textAlign="center">
          <Typography variant="h4">{activeObject.type}</Typography>
        </Box>
        <Divider />
        <Matrices transformations={activeObject.transformations} />
        <TransformationOptions />
        <Divider />
        <Playlist activeObject={activeObject} />
      </Paper>
    </Wrapper>
  );
};

export default ObjectPanel;

const Wrapper = styled.div`
  width: 300px;
`;
