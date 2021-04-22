import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { MatchList } from './MatchList';

describe('MatchList', () => {
  it('should render an input', () => {
    const onClick = () => jest.fn();
    const version = faker.datatype.number();
    const gameCreation = new Date();
    const championName = faker.lorem.word();
    const matchId = faker.random.alphaNumeric();

    const { getByTestId } = render(
      <MatchList
        handleClick={onClick}
        version={version}
        gameCreation={gameCreation}
        championName={championName}
        matchId={matchId}
      />,
    );

    const input = getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  it('should call the handleClick handler with the matchId', () => {
    const onClick = jest.fn();
    const version = faker.datatype.number();
    const gameCreation = new Date();
    const championName = faker.lorem.word();
    const matchId = faker.random.alphaNumeric();

    const { getByTestId } = render(
      <MatchList
        handleClick={onClick}
        version={version}
        gameCreation={gameCreation}
        championName={championName}
        matchId={matchId}
      />,
    );

    const input = getByTestId('input');
    fireEvent.click(input);

    expect(onClick).toHaveBeenCalledWith(matchId);
  });
});
