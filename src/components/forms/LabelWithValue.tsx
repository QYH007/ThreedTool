import { Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  label: string;
  value: number | string;
}
export const LabelWithValue = ({ label, value }: Props): JSX.Element => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography gutterBottom>{label}</Typography>
    <Typography variant="h6">{value}</Typography>
  </div>
);
