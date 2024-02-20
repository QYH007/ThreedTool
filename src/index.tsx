import './index.css';

import { ThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './Navigation';
import { Routes } from './routes';
import cgTheme from './styles';

function App(): JSX.Element {
  return (
    <Router>
      <ThemeProvider theme={cgTheme}>
        <Navigation />
        <Routes />
      </ThemeProvider>
    </Router>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
