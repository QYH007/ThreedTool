import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IlluminationPage } from '../pages/Illumination/IlluminationPage';
import { PolygonalModelsPage } from '../pages/PolygonalModels/PolygonalModelsPage';
import { TexturingPage } from '../pages/Texturing/TexturingPage';
import { TransformationsPage } from '../pages/Transformations/TransformationsPage';
import { PBRPage } from '../pages/PBR/PBRPage';
import { AOPage } from '../pages/AO/AOPage';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={PolygonalModelsPage} />
      <Route path="/models" component={PolygonalModelsPage} />
      <Route path="/transformations" component={TransformationsPage} />
      <Route path="/illumination" component={IlluminationPage} />
      <Route path="/texturing" component={TexturingPage} />
      <Route path="/pbr" component={PBRPage} />
      <Route path="/ao" component={AOPage} />
    </Switch>
  );
};

export default Routes;
