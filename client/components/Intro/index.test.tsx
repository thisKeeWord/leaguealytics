import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import Intro from '.';

describe('Intro', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;

  beforeEach(() => {
    renderer = render(<Intro />);
    getByTestId = renderer.getByTestId;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays the application title', () => {
    expect(getByTestId('title')).toHaveTextContent('Leaguealytics');
  });

  it('displays the restriction disclaimer', () => {
    // eslint-disable-next-line max-len
    expect(getByTestId('restriction-disclaimer')).toHaveTextContent('Only summoners in the North America server is supported at the moment since this started off as just a practice project.');
  });
});
