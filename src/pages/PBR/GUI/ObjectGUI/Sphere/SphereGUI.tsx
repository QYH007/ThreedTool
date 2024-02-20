import {
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from '@material-ui/core';
import React from 'react';

import { PanelAppear } from '../../../../../components/layouts/surfaces/PanelAppear';
import PanelSlider from '../../../../../components/forms/PanelSlider';
import { PBR } from '../../../../../stores';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const SphereGUI: React.FC = () => {
  const sphere = PBR.useStore((state: PBR.State) => state.sphere);
  const activeObject = PBR.useStore((state: PBR.State) => state.scene.activeObject);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <PanelAppear>
      <Typography variant="h5">{activeObject.toLocaleUpperCase()}</Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={sphere.isVisible}
              onChange={(): void => actions.toggleSphereVisible()}
              value="checkedA"
            />
          }
          label="Toggle Visibility"
        />
      </FormGroup>
      <Divider />

      <PanelSlider
        label={'Height Segments'}
        value={sphere.heightSegments}
        step={1}
        min={sphere.minHeightSegments}
        max={sphere.maxHeightSegments}
        onChange={(_, v): void => actions.setSphereHeightSegments(+v)}
      />

      <PanelSlider
        label={'Width Segments'}
        value={sphere.widthSegments}
        step={1}
        min={sphere.minWidthSegments}
        max={sphere.maxWidthSegments}
        onChange={(_, v): void => actions.setSphereWidthSegments(+v)}
      />
      <Divider />
      <List component="div" disablePadding>
        <ListItem button onClick={(): void => actions.setSphereHavemap(false)}>
          <ListItemIcon>{!sphere.havemap ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}</ListItemIcon>
          <ListItemText primary="Metal" />
        </ListItem>
        <ListItem button onClick={(): void => actions.setSphereStainless(true)}>
          <ListItemIcon>
            {sphere.havemap && sphere.stainless ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
          </ListItemIcon>
          <ListItemText primary="Scratched Gold" />
        </ListItem>
        <ListItem button onClick={(): void => actions.setSphereStainless(false)}>
          <ListItemIcon>
            {sphere.havemap && !sphere.stainless ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
          </ListItemIcon>
          <ListItemText primary="Rusty Metal" />
        </ListItem>
      </List>

      <PanelSlider
        label={'Metalness'}
        value={sphere.metalness}
        step={0.05}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setSphereMetalness(+v)}
      />
      <PanelSlider
        label={'Roughness'}
        value={sphere.roughness}
        step={0.05}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setSphereRoughness(+v)}
      />
      <PanelSlider
        label={'Environment Intensity'}
        value={sphere.envMapIntensity}
        step={0.05}
        min={0}
        max={1}
        onChange={(_, v): void => actions.setSphereEnvMapIntensity(+v)}
      />
    </PanelAppear>
  );
};

export default SphereGUI;
