import { IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppsIcon from '@material-ui/icons/Apps';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Transformations } from '../../../../../../stores';
import Matrix from './Matrix';

const MatrixWrapper = styled.div`
  position: absolute;
  left: -245px;
  top: -40px;
  padding: 5px;
`;

const useStyles = makeStyles({
  button: {
    left: '-40px',
    margin: '2px',
    position: 'absolute',
    top: '4px',
    padding: '2px',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
});

interface Props {
  transformation: Transformations.Transformation;
}

const DetailsHandle: React.FC<Props> = ({ transformation }) => {
  const [open, setOpen] = useState(false);
  const node = useRef<any>();

  const handleClick = (e: any): void => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return (): void => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const classes = useStyles();

  return (
    <>
      <IconButton
        className={classes.button}
        style={open ? { backgroundColor: '#636363' } : { backgroundColor: '#e0e0e0' }}
        aria-label="delete"
        size="medium"
        onClick={(): void => setOpen(!open)}
        ref={node}
      >
        <AppsIcon fontSize="inherit" />
        {open ? (
          <MatrixWrapper>
            <Paper>
              <Matrix transformation={transformation} />
            </Paper>
          </MatrixWrapper>
        ) : null}
      </IconButton>
    </>
  );
};

export default DetailsHandle;
