import { Divider, FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import React from 'react';

import { Transformations } from '../../../../../stores';

const TransformationOptions: React.FC = () => {
  const toggleMatrix = Transformations.useStore(
    (state: Transformations.State) => state.actions.toggleUseFalseNormalMatrix,
  );
  const toggleNormals = Transformations.useStore((state: Transformations.State) => state.actions.toggleShowNormals);
  const useFalseNormals = Transformations.useStore(
    (state: Transformations.State) => state.activeObject.useFalseNormalMatrix,
  );
  const showNormals = Transformations.useStore((state: Transformations.State) => state.activeObject.showNormals);
  const activeObject = Transformations.useStore((state: Transformations.State) => state.activeObject);

  return (
    <div>
      {activeObject.type !== Transformations.ESceneObject.GROUP ? (
        <>
          <Divider />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch color="primary" checked={showNormals} onChange={(): void => toggleNormals()} value="checkedA" />
              }
              label="Normals"
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  disabled={!showNormals}
                  checked={useFalseNormals}
                  onChange={(): void => toggleMatrix()}
                  value="checkedA"
                />
              }
              label="Use M as Normal Matrix"
            />
          </FormGroup>
        </>
      ) : null}
    </div>
  );
};

export default TransformationOptions;
