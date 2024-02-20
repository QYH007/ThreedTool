import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

import { Transformations } from '../../../../../stores';
import utils from '../../../../../utils/matrices';

const SuperScript = styled.div`
  position: absolute;
  top: -3px;
  right: 65px;
  font-size: 0.8em;
`;

const MatrixContainer = styled.div`
  border-left: 2px solid black;
  border-right: 2px solid black;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.9em;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    display: 'flex',
    padding: '4px',
    width: 40,
    justifyContent: 'center',
  },
  button: {
    marginBottom: '1em',
  },
});

interface Props {
  allTransformations: Transformations.Transformation[];
}

const InverseMatrix: React.FC<Props> = ({ allTransformations }) => {
  const [columns, setColumns] = useState([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
  const actions = Transformations.useStore((state) => state.actions);
  const startAnimating = actions.startAnimating;
  const setAnimateFast = actions.setAnimateFast;
  const setDoInverseTransformation = actions.setDoInverseTransformation;
  const handleApplyButton = (): void => {
    setAnimateFast(true);
    setDoInverseTransformation(true);
    startAnimating();
  };

  useEffect(() => {
    const transMatrix = new THREE.Matrix4();
    const inverse = new THREE.Matrix4();
    for (const t of allTransformations) {
      if (t.active) {
        // transMatrix.multiply(inverse.inverse(utils.computeTransformationMatrix(t)));
        transMatrix.multiply(utils.computeTransformationMatrix(t).invert());
      }
    }

    // setInverseTransformationMatrix(inverse.elements)
    const column1 = transMatrix.elements.slice(0, 4);
    const column2 = transMatrix.elements.slice(4, 8);
    const column3 = transMatrix.elements.slice(8, 12);
    const column4 = transMatrix.elements.slice(12, 16);
    setColumns([column1, column2, column3, column4]);
  }, [allTransformations]);

  const classes = useStyles();
  return (
    <>
      <Box textAlign="center">
        <Typography variant="h6" style={{ position: 'relative' }}>
          Inverse M<SuperScript>-1</SuperScript>
        </Typography>
      </Box>
      <Wrapper>
        <MatrixContainer>
          <div className={classes.root}>
            {columns.map((row, i) => (
              <div className={classes.row} key={i}>
                {row.map((col, j) => (
                  <div className={classes.column} key={j}>
                    {col.toFixed(2)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </MatrixContainer>
      </Wrapper>
      <Box className={classes.button} textAlign="center">
        <Button variant="outlined" size="small" onClick={handleApplyButton}>
          Apply
        </Button>
      </Box>
    </>
  );
};

export default InverseMatrix;
