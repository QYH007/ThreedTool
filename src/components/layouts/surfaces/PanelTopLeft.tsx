import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '0.5em',
    padding: '1em',
  },
}));

interface Props {
  children: React.ReactNode;
  width?: number;
}
const PanelTopLeft: React.FC<Props> = ({ children, width }) => {
  const classes = useStyles();

  const divStyle = {
    width: width ? width + '%' : 'inherit',
  };

  return (
    <div style={divStyle} className={classes.root}>
      {children}
    </div>
  );
};

export default PanelTopLeft;
