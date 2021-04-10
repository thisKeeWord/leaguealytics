import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMatchesByID,
  selectMatchesIsFetching,
  selectPatchData,
  selectUserDoc,
} from '../../state';
import { getMatchTimeline } from '../../state/actions/getMatchTimeline';
import Chart from '../Chart';
import { MatchList } from './MatchList';

const Match: FunctionComponent = () => {
  const [matchId, setMatchId] = useState<number>();
  const user = useSelector(selectUserDoc);
  const patchData = useSelector(selectPatchData);
  const matches = useSelector(selectMatchesByID);
  const isMatchesFetching = useSelector(selectMatchesIsFetching);
  const dispatch = useDispatch();

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
              champion: patchData.patchData[championData].name,
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

  // console.log(selectedGame, 'selectedGame');
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
      champion, damageDealt, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: damageDealt,
      isCurrentPlayer,
    }));
    totalDamageTakenStat = statsData.map(({
      champion, damageTaken, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: damageTaken,
      isCurrentPlayer,
    }));
    goldEarnedStat = statsData.map(({
      champion, goldEarned, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: goldEarned,
      isCurrentPlayer,
    }));
    killsStat = statsData.map(({
      champion, kills, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: kills,
      isCurrentPlayer,
    }));
    assistsStat = statsData.map(({
      champion, assists, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: assists,
      isCurrentPlayer,
    }));
    killParticipationStat = statsData.map(({
      champion, killParticipation, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: Math.floor(killParticipation),
      isCurrentPlayer,
    }));
    deathStat = statsData.map(({
      champion, deaths, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: deaths,
      isCurrentPlayer,
    }));
    deathShareStat = statsData.map(({
      champion, deathShare, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: Math.floor(deathShare),
      isCurrentPlayer,
    }));
    creepScoreStat = statsData.map(({
      champion, creepScore, isCurrentPlayer, player, participantId,
    }) => ({
      x: `${champion} \n (${participantId})`,
      y: creepScore,
      isCurrentPlayer,
    }));
  }

  return (
    <div>
      <div>
        {user.matches.map(({ championImg, timestamp, gameId }, index) => (
          <MatchList
            index={index}
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
              <Chart data={totalDamageDealtStat} title="Total Damage Dealt" />
            )}
            {totalDamageTakenStat && (
              <Chart data={totalDamageTakenStat} title="Total Damage Taken" />
            )}
            {goldEarnedStat && (
              <Chart data={goldEarnedStat} title="Gold Earned" />
            )}
            {killsStat && <Chart data={killsStat} title="Kills" />}
            {assistsStat && <Chart data={assistsStat} title="Assists" />}
            {killParticipationStat && (
              <Chart data={killParticipationStat} title="Kill Participation" />
            )}
            {deathStat && <Chart data={deathStat} title="Deaths" />}
            {deathShareStat && (
              <Chart data={deathShareStat} title="Death Share" />
            )}
            {creepScoreStat && <Chart data={creepScoreStat} title="Creep Score" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
