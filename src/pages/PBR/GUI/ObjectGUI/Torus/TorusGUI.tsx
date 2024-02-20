import { Divider, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PBR } from '../../../../../stores';
import { ObjectReset } from '../ObjectReset';

const TorusGUI: React.FC = () => {
  const torus = PBR.useStore((state: PBR.State) => state.torus);
  const activeObject = PBR.useStore((state: PBR.State) => state.scene.activeObject);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PBR.ESceneObject.Torus} />
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isVisible}
              onChange={(): void => actions.toggleTorusVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={torus.isTransparent}
              onChange={(): void => actions.toggleTorusTransparent()}
              value="checkedB"
            />
          }
          label="Toggle Transparent"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        key={`slider-1`}
        label={'Radius'}
        value={torus.radius}
        step={0.5}
        min={torus.minRadius}
        max={torus.maxRadius}
        onChange={(_, v): void => actions.setTorusRadius(+v)}
      />

      <PanelSlider
        key={`slider-2`}
        label={'Tube Width'}
        value={torus.tubeWidth}
        step={0.1}
        min={torus.minTubeWidth}
        max={torus.maxTubeWidth}
        onChange={(_, v): void => actions.setTorusTubeWidth(+v)}
      />

      <Divider />

      <PanelSlider
        key={`slider-3`}
        label={'Metalness'}
        value={torus.metalness}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setTorusMetalness(+v)}
      />
      <PanelSlider
        key={`slider-4`}
        label={'Roughness'}
        value={torus.roughness}
        step={0.1}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setTorusRoughness(+v)}
      />
      {torus.isTransparent ? (
        <>
          <PanelSlider
            key={`slider-5`}
            label={'Opacity'}
            value={torus.opacity}
            step={0.1}
            min={0}
            max={1}
            onChange={(_, v): void => actions.setTorusOpacity(+v)}
          />
          <PanelSlider
            key={`slider-6`}
            label={'transmisson'}
            value={torus.transmission}
            step={0.1}
            min={0}
            max={1}
            onChange={(_, v): void => actions.setTorusTransmission(+v)}
          />
        </>
      ) : (
        <></>
      )}

      {!torus.isTransparent ? (
        <PanelSlider
          key={`slider-7`}
          label={'reflectivity'}
          value={torus.reflectivity}
          step={0.1}
          min={0}
          max={1.5}
          onChange={(_, v): void => actions.setTorusReflectivity(+v)}
        />
      ) : (
        <></>
      )}
    </PanelAppear>
  );
};

export default TorusGUI;
