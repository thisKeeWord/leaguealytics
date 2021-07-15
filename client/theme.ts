import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    MuiScopedCssBaseline: {
      root: {
        height: '100%',
      },
    },
  },
});

export default theme;
export type Theme = typeof theme;
