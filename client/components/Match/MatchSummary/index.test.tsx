import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { Provider } from 'react-redux';
import { MatchSummary } from '.';
import store from '../../../state';

describe('MatchSummary', () => {
  it('returns null if no patchData', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };
    const match = { participants: [], teams: [] };

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <MatchSummary
          match={match}
          currentPlayer={currentPlayer}
        />

      </Provider>,
    );

    expect(queryAllByTestId('match-stats')).toHaveLength(0);
  });

  it('returns null if no currentPlayer.participantId exists', () => {
    const match = { participants: [], teams: [] };

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <MatchSummary
          match={match}
          currentPlayer={{}}
        />

      </Provider>,
    );

    expect(queryAllByTestId('match-stats')).toHaveLength(0);
  });

  it('returns null if no match.teams exists', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };
    const match = { participants: [] };

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <MatchSummary
          match={match}
          currentPlayer={currentPlayer}
        />

      </Provider>,
    );

    expect(queryAllByTestId('match-stats')).toHaveLength(0);
  });

  it('returns null if no match.participants exists', () => {
    const currentPlayer = { participantId: faker.random.alphaNumeric() };
    const match = { teams: [] };

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <MatchSummary
          match={match}
          currentPlayer={currentPlayer}
        />

      </Provider>,
    );

    expect(queryAllByTestId('match-stats')).toHaveLength(0);
  });
});
