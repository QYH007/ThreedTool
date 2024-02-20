import { makeStyles, Slider, Typography, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  root: {
    margin: '0.5em 0',
  },
});

interface Props {
  label: string;
  value: number | string;
  step: number;
  min: number;
  max: number;
  onChange: (_: any, v: any) => void;
}

/**
 * Displays a Slider, Label and Value
 * {Label}
 * {Value} {--0-------}
 */
const PanelSlider: React.FC<Props> = ({ label, value, step, min, max, onChange }) => {
  const valuetext = (v: number): string => v.toString();

  const [displayVal, setDisplayVal] = useState(value);

  useEffect(() => {
    setDisplayVal(value);
  }, [label, value]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">{label}</Typography>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={2}>
          <Typography variant="h6">{value}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Slider
            defaultValue={+value}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={step}
            marks
            value={+displayVal}
            min={min}
            max={max}
            onChange={(_, v): void => setDisplayVal(+v)}
            onChangeCommitted={(_, v): void => onChange(_, +v)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PanelSlider;
