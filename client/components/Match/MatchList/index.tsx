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
    display: flex;
    align-items: center;

    .champion-image {
      display: flex;

      .champion-level {
        & > img {
          height: 37px;
          width: 37px;
        }

        span {
          position: absolute;
          top: 26px;
          left: 8px;
          color: #fff;
          text-shadow: 1px 0px 2px #000;
          font-weight: bold;
        }
      }

      .summoner-spells {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 5px;

        & > img {
          height: 17px;
          width: 17px;
        }
      }
    }

    .champion-name {
      padding-left: 10px;
      width: 100px;
    }

    .game-mode {
      padding-left: 20px;
      width: 165px;
    }

    .items {
      display: flex;
      padding: 0 15px;

      .view {
        padding: 0 5px;

        .item-icon {
          height: 37px;
          width: 37px;
          
          & > .no-image {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(84, 84, 84, 0.3);
            border-top: 1px solid rgba(84, 84, 84, 0.3);
            border-bottom: 1px solid rgba(255, 255, 255, 0.6);
            border-right: 1px solid rgba(255, 255, 255, 0.6);
            height: 37px;
            width: 37px;
          }

          & > img {
            height: 37px;
            width: 37px;
          }
        }
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
            <div className="champion-level">
              <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt="champion" />
              <span>{champLevel}</span>
            </div>
            <div className="summoner-spells">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1}`} alt="summoner spell 1" />
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2}`} alt="summoner spell 2" />
            </div>
          </div>
        </div>
        <span className="champion-name">{championName}</span>
        <div className="game-mode">{gameMode}</div>
        <div className="items">
          {[item0, item1, item2, item3, item4, item5, item6].map((item) => (
            <div id="view-751" className="view">
              <div id="binding-778" className="item-icon binding">
                {item === 0 ? (
                  <div className="no-image" />
                ) : (
                  <img src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${item}.png`} alt={`${item}.png`} />
                )}
              </div>
            </div>
          ))}
        </div>

        <span>{new Date(gameCreation).toLocaleDateString()}</span>
      </div>
    </MatchStyled>
  );
};
