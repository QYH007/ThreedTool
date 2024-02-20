import React from 'react';
import { Typography } from '@material-ui/core';

export const TooManyTransformationMessage = (): JSX.Element => {
  return (
    <Typography style={{ margin: '0.5em 1em' }} variant="caption">
      Only 5 transformations possible.
    </Typography>
  );
};
