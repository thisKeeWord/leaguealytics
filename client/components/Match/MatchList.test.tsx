import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import faker from 'faker';
import { MatchList } from './MatchList';

describe('MatchList', () => {
  it('should render an input', () => {
    const onClick = () => jest.fn();
    const version = faker.datatype.number();
    const timestamp = new Date();
    const championImg = faker.lorem.word();
    const gameId = faker.datatype.number();

    const { getByTestId } = render(
      <MatchList
        handleClick={onClick}
        version={version}
        timestamp={timestamp}
        championImg={championImg}
        gameId={gameId}
      />,
    );

    const input = getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  it('should call the handleClick handler with the gameId', () => {
    const onClick = jest.fn();
    const version = faker.datatype.number();
    const timestamp = new Date();
    const championImg = faker.lorem.word();
    const gameId = faker.datatype.number();

    const { getByTestId } = render(
      <MatchList
        handleClick={onClick}
        version={version}
        timestamp={timestamp}
        championImg={championImg}
        gameId={gameId}
      />,
    );

    const input = getByTestId('input');
    fireEvent.click(input);

    expect(onClick).toHaveBeenCalledWith(gameId);
  });
});
