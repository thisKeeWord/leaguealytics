import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { selectSummonersData } from '../../../state';
import { getSummoners } from '../../../../utils/helper';

interface MatchListProps {
  // eslint-disable-next-line no-unused-vars
  handleClick: (matchId: string) => void;
  version: number | string;
  gameCreation: Date;
  gameDuration: number;
  gameMode: string;
  championName: string;
  matchId: string;
  champLevel: number;
  deaths: number;
  kills: number;
  assists: number;
  queueId: number;
  summoner1Id: number;
  summoner2Id: number;
  victory: boolean;
  goldEarned: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  isActiveMatch: boolean;
  role?: 'button';
}

const MatchStyled = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;

  &.active {
    background-color: #dcdcdc;
  }

  &:hover {
    background-color: #dcdcdc;
  }

  .match-button {
    padding: 7px;
    width: 100%;

    .champion-image {
      & > img {
        height: 30px;
        width: 30px;
      }
    }
  }
`;

export const MatchList: FunctionComponent<MatchListProps> = (
  props: MatchListProps,
) => {
  const {
    version,
    gameCreation,
    gameDuration,
    gameMode,
    championName,
    matchId,
    champLevel,
    deaths,
    kills,
    assists,
    queueId,
    summoner1Id,
    summoner2Id,
    victory,
    goldEarned,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    isActiveMatch,
    role,
    handleClick,
  } = props;

  const summoners = useSelector(selectSummonersData);
  const summonersList = summoners?.data;

  const { spell1, spell2 } = getSummoners(summonersList, { summoner1Id, summoner2Id });

  return (
    <MatchStyled
      data-testid="input"
      role={role}
      onClick={() => handleClick(matchId)}
      className={cx({ active: isActiveMatch })}
    >
      <div className="match-button">
        <div className="base-info">
          <div className="champion-image">
            <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt="champion" />
            {champLevel}
            <div className="summoner-spells">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1}`} alt="summoner spell 1" />
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2}`} alt="summoner spell 2" />
            </div>
          </div>
          <span>{championName}</span>
        </div>
        <div className="game-mode">{gameMode}</div>
        <span>{new Date(gameCreation).toLocaleDateString()}</span>
      </div>
    </MatchStyled>
  );
};
