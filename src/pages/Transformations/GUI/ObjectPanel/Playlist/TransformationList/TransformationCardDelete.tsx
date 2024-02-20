import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React from 'react';

import { Transformations } from '../../../../../../stores';

interface Props {
  transformationId: string;
}

const TransformationCardDelete: React.FC<Props> = ({ transformationId }) => {
  const deleteTransformation = Transformations.useStore(
    (state: Transformations.State) => state.actions.deleteTransformation,
  );
  const isAnimating = Transformations.useStore((state: Transformations.State) => state.isAnimating);

  return (
    <IconButton
      size="small"
      onClick={(): void => {
        if (!isAnimating) {
          deleteTransformation(transformationId);
        }
      }}
    >
      <DeleteOutlineIcon color={isAnimating ? 'disabled' : 'secondary'} />
    </IconButton>
  );
};

export default TransformationCardDelete;
