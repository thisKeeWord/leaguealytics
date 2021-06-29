import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
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
  championImg: string;
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

const MatchList: FunctionComponent<MatchListProps> = (
  props: MatchListProps,
) => {
  const {
    version,
    gameCreation,
    gameDuration,
    gameMode,
    championName,
    championImg,
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
    <MatchStyled data-testid="input" role={role} onClick={() => handleClick(matchId)}>
      <div className={cx('match-button', { win: victory, loss: !victory, active: isActiveMatch })}>
        <div className="base-info">
          <div className="champion-image">
            <div className="champion-level">
              <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championImg}.png`} alt="champion" />
              <span>{champLevel}</span>
            </div>
            <div className="summoner-spells">
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell1}`} alt="summoner spell 1" />
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell2}`} alt="summoner spell 2" />
            </div>
          </div>
          <span className="champion-name" title={championName}>{championName}</span>
        </div>
        <div className="game-mode" title={gameMode}>{gameMode}</div>
        <div className="items">
          <div className="item-set-1">
            {[item0, item1, item2, item3, item4, item5].map((item, index) => (
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
          <div className="default-1-4">
            <div className="inventory-trinket">
              <div className="item-icon binding">
                {item6 === 0 ? (
                  <div className="no-image" />
                ) : (
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item6}.png`} alt={`${item6}`} />
                )}
              </div>
            </div>
          </div>
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

export default MatchList;
