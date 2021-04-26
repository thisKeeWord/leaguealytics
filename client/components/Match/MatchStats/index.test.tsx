import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { MatchStats } from '.';

jest.mock('./MatchSummary');

describe('MatchStats', () => {
  it('returns null if no currentPlayer exists', () => {
    const match = { matchId: faker.random.alphaNumeric() };

    const { queryAllByTestId } = render(
      <MatchStats
        match={match}
        currentPlayer={{}}
      />,
    );

    expect(queryAllByTestId('match-summary')).toHaveLength(0);
  });

  it('returns null if no matchId exists', () => {
    const currentPlayer = { summonerId: faker.random.alphaNumeric() };

    const { queryAllByTestId } = render(
      <MatchStats
        match={{}}
        currentPlayer={currentPlayer}
      />,
    );

    expect(queryAllByTestId('match-summary')).toHaveLength(0);
  });

  it('renders MatchSummary', () => {
    const match = { matchId: faker.random.alphaNumeric() };
    const currentPlayer = { summonerId: faker.random.alphaNumeric() };

    const { getByTestId } = render(
      <MatchStats
        match={match}
        currentPlayer={currentPlayer}
      />,
    );

    expect(getByTestId('match-summary')).toBeInTheDocument();
  });
});
