import {
  Box,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';

import { Illumination } from '../../../../stores';
import { DirectionalLightOptions } from './DirectionalLightOptions';
import { GlobalOptions } from './GlobalOptions';
import { PointLightOptions } from './PointLightOptions';
import { SpotLightOptions } from './SpotLightOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    padding: theme.spacing(1),
  },

  summary: {
    display: 'flex',
    alignItems: 'center',
  },
  panelRoot: {
    width: '100%',
  },
}));

enum Setting {
  NONE = 'NONE',
  GLOBAL = 'GLOBAL',
  DIRECTIONAL = 'DIRECTIONAL',
  SPOT = 'SPOT',
  POINT = 'POINT',
}

interface LightToggleProps {
  light: Illumination.ESceneLight;
}

function LightToggle({ light }: LightToggleProps): JSX.Element {
  const thisLight = Illumination.useStore((store: Illumination.Store) => store.state.lights[light]);
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);

  return (
    <Checkbox
      color="primary"
      checked={thisLight.isActive}
      onChange={(): void => actions.toggleLight(light)}
      onClick={(event): void => event.stopPropagation()}
      onFocus={(event): void => event.stopPropagation()}
    />
  );
}

const LightSettings = (): JSX.Element => {
  const [setting, setSetting] = useState(Setting.NONE);

  const handleChange = (panel: Setting) => (event: any, expanded: boolean): void => {
    setSetting(expanded ? panel : Setting.NONE);
  };

  const classes = useStyles();
  return (
    <>
      <ExpansionPanel expanded={setting === Setting.GLOBAL} onChange={handleChange(Setting.GLOBAL)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Box className={classes.summary}>
            <div className={classes.icon}>
              <SettingsIcon />
            </div>
            <div>
              <Typography variant="subtitle1">Global Settings</Typography>
              <Typography variant="caption" color="textSecondary">
                adjust global parameters of the scene
              </Typography>
            </div>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelRoot}>
            <GlobalOptions />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={setting === Setting.DIRECTIONAL} onChange={handleChange(Setting.DIRECTIONAL)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Box className={classes.summary}>
            <LightToggle light={Illumination.ESceneLight.DIRECTIONAL} />
            <Typography variant="subtitle1">Directional Light</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelRoot}>
            <DirectionalLightOptions />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={setting === Setting.SPOT} onChange={handleChange(Setting.SPOT)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Box className={classes.summary}>
            <LightToggle light={Illumination.ESceneLight.SPOT} />
            <Typography variant="subtitle1">Spotlight</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelRoot}>
            <SpotLightOptions />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={setting === Setting.POINT} onChange={handleChange(Setting.POINT)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Box className={classes.summary}>
            <LightToggle light={Illumination.ESceneLight.POINT} />
            <Typography variant="subtitle1">Point Light</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.panelRoot}>
            <PointLightOptions />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default LightSettings;
