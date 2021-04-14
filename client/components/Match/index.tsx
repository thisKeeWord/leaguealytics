import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMatchesByID,
  selectMatchesIsFetching,
  selectPatchData,
  selectUserDoc,
  selectUserFetching,
} from '../../state';
import { getMatchTimeline } from '../../state/actions/getMatchTimeline';
import Chart from '../Chart';
import { MatchList } from './MatchList';

const Match: FunctionComponent = () => {
  const [matchId, setMatchId] = useState<number>();
  const user = useSelector(selectUserDoc);
  const isFetching = useSelector(selectUserFetching);
  const patchData = useSelector(selectPatchData);
  const matches = useSelector(selectMatchesByID);
  const isMatchesFetching = useSelector(selectMatchesIsFetching);
  const dispatch = useDispatch();

  if (isFetching || isMatchesFetching) {
    return <span>loading</span>;
  }

  if (!user?.matches || !matches || !patchData?.version) {
    return null;
  }

  const selectedGame = matchId && matches[matchId] && matches[matchId].data.gameId
    ? matches[matchId].data
    : null;

  const handleClick = async (gameId: number): Promise<void> => {
    if (matches[gameId] && !matches[gameId].data.gameId) {
      dispatch(getMatchTimeline({ username: user.name, gameId }));
    }

    setMatchId(gameId);
  };

  const currentPlayerIdentity = selectedGame
    && selectedGame.participantIdentities.find(
      ({ player }) => player.accountId == user?.accountId,
    );

  const statsData = selectedGame
    && selectedGame.participants.map(
      ({
        participantId, championId, stats, teamId,
      // eslint-disable-next-line array-callback-return
      }) => {
        // eslint-disable-next-line no-restricted-syntax, prefer-const
        for (let championData in patchData.patchData) {
          if (patchData.patchData[championData].key == championId) {
            const teamStat = selectedGame.teams.find(
              (team: Record<any, any>) => team.teamId === teamId,
            );
            return {
              champion: patchData.patchData[championData].id,
              // eslint-disable-next-line max-len
              player: (selectedGame.participantIdentities.find((participant) => participant.participantId === participantId)).player.summonerName,
              participantId,
              damageDealt: stats.totalDamageDealtToChampions,
              damageTaken: stats.totalDamageTaken,
              goldEarned: stats.goldEarned,
              kills: stats.kills,
              assists: stats.assists,
              deaths: stats.deaths,
              killParticipation:
                teamStat.kills === 0
                  ? 0
                  : ((stats.kills + stats.assists) / teamStat.kills) * 100,
              deathShare:
                teamStat.deaths === 0
                  ? 0
                  : (stats.deaths / teamStat.deaths) * 100,
              creepScore: stats.totalMinionsKilled + stats.neutralMinionsKilled,
              isCurrentPlayer:
                currentPlayerIdentity.participantId == participantId,
            };
          }
        }
      },
    );

  console.log(selectedGame, 'selectedGame');
  let totalDamageDealtStat = null;
  let totalDamageTakenStat = null;
  let goldEarnedStat = null;
  let killsStat = null;
  let assistsStat = null;
  let killParticipationStat = null;
  let deathStat = null;
  let deathShareStat = null;
  let creepScoreStat = null;

  if (statsData) {
    totalDamageDealtStat = statsData.map(({
      champion, damageDealt, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: damageDealt,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    totalDamageTakenStat = statsData.map(({
      champion, damageTaken, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: damageTaken,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    goldEarnedStat = statsData.map(({
      champion, goldEarned, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: goldEarned,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    killsStat = statsData.map(({
      champion, kills, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: kills,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    assistsStat = statsData.map(({
      champion, assists, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: assists,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    killParticipationStat = statsData.map(({
      champion, killParticipation, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: Math.floor(killParticipation),
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    deathStat = statsData.map(({
      champion, deaths, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: deaths,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    deathShareStat = statsData.map(({
      champion, deathShare, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: Math.floor(deathShare),
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
    creepScoreStat = statsData.map(({
      champion, creepScore, isCurrentPlayer, player,
    }) => ({
      x: `${champion}`,
      y: creepScore,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
    }));
  }

  return (
    <div>
      {user.matches.map(({ championImg, timestamp, gameId }, index) => (
        <MatchList
          key={index}
          handleClick={handleClick}
          championImg={championImg}
          timestamp={timestamp}
          gameId={gameId}
          version={patchData.version}
        />
      ))}
      {isMatchesFetching ? (
        <span>loading</span>
      ) : (
        <div>
          {totalDamageDealtStat && (
          <Chart version={patchData.version} data={totalDamageDealtStat} title="Total Damage Dealt" />
          )}
          {totalDamageTakenStat && (
          <Chart version={patchData.version} data={totalDamageTakenStat} title="Total Damage Taken" />
          )}
          {goldEarnedStat && (
          <Chart version={patchData.version} data={goldEarnedStat} title="Gold Earned" />
          )}
          {killsStat && <Chart version={patchData.version} data={killsStat} title="Kills" />}
          {assistsStat && <Chart version={patchData.version} data={assistsStat} title="Assists" />}
          {killParticipationStat && (
          <Chart version={patchData.version} data={killParticipationStat} title="Kill Participation" />
          )}
          {deathStat && <Chart version={patchData.version} data={deathStat} title="Deaths" />}
          {deathShareStat && (
          <Chart version={patchData.version} data={deathShareStat} title="Death Share" />
          )}
          {creepScoreStat && <Chart version={patchData.version} data={creepScoreStat} title="Creep Score" />}
        </div>
      )}
    </div>
  );
};

export default Match;
