// good reference: https://cglearn.codelight.eu/pub/computer-graphics/shading-and-lighting#material-blinn-phong-lighting-model-1
import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { Appear } from '../../../../components/animations/Appear';
import { TopRightCloseButton } from '../../../../components/buttons/TopRightCloseButton';
import { ColorSelector } from '../../../../components/colorSelector/ColorSelector';
import { Illumination } from '../../../../stores';
import { ShadingModel } from './ShadingModel';
import { ShadingModelToggle } from './ShadingModelToggle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
    wrapper: {
      width: 300,
    },
    toggleGroup: {
      width: '100%',
    },
    button: {
      width: '33%',
    },
  }),
);

export const ObjectPanel = (): JSX.Element | null => {
  const actions = Illumination.useStore((store: Illumination.Store) => store.actions);
  const selectedObject = Illumination.useStore((store: Illumination.Store) => store.state.objects.selectedObject);
  const boxes = Illumination.useStore((store: Illumination.Store) => store.state.objects.box);
  const spheres = Illumination.useStore((store: Illumination.Store) => store.state.objects.sphere);
  const tori = Illumination.useStore((store: Illumination.Store) => store.state.objects.torus);

  const objects = React.useMemo(() => [...boxes, ...spheres, ...tori], [boxes, spheres, tori]);

  // combine all objects in the scene
  const objectData = objects.find((o) => o.id === selectedObject.id);

  const classes = useStyles();
  if ((objectData && objectData.id !== '') || objectData !== undefined) {
    return (
      <Appear>
        <TopRightCloseButton onClick={(): void => actions.selectObject('', Illumination.ESceneObject.SPHERE)} />
        <div className={classes.wrapper}>
          <Paper className={classes.root}>
            <Box textAlign="center">
              <Typography variant="h4">{objectData.type}</Typography>
            </Box>
            <Divider />
            <ColorSelector
              activeColor={objectData.color}
              onColorChange={(color): void => actions.setColor(objectData.id, color, objectData.type)}
            />
            <ShadingModelToggle objectData={objectData} setShadingModel={actions.setShadingModel} />
            <ShadingModel objectData={objectData} />
          </Paper>
        </div>
      </Appear>
    );
  } else {
    return null;
  }
};
