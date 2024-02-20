import {
  createStyles,
  Divider,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  Theme,
  Typography,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PanelAppear } from '../../../../components/layouts/surfaces/PanelAppear';
import PanelTopRight from '../../../../components/layouts/surfaces/PanelTopRight';
import { useTexturingStore } from '../../../../stores/texturing/store';
import { EMultimappingObject } from '../../../../types/texturingUnit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
    toggleGroup: {
      width: '100%',
    },
    button: {
      width: '50%',
    },
    selected: {
      '&$selected': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  }),
);

function MultimappingGUI(): ReactElement {
  const multimapping = useTexturingStore((store) => store.multimapping);

  const classes = useStyles();
  return (
    <PanelTopRight>
      <PanelAppear>
        <Typography variant="h5">{multimapping.object}</Typography>
        <Divider />
        <Typography variant="body1">toggle maps</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={multimapping.albedo}
                onChange={(): void => multimapping.toggleMap('albedo')}
              />
            }
            label="color"
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={multimapping.normal}
                onChange={(): void => multimapping.toggleMap('normal')}
              />
            }
            label="normal"
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={multimapping.roughness}
                onChange={(): void => multimapping.toggleMap('roughness')}
              />
            }
            label="roughness"
          />
          <FormControlLabel
            control={
              <Switch color="primary" checked={multimapping.ao} onChange={(): void => multimapping.toggleMap('ao')} />
            }
            label="occlusion"
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={multimapping.displacement}
                onChange={(): void => multimapping.toggleMap('displacement')}
              />
            }
            label="displacement"
          />
        </FormGroup>
        <Divider style={{ marginBottom: '0.5em' }} />
        <ToggleButtonGroup exclusive className={classes.toggleGroup}>
          <ToggleButton
            size="small"
            classes={{
              selected: classes.selected,
            }}
            className={classes.button}
            onClick={(): void => multimapping.setMultimapObject(EMultimappingObject.RUST)}
            selected={multimapping.object === EMultimappingObject.RUST}
            key={uuidv4()}
            value={'toggle'}
          >
            <Typography>Rust</Typography>
          </ToggleButton>
          <ToggleButton
            size="small"
            classes={{
              selected: classes.selected,
            }}
            className={classes.button}
            onClick={(): void => multimapping.setMultimapObject(EMultimappingObject.BRICK)}
            selected={multimapping.object === EMultimappingObject.BRICK}
            key={uuidv4()}
            value={'toggle'}
          >
            <Typography>Brick</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </PanelAppear>
    </PanelTopRight>
  );
}

export default MultimappingGUI;
