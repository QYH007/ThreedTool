import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
`;

interface Props {
  onClick: () => void;
}

export const TopRightCloseButton: React.FC<Props> = ({ onClick }) => {
  const handleClick = (): void => {
    onClick();
  };
  return (
    <Wrapper>
      <IconButton aria-label="delete" onClick={handleClick}>
        <CloseIcon />
      </IconButton>
    </Wrapper>
  );
};
