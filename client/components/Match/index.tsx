import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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

const MatchStyled = styled.div`
  .matches {
    margin-bottom: 30px;
  }

  .section {
    position: relative;
    box-sizing: border-box;
    min-height: 150px;
    width: 100%;
    margin: 50px auto 7px auto;
    background: transparent none repeat-y;

    .top {
      display: block;
      width: 100%;
      position: relative;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-textures-sprite.jpg') no-repeat 50% 0;
      top: -14px;
      left: 0;
      height: 111px;
      z-index: 1;

      &:before {
        content: "";
        width: 100%;
        height: 136px;
        position: absolute;
        top: -21px;
        left: 0;
        background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -148px;
      }
    }

    .content {
      background-image: url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-center.png');
      background-repeat: repeat-y;
      background-position: 50% 0;
      position: relative;
      bottom: 10px;

      & > .wrapper {
        position: relative;
        max-width: 980px;
        margin: -121px auto -116px auto;
        padding: 20px 20px;
        min-height: 350px;
        z-index: 2;
      }
    }

    .bottom {
      width: 100%;
      position: absolute;
      background: transparent url('https://lolstatic-a.akamaihd.net/lolkit/1.1.5/resources/images/frame-sprite.png') no-repeat 50% -284px;
      left: 0;
      height: 130px;
    }
  }
`;

const Match: FunctionComponent = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>();
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

  // eslint-disable-next-line max-len
  const selectedGame = selectedMatchId && matches[selectedMatchId] && matches[selectedMatchId].data.matchId
    ? matches[selectedMatchId].data
    : null;

  const handleClick = async (matchId: string): Promise<void> => {
    if (matches[matchId] && !matches[matchId].data.matchId) {
      dispatch(getMatchTimeline({ username: user.name, matchId }));
    }

    setSelectedMatchId(matchId);
  };

  const currentPlayerIdentity = selectedGame
    && selectedGame.participants.find(
      ({ summonerId }) => summonerId == user?.id,
    );

  const statsData = selectedGame
    && selectedGame.participants.map(
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
            const teamStat = selectedGame.teams.find(
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
                teamStat.kills === 0
                  ? 0
                  : ((kills + assists) / teamStat.kills) * 100,
              deathShare:
                teamStat.deaths === 0
                  ? 0
                  : (deaths / teamStat.deaths) * 100,
              creepScore: totalMinionsKilled + neutralMinionsKilled,
              isCurrentPlayer:
                currentPlayerIdentity.participantId == participantId,
              team: teamId,
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
      champion, damageDealt, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: damageDealt,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    totalDamageTakenStat = statsData.map(({
      champion, damageTaken, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: damageTaken,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    goldEarnedStat = statsData.map(({
      champion, goldEarned, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: goldEarned,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    killsStat = statsData.map(({
      champion, kills, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: kills,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    assistsStat = statsData.map(({
      champion, assists, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: assists,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    killParticipationStat = statsData.map(({
      champion, killParticipation, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: Math.floor(killParticipation),
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    deathStat = statsData.map(({
      champion, deaths, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: deaths,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    deathShareStat = statsData.map(({
      champion, deathShare, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: Math.floor(deathShare),
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
    creepScoreStat = statsData.map(({
      champion, creepScore, isCurrentPlayer, player, team,
    }) => ({
      x: `${champion}`,
      y: creepScore,
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }));
  }

  // eslint-disable-next-line max-len
  const hasStats = totalDamageDealtStat || totalDamageTakenStat || goldEarnedStat || killsStat || assistsStat || killParticipationStat || deathStat || deathShareStat || creepScoreStat;

  return (
    <MatchStyled>
      <div className="matches">
        {user.matches.map(({ championName, gameCreation, matchId }, index) => (
          <MatchList
            key={index}
            handleClick={handleClick}
            championName={championName}
            gameCreation={gameCreation}
            matchId={matchId}
            version={patchData.version}
          />
        ))}
      </div>
      {isMatchesFetching ? (
        <span>loading</span>
      ) : (
        hasStats && (
          <div className="section">
            <div className="top" />
            <div className="content">
              <div className="wrapper">
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
            </div>
            <div className="bottom" style={{ backgroundColor: 'black' }} />
          </div>
        )
      )}
    </MatchStyled>
  );
};

export default Match;
