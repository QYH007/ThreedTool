import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: (_props: any) => ({
    margin: 5,
    padding: '2px 3px 5px 3px ',
    borderRadius: 3,
    border: '1px solid #0000008a',
    width: 20,
    height: 20,
    background: _props.color,
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)',
    },
  }),
  box: {
    paddingBottom: 10,
  },
});

interface Props {
  active: boolean;
  color: string;
  onColorChange: (color: string) => void;
}

export const ColorBox: React.FC<Props> = ({ active, color, onColorChange }) => {
  const classes = useStyles({ color: color });
  return (
    <div className={classes.root} onPointerDown={(): void => onColorChange(color)}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.box}>
          {active ? <CheckIcon /> : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorBox;
