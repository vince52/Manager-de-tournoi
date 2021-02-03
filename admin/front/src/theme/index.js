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
      main: '#08D549'//'#08D549'
    },
    secondary: {
      main: '#900DFF'
    },
    text: {
      primary: colors.common.white,
      secondary: "#16ded2"
    }
  },
  shadows,
  typography
});

export default theme;
