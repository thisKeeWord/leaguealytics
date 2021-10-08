import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '.';
import store from '../../state';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: '',
    search: '',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
  Link: (className: string, to: string, children: ReactNode) => (
    <a href={to} className={className}>{children}</a>
  ),
}));

describe('App', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;
  let queryByTestId: Function;

  beforeEach(() => {
    renderer = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    getByTestId = renderer.getByTestId;
    queryByTestId = renderer.queryByTestId;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays the Intro if no state exists', () => {
    expect(getByTestId('intro')).toBeInTheDocument();
  });

  it('renders a form', () => {
    expect(getByTestId('form')).toBeInTheDocument();
  });

  it('does not render a match with empty redux state', () => {
    expect(queryByTestId('match')).not.toBeInTheDocument();
  });

  it('does not display the refresh button if no user id', () => {
    expect(queryByTestId('refresh')).not.toBeInTheDocument();
  });
});
