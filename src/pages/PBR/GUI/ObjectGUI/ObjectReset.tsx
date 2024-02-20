import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { PBR, PolygonalModels } from '../../../../stores';

const Wrapper = styled.div`
  position: absolute;
  right: 1.5em;
  top: 1.5em;
`;

interface Props {
  type: PBR.ESceneObject;
}

export const ObjectReset: React.FC<Props> = ({ type }) => {
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <Wrapper>
      <IconButton aria-label="delete" onClick={(): void => actions.reset(type)}>
        <RotateLeftIcon />
      </IconButton>
    </Wrapper>
  );
};
