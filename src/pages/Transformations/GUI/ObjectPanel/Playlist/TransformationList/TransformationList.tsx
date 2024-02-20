import React from 'react';
import styled from 'styled-components';

import { Transformations } from '../../../../../../stores';
import TransformationCard from './TransformationCard';
import { Typography } from '@material-ui/core';

const ListStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

interface TransformationListProps {
  transformations: Transformations.Transformation[];
}

const TransformationList: React.FC<TransformationListProps> = ({ transformations }) => {
  const state = Transformations.useStore((state: Transformations.State) => state);
  const moveCard = state.actions.moveTransformation;
  const activeTransformationID = state.currentAnimationID;

  return (
    <ListStyled>
      {transformations && transformations.length === 0 ? (
        <Typography>No transformations yet</Typography>
      ) : (
        transformations.map((card, i) => (
          <TransformationCard
            key={card.id}
            index={i}
            id={card.id}
            inAnimation={activeTransformationID === card.id}
            transformation={card}
            moveCard={moveCard}
          />
        ))
      )}
    </ListStyled>
  );
};

export default TransformationList;
