import React from 'react';

import { Transformations } from '../../../../../stores';
import InverseMatrix from './InverseMatrix';
import TransformationMatrix from './TransformationMatrix';

interface Props {
  transformations: Transformations.Transformation[];
}

const Matrices: React.FC<Props> = ({ transformations }) => {
  return (
    <>
      <TransformationMatrix allTransformations={transformations} />
      <InverseMatrix allTransformations={transformations} />
    </>
  );
};

export default Matrices;
