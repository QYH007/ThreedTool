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
import ScenePicker from '../../ScenePicker';
import { ObjectReset } from '../ObjectReset';

const SphereGUI: React.FC = () => {
  const scene = PBR.useStore((state: PBR.State) => state.scene);
  const sphere = PBR.useStore((state: PBR.State) => state.sphere);
  const activeObject = PBR.useStore((state: PBR.State) => state.scene.activeObject);
  const actions = PBR.useStore((state: PBR.State) => state.actions);

  return (
    <PanelAppear>
      <ObjectReset type={PBR.ESceneObject.Sphere} />
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
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={scene.moveLight}
              onChange={(): void => actions.toggleMovingLight()}
              value="checkedB"
            />
          }
          label="Moving Point Light"
        />
      </FormGroup>
      <ScenePicker />
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
      <Divider />

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
    </PanelAppear>
  );
};

export default SphereGUI;
