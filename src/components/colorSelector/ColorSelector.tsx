import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { ColorBox } from './ColorBox';

const modelColors = ['#ffffff', '#ff0000', '#E8D376', '#00ff00', '#0000ff'];
const bgColors = ['#333333', '#ffffff', '#E8D376', '#77ed77', '#ff5533'];

interface Props {
  activeColor: string;
  onColorChange: (color: string) => void;
  bgColor?: boolean;
  caption?: string;
}

export const ColorSelector: React.FC<Props> = ({ caption, activeColor, onColorChange, bgColor }) => {
  let colors = modelColors;

  if (bgColor) {
    colors = bgColors;
  }

  return (
    <div style={{ margin: '0.5em 0' }}>
      {caption && (
        <Box textAlign="center">
          <Typography variant="caption">{caption}</Typography>
        </Box>
      )}
      <Grid container direction="row" alignItems="center" justify="center">
        {colors.map((color, idx) => (
          <Grid item key={idx}>
            <ColorBox active={activeColor === color} color={color} onColorChange={onColorChange} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
