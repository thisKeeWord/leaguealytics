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
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    );

    expect(queryAllByTestId('timeline')).toHaveLength(0);
  });

  it('displays the slider', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };

    const { getByTestId } = render(
      <MatchTimeline
        timeline={[{ events: [], timestamp: faker.datatype.number() }]}
        currentPlayer={currentPlayer}
        mapId={faker.datatype.number()}
        participants={[]}
        version={faker.datatype.number()}
        matchId={faker.random.alphaNumeric()}
      />,
    );

    expect(getByTestId('slider')).toBeInTheDocument();
  });
});
