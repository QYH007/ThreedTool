import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { Transformations } from '../../../../../../stores';
import utils from '../../../../../../utils/matrices';

const useStyles = makeStyles({
  wrapper: {
    position: 'absolute',
    padding: '10px',
    background: 'white',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    borderRadius: 5,
    left: 45,
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    padding: '0px 10px',
  },
});

interface Props {
  transformation: Transformations.Transformation;
}

const Matrix: React.FC<Props> = ({ transformation }) => {
  const [columns, setColumns] = useState([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);

  useEffect(() => {
    const transMatrix = new THREE.Matrix4();
    transMatrix.multiply(utils.computeTransformationMatrix(transformation));
    const column1 = transMatrix.elements.slice(0, 4);
    const column2 = transMatrix.elements.slice(4, 8);
    const column3 = transMatrix.elements.slice(8, 12);
    const column4 = transMatrix.elements.slice(12, 16);
    setColumns([column1, column2, column3, column4]);
  }, [transformation]);

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        {columns.map((row, i) => (
          <div className={classes.row} key={i}>
            {row.map((col, j) => (
              <div className={classes.column} key={j}>
                <Typography> {col.toFixed(1)}</Typography>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
