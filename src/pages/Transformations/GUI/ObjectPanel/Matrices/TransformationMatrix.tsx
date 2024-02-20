import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

import { Transformations } from '../../../../../stores';
import utils from '../../../../../utils/matrices';

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

const TransformationMatrix: React.FC<Props> = ({ allTransformations }) => {
  const [columns, setColumns] = useState([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);

  const setAnimateFast = Transformations.useStore((state: Transformations.State) => state.actions.setAnimateFast);
  const startAnimating = Transformations.useStore((state: Transformations.State) => state.actions.startAnimating);

  useEffect(() => {
    const transMatrix = new THREE.Matrix4();

    const transformations = [...allTransformations];
    transformations.reverse();

    for (const t of transformations) {
      if (t.active) {
        transMatrix.multiply(utils.computeTransformationMatrix(t));
      }
    }

    const column1 = transMatrix.elements.slice(0, 4);
    const column2 = transMatrix.elements.slice(4, 8);
    const column3 = transMatrix.elements.slice(8, 12);
    const column4 = transMatrix.elements.slice(12, 16);
    setColumns([column1, column2, column3, column4]);
  }, [allTransformations]);

  const classes = useStyles();

  const handleApplyButton = (): void => {
    setAnimateFast(true);
    startAnimating();
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h6">Transformation M</Typography>
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

export default TransformationMatrix;
