import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import MatchTimeline from '.';

describe('MatchTimeline', () => {
  it('returns null if no timeline', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };

    const { queryAllByTestId } = render(
      <MatchTimeline
        timeline={[]}
        currentPlayer={currentPlayer}
      />,
    );

    expect(queryAllByTestId('timeline')).toHaveLength(0);
  });

  it('displays the slider', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };

    const { getByTestId } = render(
      <MatchTimeline
        timeline={[{ timestamp: faker.datatype.number() }]}
        currentPlayer={currentPlayer}
      />,
    );

    expect(getByTestId('slider')).toBeInTheDocument();
  });
});
