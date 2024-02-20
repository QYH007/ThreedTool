import React from 'react';

import { RotationIcon, ScalingIcon, ShearIcon, TranslationIcon } from '../../../../../../components/Icons';
import { Transformations } from '../../../../../../stores';

interface Props {
  transformation: Transformations.Transformation;
}

const TransformationCardIcon = ({ transformation }: Props): JSX.Element => {
  let transformationIcon: React.ReactNode;
  switch (transformation.type) {
    case Transformations.ETransformationType.ROTATION:
      transformationIcon = (
        <div>
          <RotationIcon disabled={!transformation.active} />
          {transformation.rotation}
        </div>
      );
      break;
    case Transformations.ETransformationType.SCALING:
      transformationIcon = <ScalingIcon disabled={!transformation.active} />;
      break;
    case Transformations.ETransformationType.TRANSLATION:
      transformationIcon = <TranslationIcon disabled={!transformation.active} />;
      break;
    case Transformations.ETransformationType.SHEAR:
      transformationIcon = <ShearIcon />;
      break;
    default:
      break;
  }

  return <div>{transformationIcon}</div>;
};

export default TransformationCardIcon;
