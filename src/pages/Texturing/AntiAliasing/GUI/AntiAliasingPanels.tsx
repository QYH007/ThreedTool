import { createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';

import DialogWithButton from '../../../../components/feedback/DialogWithButton';
import { useTexturingStore } from '../../../../stores/texturing/store';
import { AntiAliasingOptionsDropdown } from './AntiAliasingOptionsDropdown';
import { MipmapImage } from './MipmapImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1, 0),
      width: '100%',
    },
    panelLeft: {
      position: 'absolute',
      bottom: '10%',
      left: 0,
      padding: theme.spacing(3, 2),
      margin: theme.spacing(1),
      width: 300,
    },
    panelRight: {
      position: 'absolute',
      bottom: '10%',
      right: 0,
      padding: theme.spacing(3, 2),
      margin: theme.spacing(1),
      width: 300,
    },
    details: {
      marginBottom: '1em',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
  }),
);

export const AntiAliasingPanels: React.FC = () => {
  const { leftStrip, rightStrip, setLeftStrip, setRightStrip } = useTexturingStore((store) => store.aliasing);

  const leftTitle = 'Triangles';
  const rightTitle = 'Squares';

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.panelLeft}>
        <div className={classes.details}>
          <DialogWithButton buttonTitle="Mipmap">
            <Typography variant="h5" style={{ marginBottom: '8px' }}>
              Mipmap Textures
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
              The following textures represent the different Mipmap levels starting at (128px x 128px), (64px x 64px),
              (32px x 32px), ...
            </Typography>
            <MipmapImage triangles={true} />
          </DialogWithButton>
        </div>
        <AntiAliasingOptionsDropdown title={leftTitle} strip={leftStrip} setStrip={setLeftStrip} />
      </Paper>
      <Paper className={classes.panelRight}>
        <div className={classes.details}>
          <DialogWithButton buttonTitle="Mipmap">
            <Typography variant="h5" style={{ marginBottom: '8px' }}>
              Mipmap Textures
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
              The following textures represent the different Mipmap levels starting at (128px x 128px), (64px x 64px),
              (32px x 32px), ...
            </Typography>
            <MipmapImage triangles={false} />
          </DialogWithButton>
        </div>
        <AntiAliasingOptionsDropdown title={rightTitle} strip={rightStrip} setStrip={setRightStrip} />
      </Paper>
    </div>
  );
};
