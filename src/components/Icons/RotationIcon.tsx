import Rotate90DegreesCcwIcon from '@material-ui/icons/Rotate90DegreesCcw';
import React from 'react';

interface RotationIconProps {
  disabled?: boolean;
}

export const RotationIcon: React.FC<RotationIconProps> = ({ disabled }) => {
  return <Rotate90DegreesCcwIcon color={disabled ? 'disabled' : 'inherit'} />;
};
