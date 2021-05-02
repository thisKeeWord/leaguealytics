import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import faker from 'faker';
import { MatchList } from '.';
import store from '../../../state';

describe('MatchList', () => {
  it('should render an input', () => {
    const onClick = () => jest.fn();
    const version = faker.datatype.number();
    const gameCreation = new Date();
    const championName = faker.lorem.word();
    const matchId = faker.random.alphaNumeric();

    const { getByTestId } = render(
      <Provider store={store}>
        <MatchList
          handleClick={onClick}
          version={version}
          gameCreation={gameCreation}
          championName={championName}
          matchId={matchId}
          isActiveMatch={false}
          gameDuration={version}
          gameMode={matchId}
          champLevel={version}
          deaths={version}
          kills={version}
          assists={version}
          queueId={version}
          summoner1Id={version}
          summoner2Id={version}
          victory
          goldEarned={version}
          item0={version}
          item1={version}
          item2={version}
          item3={version}
          item4={version}
          item5={version}
          item6={version}
        />
      </Provider>,
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
      <Provider store={store}>
        <MatchList
          handleClick={onClick}
          version={version}
          gameCreation={gameCreation}
          championName={championName}
          matchId={matchId}
          isActiveMatch={false}
          gameDuration={version}
          gameMode={matchId}
          champLevel={version}
          deaths={version}
          kills={version}
          assists={version}
          queueId={version}
          summoner1Id={version}
          summoner2Id={version}
          victory
          goldEarned={version}
          item0={version}
          item1={version}
          item2={version}
          item3={version}
          item4={version}
          item5={version}
          item6={version}
        />
      </Provider>,
    );

    const input = getByTestId('input');
    fireEvent.click(input);

    expect(onClick).toHaveBeenCalledWith(matchId);
  });
});
