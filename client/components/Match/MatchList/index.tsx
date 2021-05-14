import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { selectSummonersData } from '../../../state';
import { getSummoners, numberFormatter } from '../../../../utils/helper';
import { MatchStyled } from './styles';

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
  summoner1Id: number;
  summoner2Id: number;
  victory: boolean;
  goldEarned: number;
  creepScore: number;
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
    creepScore,
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
    >
      <div className={cx('match-button', { win: victory, loss: !victory, active: isActiveMatch })}>
        <div className="base-info">
          <div className="champion-image">
            <div className="champion-level">
              <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt="champion" />
            </div>
            <div className="level-spells">
              <div className="spells">
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1}`} alt="summoner spell 1" />
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2}`} alt="summoner spell 2" />
              </div>
              <span>{champLevel}</span>
            </div>
          </div>
        </div>
        <span className="champion-name">{championName}</span>
        <div className="game-mode">{gameMode}</div>
        <div className="items">
          {[item0, item1, item2, item3, item4, item5, item6].map((item, index) => (
            <div className="view" key={index}>
              <div className="item-icon binding">
                {item === 0 ? (
                  <div className="no-image" />
                ) : (
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt={`${item}.png`} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="stat">
          <span className="gold">
            <img className="label" src="../../../images/gold.png" alt="gold" />
            {numberFormatter(goldEarned)}
          </span>
          <span className="cs">
            <img className="label" src="../../../images/minions.png" alt="cs" />
            {creepScore}
          </span>
          <span className="kda">
            <img className="label" src="../../../images/kda.png" alt="kda" />
            {kills}
            /
            {deaths}
            /
            {assists}
          </span>
        </div>

        <div className="match-time">
          <span className="date">{new Date(gameCreation).toLocaleDateString()}</span>
          <span className="duration">{new Date(gameDuration).toISOString().substr(11, 8)}</span>
        </div>

      </div>
    </MatchStyled>
  );
};
