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
    expect(getByTestId('restriction-disclaimer')).toHaveTextContent(
      // eslint-disable-next-line max-len
      'NOTE: Only summoners in the North America server is supported at the moment.Should there be a number of requests to support other regions, it will be highly considered to add support for the remaining regions. Keep in mind that this would require addtional time and maintenance, especially having only a single developer on this project.',
    );
  });
});
