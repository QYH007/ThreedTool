import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { Illumination } from '../../../../stores';
import { Config, premades } from '../../../../stores/illumination/premades/premades';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 300,
  },
}));

export const ObjectToggle: React.FC = () => {
  const groups = Illumination.useStore((store: Illumination.Store) => store.state.objects.groups);
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);

  const [activeConfig, setActiveConfig] = useState<Config>(premades[0]);

  const handleChange = (event: any, value: any): void => {
    const setting: Config = premades[value.key];
    setActiveConfig(setting);
    actions.setState(setting);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Select a base setting for the scene</InputLabel>
          <Select value={activeConfig.name} onChange={handleChange}>
            {premades.map((config, i: number) => (
              <MenuItem key={i} value={config.name}>
                {config.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <FormControl component="fieldset">
        <FormLabel>Objects to display</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={groups.torus}
                onChange={(): void => actions.toggleModelGroup(Illumination.ESceneObject.TORUS)}
              />
            }
            label="Tori"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={groups.sphere}
                onChange={(): void => actions.toggleModelGroup(Illumination.ESceneObject.SPHERE)}
              />
            }
            label="Spheres"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={groups.box}
                onChange={(): void => actions.toggleModelGroup(Illumination.ESceneObject.BOX)}
              />
            }
            label="Boxes"
          />
        </FormGroup>
      </FormControl>
    </Paper>
  );
};
