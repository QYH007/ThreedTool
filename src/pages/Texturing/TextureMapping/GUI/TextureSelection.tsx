import {
  Box,
  Collapse,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PanoramaVerticalIcon from '@material-ui/icons/PanoramaVertical';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useState } from 'react';

import { useTexturingStore } from '../../../../stores/texturing/store';
import { Axis } from '../../../../types/common';
import { EProjection } from '../../../../types/texturingUnit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const TextureSelection = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const { active, setActiveProjection, setActiveProjectionAxis } = useTexturingStore((store) => store.textureMapping);

  const classes = useStyles();

  const planarIcon = <AppsIcon />;
  const sphericalIcon = <BlurCircularIcon />;
  const cylindricalIcon = <PanoramaVerticalIcon />;

  return (
    <Paper>
      <ExpansionPanel expanded={open} onChange={(): void => setOpen(!open)}>
        <ExpansionPanelSummary className={classes.root} expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography variant="h6">Projection</Typography>
            <Typography variant="caption">type of texture mapping</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: 0 }}>
          <List style={{ width: '100%' }}>
            <ListItem
              button
              selected={active.type === EProjection.PLANAR}
              onClick={(): void => setActiveProjection(EProjection.PLANAR)}
            >
              <ListItemIcon>{planarIcon}</ListItemIcon>
              <ListItemText primary="Planar" />
            </ListItem>
            <Collapse in={active.type === EProjection.PLANAR} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.X)}>
                  <ListItemIcon>
                    {active.axis === Axis.X ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="project onto XY Plane" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.Y)}>
                  <ListItemIcon>
                    {active.axis === Axis.Y ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="project onto YZ Plane" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.Z)}>
                  <ListItemIcon>
                    {active.axis === Axis.Z ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="project onto XZ Plane" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              selected={active.type === EProjection.SPHERICAL}
              onClick={(): void => setActiveProjection(EProjection.SPHERICAL)}
            >
              <ListItemIcon>{sphericalIcon}</ListItemIcon>
              <ListItemText primary="Spherical" />
            </ListItem>

            <ListItem
              button
              selected={active.type === EProjection.CYLINDRICAL}
              onClick={(): void => setActiveProjection(EProjection.CYLINDRICAL)}
            >
              <ListItemIcon>{cylindricalIcon}</ListItemIcon>
              <ListItemText primary="Cylindrical" />
            </ListItem>
            <Collapse in={active.type === EProjection.CYLINDRICAL} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.X)}>
                  <ListItemIcon>
                    {active.axis === Axis.X ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="Y up" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.Y)}>
                  <ListItemIcon>
                    {active.axis === Axis.Y ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="X up" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={(): void => setActiveProjectionAxis(Axis.Z)}>
                  <ListItemIcon>
                    {active.axis === Axis.Z ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
                  </ListItemIcon>
                  <ListItemText primary="Z up" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

export default TextureSelection;
