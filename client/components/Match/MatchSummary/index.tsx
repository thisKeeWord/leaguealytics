import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { getSummoners, numberFormatter } from '../../../../utils/helper';
import { selectPatchData, selectSummonersData } from '../../../state';
import Chart from '../../Chart';

import { MatchSummaryStyled } from './styles';

interface MatchSummaryProps {
  match: Record<any, any>;
  currentPlayer: Record<any, any>
}

export const MatchSummary: FunctionComponent<MatchSummaryProps> = (
  props: MatchSummaryProps,
) => {
  const patchData = useSelector(selectPatchData);
  const summoners = useSelector(selectSummonersData);
  const summonersList = summoners?.data;

  const { currentPlayer, match } = props;

  if (
    !patchData
    || !currentPlayer.participantId
    || !match.participants
    || !match.teams
  ) {
    return null;
  }

  const { participants, teams } = match;

  const statsData = participants.map(
    ({
      participantId,
      championId,
      championName,
      totalDamageDealtToChampions,
      totalDamageTaken,
      goldEarned,
      kills,
      assists,
      deaths,
      totalMinionsKilled,
      neutralMinionsKilled,
      teamId,
      summonerName,
      // eslint-disable-next-line array-callback-return
    }) => {
      // eslint-disable-next-line no-restricted-syntax, prefer-const
      for (let championData in patchData.patchData) {
        if (patchData.patchData[championData].key == championId) {
          const teamStats = teams.find(
            (team: Record<any, any>) => team.teamId === teamId,
          );
          return {
            champion: championName,
            // eslint-disable-next-line max-len
            player: summonerName,
            participantId,
            damageDealt: totalDamageDealtToChampions,
            damageTaken: totalDamageTaken,
            goldEarned,
            kills,
            assists,
            deaths,
            killParticipation:
                teamStats.kills === 0
                  ? 0
                  : ((kills + assists) / teamStats.kills) * 100,
            deathShare:
                teamStats.deaths === 0
                  ? 0
                  : (deaths / teamStats.deaths) * 100,
            creepScore: totalMinionsKilled + neutralMinionsKilled,
            isCurrentPlayer:
                props.currentPlayer.participantId == participantId,
            team: teamId,
          };
        }
      }
    },
  );
  // console.log(props.match, 'props.match');

  const totalDamageDealtStat = parseStats(statsData, 'damageDealt');
  const totalDamageTakenStat = parseStats(statsData, 'damageTaken');
  const goldEarnedStat = parseStats(statsData, 'goldEarned');
  const killsStat = parseStats(statsData, 'kills');
  const assistsStat = parseStats(statsData, 'assists');
  const killParticipationStat = parseStats(statsData, 'killParticipation');
  const deathStat = parseStats(statsData, 'deaths');
  const deathShareStat = parseStats(statsData, 'deathShare');
  const creepScoreStat = parseStats(statsData, 'creepScore');

  const team100 = participants.filter(({ teamId }) => teamId === 100);
  const team200 = participants.filter(({ teamId }) => teamId === 200);

  return (
    <MatchSummaryStyled>
      <div className="content-border">

        <div className="match-overview">
          <div className="by-teams">
            {[team100, team200].map((team, index) => (
              <div className={cx({ 'team-100': index === 0, 'team-200': index === 1 })}>
                <div className={cx('team-summary', { blue: index === 0, red: index === 1 })}>
                  <div className={cx('team-marker', { blue: index === 0, red: index === 1 })} />
                  <div className={cx('team-gem', { blue: index === 0, red: index === 1 })} />
                  <div className="game-conclusion">{teams[index].win ? 'VICTORY' : 'DEFEAT'}</div>
                  <div className="gold">{numberFormatter(teams[index].goldEarned)}</div>
                  <div className="kills">{teams[index].kills}</div>
                </div>
                <div className={cx('icon-bar', { blue: index === 0, red: index === 1 })}>
                  <div className={cx('team-bar', { blue: index === 0, red: index === 1 })} />
                  <div className="champion champion-col" />
                  <div className="kills kills-col" />
                  <div className="items items-col" />
                  <div className="minions minions-col" />
                  <div className="gold gold-col" />
                </div>
                {team.map(({
                  item0,
                  item1,
                  item2,
                  item3,
                  item4,
                  item5,
                  item6,
                  goldEarned,
                  summonerName,
                  summoner1Id,
                  summoner2Id,
                  championName,
                  champLevel,
                  kills,
                  assists,
                  deaths,
                  totalMinionsKilled,
                  neutralMinionsKilled,
                  teamId,
                  summonerId,
                }) => {
                  // eslint-disable-next-line max-len
                  const { spell1, spell2 } = getSummoners(summonersList, { summoner1Id, summoner2Id });
                  return (
                    <div className={cx('match-summary', { team100: teamId === 100, team200: teamId === 200, currentUser: currentPlayer.summonerId === summonerId })} key={summonerName}>
                      <div className={cx('team', { blue: teamId === 100, red: teamId === 200 })} />
                      <div className="section-1">
                        <div className="champion-image">
                          <div className="champion-level">
                            <img src={`http://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/champion/${championName}.png`} alt="champion" />
                            <span>{champLevel}</span>
                          </div>
                          <div className="summoner-spells">
                            <div className="spell1">
                              {spell1 && <img src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/spell/${spell1}`} alt="spell 1" />}
                            </div>
                            <div className="spell2">
                              {spell2 && <img src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/spell/${spell2}`} alt="spell 2" />}
                            </div>
                          </div>
                        </div>
                        <span className="summonerName">{summonerName}</span>
                        <span className="kda">
                          {kills}
                          /
                          {deaths}
                          /
                          {assists}
                        </span>
                      </div>
                      <div className="items-list">
                        <div className="item-set-1">
                          {[item0, item1, item2, item3, item4, item5].map((item, index) => (
                            <div id="view-751" className="view" key={index}>
                              <div id="binding-778" className="item-icon binding">
                                {item === 0 ? (
                                  <div className="no-image" />
                                ) : (
                                  <img src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/item/${item}.png`} alt={`${item}.png`} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="default-1-4">
                          <div id="inventory-trinket-8887" className="inventory-trinket">
                            <div id="binding-9629" className="item-icon binding">
                              <div data-rg-name="item_11.7.1" data-rg-id="3340">
                                {item6 === 0 ? (
                                  <div className="no-image" />
                                ) : (
                                  <img src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/item/${item6}.png`} alt={`${item6}`} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cs">{totalMinionsKilled + neutralMinionsKilled}</div>
                      <div className="gold-earned">{numberFormatter(goldEarned)}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-border">
        <div className="charts" data-testid="match-summary">
          {totalDamageDealtStat && <Chart version={patchData.version} data={totalDamageDealtStat} title="Total Damage Dealt" />}
          {totalDamageTakenStat && <Chart version={patchData.version} data={totalDamageTakenStat} title="Total Damage Taken" />}
          {goldEarnedStat && <Chart version={patchData.version} data={goldEarnedStat} title="Gold Earned" />}
          {killsStat && <Chart version={patchData.version} data={killsStat} title="Kills" />}
          {assistsStat && <Chart version={patchData.version} data={assistsStat} title="Assists" />}
          {killParticipationStat && <Chart version={patchData.version} data={killParticipationStat} title="Kill Participation (% rounded down)" />}
          {deathStat && <Chart version={patchData.version} data={deathStat} title="Deaths" />}
          {deathShareStat && <Chart version={patchData.version} data={deathShareStat} title="Death Share (% rounded down)" />}
          {creepScoreStat && <Chart version={patchData.version} data={creepScoreStat} title="Creep Score" />}
        </div>
      </div>
    </MatchSummaryStyled>
  );
};

const parseStats = (statsData: Record<any, any>[], type: string) => {
  const stats = statsData.map(({
    champion, isCurrentPlayer, player, team,
  }, index, self) => ({
    x: `${champion}`,
    y: ['deathShare', 'killParticipation'].includes(type) ? Math.floor(self[index][type]) : self[index][type],
    player,
    label: `${champion} ${player}`,
    isCurrentPlayer,
    team,
  }));

  return stats;
};
