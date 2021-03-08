import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline/ScopedCssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import store from './../state';
import App from './App';
import theme from '../theme';

const Main: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('content'));
