import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import React from 'react';

interface TranslationIconProps {
  disabled?: boolean;
}

export const TranslationIcon: React.FC<TranslationIconProps> = ({ disabled }) => {
  return <TrendingFlatIcon color={disabled ? 'disabled' : 'inherit'} />;
};
