import { createStyles, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: (_props: any) => ({
      color: _props.labelColor,
    }),
  }),
);

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
  color?: string;
}

export const ToggleButton = ({ label, checked, onToggle, color }: Props): JSX.Element => {
  const classes = useStyles({ labelColor: color });
  return (
    <FormGroup>
      <FormControlLabel
        classes={{ label: classes.root }}
        control={<Switch color="primary" checked={checked} onChange={onToggle} />}
        label={label}
      />
    </FormGroup>
  );
};
