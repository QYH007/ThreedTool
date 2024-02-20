import produce, { Draft } from 'immer';

import { initialState } from '../initialState';
import { EShadingModel, State } from '../types';

export interface Config {
  name: string;
  config: State;
}

export const initialConfig: Config = {
  name: 'Default',
  config: { ...initialState },
};

const allLightsOn: Config = {
  name: 'All Lights',
  config: produce(initialState, (draft: Draft<State>) => {
    draft.lights.point.isActive = true;
    draft.lights.spot.isActive = true;
    draft.lights.directional.isActive = true;
  }),
};

const allLightsOnWithHelpers: Config = {
  name: 'All Lights With Helpers',
  config: produce(initialState, (draft: Draft<State>) => {
    draft.lights.point.isActive = true;
    draft.lights.point.showHelper = true;
    draft.lights.spot.isActive = true;
    draft.lights.spot.showHelper = true;
    draft.lights.directional.isActive = true;
    draft.lights.directional.showHelper = true;
  }),
};

const gouraudShading: Config = {
  name: 'Shading: Gouraud',
  config: produce(initialState, (draft: Draft<State>) => {
    draft.objects.box.forEach((o) => (o.shadingModel = EShadingModel.GOURAUD));
    draft.objects.torus.forEach((o) => (o.shadingModel = EShadingModel.GOURAUD));
    draft.objects.sphere.forEach((o) => (o.shadingModel = EShadingModel.GOURAUD));
  }),
};

const phongShading: Config = {
  name: 'Shading: Phong',
  config: produce(initialState, (draft: Draft<State>) => {
    draft.objects.box.forEach((o) => (o.shadingModel = EShadingModel.PHONG));
    draft.objects.torus.forEach((o) => (o.shadingModel = EShadingModel.PHONG));
    draft.objects.sphere.forEach((o) => (o.shadingModel = EShadingModel.PHONG));
    draft.globals.shadingModel = 'phong';
  }),
};

const flatShading: Config = {
  name: 'Shading: Flat',
  config: produce(initialState, (draft: Draft<State>) => {
    draft.globals.shadingModel = 'flat';
    draft.objects.box.forEach((o) => {
      o.shadingModel = EShadingModel.PHONG;
      o.shadingParameters.phong.flat = true;
    });
    draft.objects.torus.forEach((o) => {
      o.shadingModel = EShadingModel.PHONG;
      o.shadingParameters.phong.flat = true;
    });
    draft.objects.sphere.forEach((o) => {
      o.shadingModel = EShadingModel.PHONG;
      o.shadingParameters.phong.flat = true;
    });
  }),
};

export const premades = [initialConfig, allLightsOn, allLightsOnWithHelpers, gouraudShading, phongShading, flatShading];
