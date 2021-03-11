import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import App from '.';
import store from '../../state';

describe('App', () => {
  it('should render the app', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByTestId('app')).toBeInTheDocument();
  });
});
