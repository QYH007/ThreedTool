import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React from 'react';

import { Illumination } from '../../../../stores';

export const PlaneVisibilityToggle = (): JSX.Element => {
  const showPlane = Illumination.useStore((store: Illumination.Store) => store.state.scene.showPlane);
  const togglePlane = Illumination.useStore((store: Illumination.Store) => store.actions.togglePlaneVisibility);

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch color="primary" checked={showPlane} onChange={(): void => togglePlane()} value={2} />}
        label="Plane"
      />
    </FormGroup>
  );
};
