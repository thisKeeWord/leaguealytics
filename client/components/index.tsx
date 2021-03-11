import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
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
          <Router>
            <Route path='/' exact component={App} />
            <Route path='/:name' component={App} />
          </Router>
        </ReduxProvider>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById('content'));
