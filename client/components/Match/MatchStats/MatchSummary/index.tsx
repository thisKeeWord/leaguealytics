import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectPatchData } from '../../../../state';
import Chart from '../../../Chart';

interface MatchSummaryProps {
  match: Record<any, any>;
  currentPlayer: Record<any, any>
}

export const MatchSummary: FunctionComponent<MatchSummaryProps> = (
  props: MatchSummaryProps,
) => {
  const patchData = useSelector(selectPatchData);

  if (
    !patchData
    || !props.currentPlayer.participantId
    || !props.match.participants
    || !props.match.teams
  ) {
    return null;
  }

  const statsData = props.match.participants.map(
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
          const teamStats = props.match.teams.find(
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

  return (
    <div data-testid="match-summary">
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
