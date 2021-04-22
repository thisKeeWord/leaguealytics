import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiScopedCssBaseline: {
      root: {
        height: '100%',
        minWidth: '1000px',
      },
    },
  },
});

export default theme;
export type Theme = typeof theme;
