import red from '@material-ui/core/colors/red';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// A custom theme for this app
const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2F4858',
    },
    secondary: {
      main: '#70C1B3',
    },
    error: {
      main: red.A400,
    },
  },
});

export default responsiveFontSizes(mainTheme);
