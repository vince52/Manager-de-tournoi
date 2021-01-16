import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#2C2F33',
      default: '#23272A',
      paper: '#23272A'
    },
    primary: {
      main: '#8B0000'
    },
    secondary: {
      main: '#23272A'
    },
    text: {
      primary: colors.common.white,
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
