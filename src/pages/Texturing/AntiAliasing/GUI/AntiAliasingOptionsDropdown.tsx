import {
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import * as THREE from 'three';

import { FilterTexture } from '../../../../types/texturingUnit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1, 0),
      width: '100%',
    },
    mipmap: {
      position: 'absolute',
      top: '1em',
      left: '64px',
    },
  }),
);

interface Props {
  title: string;
  strip: FilterTexture;
  setStrip: (texture: FilterTexture) => void;
}

export function AntiAliasingOptionsDropdown({ title, strip, setStrip }: Props): JSX.Element {
  const [minFilter, setMinFilter] = React.useState(strip.minFiler);
  const [magFilter, setMagFilter] = React.useState(strip.magFiler);

  const handleMinFilterChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setMinFilter(event.target.value as THREE.TextureFilter);
    setStrip({ ...strip, minFiler: event.target.value as THREE.TextureFilter });
  };

  const handleMagFilterChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setMagFilter(event.target.value as THREE.TextureFilter);
    setStrip({ ...strip, magFiler: event.target.value as THREE.TextureFilter });
  };

  const handleCreateMipMap = (): void => {
    setStrip({ ...strip, createMipMap: !strip.createMipMap });
  };

  let explanationMinFilter = '';
  switch (minFilter) {
    case THREE.NearestFilter:
      explanationMinFilter = 'Take the texel nearest to the center of the pixel) to produce a texture value.';
      break;
    case THREE.NearestMipmapNearestFilter:
      explanationMinFilter =
        'Chooses the mipmap that most closely matches the size of the pixel being textured and uses the NearestFilter criterion (the texel nearest to the center of the pixel) to produce a texture value.';
      break;
    case THREE.NearestMipmapLinearFilter:
      explanationMinFilter =
        'Chooses the two mipmaps that most closely match the size of the pixel being textured and uses the NearestFilter criterion to produce a texture value from each mipmap. The final texture value is a weighted average of those two values.';
      break;
    case THREE.LinearFilter:
      explanationMinFilter =
        'Creates a weighted average of the four texels that are closest to the center of the pixel to produce a texture value.';
      break;
    case THREE.LinearMipmapNearestFilter:
      explanationMinFilter =
        'Chooses the mipmap that most closely matches the size of the pixel being textured and uses the LinearFilter criterion (a weighted average of the four texels that are closest to the center of the pixel) to produce a texture value.';
      break;
    case THREE.LinearMipmapLinearFilter:
      explanationMinFilter =
        'Chooses the two mipmaps that most closely match the size of the pixel being textured and uses the LinearFilter criterion (a weighted average of the four texels that are closest to the center of the pixel) to produce a texture value from each mipmap. The final texture value is a weighted average of those two values.';
      break;
    default:
      break;
  }

  let explanationMagFilter = '';
  switch (magFilter) {
    case THREE.NearestFilter:
      explanationMagFilter =
        'Returns the value of the texture element that is nearest (in Manhattan distance) to the specified texture coordinates.';
      break;
    case THREE.LinearFilter:
      explanationMagFilter =
        'Returns the weighted average of the four texture elements that are closest to the specified texture coordinates';
      break;

    default:
      break;
  }

  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-min-filter">minification filter</InputLabel>
        <Select id="select-min-filter" value={strip.minFiler} onChange={handleMinFilterChange}>
          <MenuItem value={THREE.NearestFilter}>NearestFilter (no mipmap)</MenuItem>
          <MenuItem value={THREE.NearestMipmapNearestFilter}>NearestMipmapNearestFilter</MenuItem>
          <MenuItem value={THREE.NearestMipmapLinearFilter}>NearestMipmapLinearFilter</MenuItem>
          <MenuItem value={THREE.LinearFilter}>LinearFilter (no mipmap)</MenuItem>
          <MenuItem value={THREE.LinearMipmapNearestFilter}>LinearMipmapNearestFilter</MenuItem>
          <MenuItem value={THREE.LinearMipmapLinearFilter}>LinearMipmapLinearFilter</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
        {explanationMinFilter}
      </Typography>
      <Divider style={{ margin: ' 8px 4px' }} />
      <FormControl className={classes.formControl}>
        <InputLabel id="label-mag-filter">magnification filter</InputLabel>
        <Select id="select-mag-filter" value={strip.magFiler} onChange={handleMagFilterChange}>
          <MenuItem value={THREE.NearestFilter}>NearestFilter </MenuItem>
          <MenuItem value={THREE.LinearFilter}>LinearFilter</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body2" style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
        {explanationMagFilter}
      </Typography>
      <FormControlLabel
        control={<Switch checked={strip.createMipMap} onChange={handleCreateMipMap} color="primary" />}
        label="Colored MipMap"
      />
    </div>
  );
}
