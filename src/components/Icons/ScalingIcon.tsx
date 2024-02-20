import React from 'react';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

interface ScalingIconProps {
  disabled?: boolean;
}

export const ScalingIcon: React.FC<ScalingIconProps> = ({ disabled }) => {
  return <ZoomOutMapIcon color={disabled ? 'disabled' : 'inherit'} />;
};
