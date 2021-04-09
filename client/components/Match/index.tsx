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
      ({ player }) => player.accountId === user?.accountId,
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
                currentPlayerIdentity.participantId === participantId,
            };
          }
        }
      },
    );

  // console.log(selectedGame, 'selectedGame');

  const totalDamageDealtStat = statsData
    && statsData.map(({ champion, damageDealt, isCurrentPlayer }) => ({
      x: champion,
      y: damageDealt,
      isCurrentPlayer,
    }));
  const totalDamageTakenStat = statsData
    && statsData.map(({ champion, damageTaken, isCurrentPlayer }) => ({
      x: champion,
      y: damageTaken,
      isCurrentPlayer,
    }));
  const goldEarnedStat = statsData
    && statsData.map(({ champion, goldEarned, isCurrentPlayer }) => ({
      x: champion,
      y: goldEarned,
      isCurrentPlayer,
    }));
  const killsStat = statsData
    && statsData.map(({ champion, kills, isCurrentPlayer }) => ({
      x: champion,
      y: kills,
      isCurrentPlayer,
    }));
  const assistsStat = statsData
    && statsData.map(({ champion, assists, isCurrentPlayer }) => ({
      x: champion,
      y: assists,
      isCurrentPlayer,
    }));
  const killParticipationStat = statsData
    && statsData.map(({ champion, killParticipation, isCurrentPlayer }) => ({
      x: champion,
      y: Math.floor(killParticipation),
      isCurrentPlayer,
    }));
  const deathStat = statsData
    && statsData.map(({ champion, deaths, isCurrentPlayer }) => ({
      x: champion,
      y: deaths,
      isCurrentPlayer,
    }));
  const deathShareStat = statsData
    && statsData.map(({ champion, deathShare, isCurrentPlayer }) => ({
      x: champion,
      y: Math.floor(deathShare),
      isCurrentPlayer,
    }));
  const creepScoreStat = statsData
    && statsData.map(({ champion, creepScore, isCurrentPlayer }) => ({
      x: champion,
      y: creepScore,
      isCurrentPlayer,
    }));

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
