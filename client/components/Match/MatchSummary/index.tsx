import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import { getSummoners, numberFormatter, parseStats } from '../../../../utils/helper';
import { selectPatchData, selectSummonersData } from '../../../state';
import Chart from '../../Chart';

import { MatchSummaryStyled } from './styles';
import MatchTimeline from '../MatchTimeline';

interface MatchSummaryProps {
  match: Record<any, any>;
  currentPlayer: Record<any, any>;
}

const MatchSummary: FunctionComponent<MatchSummaryProps> = (props: MatchSummaryProps) => {
  const patchData = useSelector(selectPatchData);
  const summoners = useSelector(selectSummonersData);
  const [matchView, setMatchView] = useState<number>(0);
  const summonersList = summoners?.data;

  const handleViewChange = (event: ChangeEvent<{}>, newValue: number) => {
    setMatchView(newValue);
  };

  const { currentPlayer, match } = props;

  if (!patchData || !currentPlayer.participantId || !match.participants || !match.teams) {
    return null;
  }

  const { participants, teams } = match;
  const adjustedTeams = teams.map((team) => {
    const modifiedTeams = { ...team };
    const teamsBans = team.bans.map((ban) => {
      const adjustedBans = { ...ban };
      // eslint-disable-next-line no-restricted-syntax, prefer-const
      for (let championData in patchData.patchData) {
        if (patchData.patchData[championData].key == ban.championId) {
          // eslint-disable-next-line no-return-assign
          adjustedBans.championImage = patchData.patchData[championData].image.full;
        }
      }

      return adjustedBans;
    });

    modifiedTeams.bans = teamsBans;

    return modifiedTeams;
  });

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
          const teamStats = adjustedTeams.find(
            (team: Record<any, any>) => team.teamId === teamId,
          );
          return {
            champion: championName,
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
              teamStats.deaths === 0 ? 0 : (deaths / teamStats.deaths) * 100,
            creepScore: totalMinionsKilled + neutralMinionsKilled,
            isCurrentPlayer: props.currentPlayer.participantId == participantId,
            team: teamId,
          };
        }
      }
    },
  );

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
    <MatchSummaryStyled data-testid="match-stats">
      <div className="content-border">
        <div className="match-overview">
          <div className="by-teams">
            {[team100, team200].map((team, index) => (
              <div
                className={cx({
                  'team-100': index === 0,
                  'team-200': index === 1,
                })}
                key={index}
              >
                <div
                  className={cx('team-summary', {
                    blue: index === 0,
                    red: index === 1,
                  })}
                >
                  <div className="game-conclusion">
                    {adjustedTeams[index].win ? 'WIN' : 'LOSS'}
                  </div>
                  <div className="gold">
                    <img
                      className="label"
                      src="../../../../images/gold.png"
                      alt="gold"
                    />
                    <span>
                      {numberFormatter(adjustedTeams[index].goldEarned)}
                    </span>
                  </div>
                  <div className="kills">
                    <img
                      className="label"
                      src="../../../../images/kda.png"
                      alt="kda"
                    />
                    <span>
                      {adjustedTeams[index].kills}
                      {' '}
                      /
                      {' '}
                      {adjustedTeams[index].deaths}
                      {' '}
                      /
                      {' '}
                      {adjustedTeams[index].assists}
                    </span>
                  </div>
                </div>

                <div
                  className={cx('team-objectives', {
                    blue: index === 0,
                    red: index === 1,
                  })}
                >
                  <div className="bans-container">
                    <span>Bans: </span>
                    {adjustedTeams[index].bans.map(
                      ({ championImage }, i: number) => (
                        <img
                          src={`http://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/champion/${championImage}`}
                          alt={championImage}
                          key={i}
                        />
                      ),
                    )}
                  </div>
                  <div className="objectives-container">
                    <div className="tower-kills">
                      <img
                        src={`../../../../images/turret-${
                          index === 0 ? 'blue' : 'red'
                        }.png`}
                        alt="tower"
                      />
                      <span>{adjustedTeams[index].objectives.tower.kills}</span>
                    </div>
                    <div className="inhibitor-kills">
                      <img
                        src={`../../../../images/inhibitor-${
                          index === 0 ? 'blue' : 'red'
                        }.png`}
                        alt="inhibitor"
                      />
                      <span>
                        {adjustedTeams[index].objectives.inhibitor.kills}
                      </span>
                    </div>
                    <div className="dragon-kills">
                      <img
                        src={`../../../../images/dragon-${
                          index === 0 ? 'blue' : 'red'
                        }.png`}
                        alt="dragon"
                      />
                      <span>
                        {adjustedTeams[index].objectives.dragon.kills}
                      </span>
                    </div>
                    <div className="rift-herald-kills">
                      <img
                        src={`../../../../images/riftherald-${
                          index === 0 ? 'blue' : 'red'
                        }.png`}
                        alt="rift herald"
                      />
                      <span>
                        {adjustedTeams[index].objectives.riftHerald.kills}
                      </span>
                    </div>
                    <div className="baron-kills">
                      <img
                        src={`../../../../images/baron-nashor-${
                          index === 0 ? 'blue' : 'red'
                        }.png`}
                        alt="baron"
                      />
                      <span>{adjustedTeams[index].objectives.baron.kills}</span>
                    </div>
                  </div>
                </div>
                {team.map(
                  ({
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
                    const { spell1, spell2 } = getSummoners(summonersList, { summoner1Id, summoner2Id });
                    return (
                      <div
                        className={cx('match-summary', {
                          team100: teamId === 100,
                          team200: teamId === 200,
                          currentUser: currentPlayer.summonerId === summonerId,
                        })}
                        key={summonerName}
                      >
                        <div className="section-1">
                          <div className="champion-image">
                            <div className="champion-level">
                              <img
                                src={`http://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/champion/${championName}.png`}
                                alt="champion"
                              />
                              <span>{champLevel}</span>
                            </div>
                            <div className="summoner-spells">
                              <div className="spell1">
                                {spell1 && (
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/spell/${spell1}`}
                                    alt="spell 1"
                                  />
                                )}
                              </div>
                              <div className="spell2">
                                {spell2 && (
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/spell/${spell2}`}
                                    alt="spell 2"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="summonerName" title={summonerName}>{summonerName}</span>
                        </div>
                        <div className="items-list">
                          <div className="item-set-1">
                            {[item0, item1, item2, item3, item4, item5].map(
                              (item, idx) => (
                                <div className="view" key={idx}>
                                  <div className="item-icon binding">
                                    {item === 0 ? (
                                      <div className="no-image" />
                                    ) : (
                                      <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/item/${item}.png`}
                                        alt={`${item}`}
                                      />
                                    )}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                          <div className="default-1-4">
                            <div className="inventory-trinket">
                              <div className="item-icon binding">
                                {item6 === 0 ? (
                                  <div className="no-image" />
                                ) : (
                                  <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/${patchData.version}/img/item/${item6}.png`}
                                    alt={`${item6}`}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="kda">
                          <img src="../../../../images/kda.png" alt="kda" />
                          <span>
                            {kills}
                            /
                            {deaths}
                            /
                            {assists}
                          </span>
                        </div>
                        <div className="cs-gold">
                          <div className="cs">
                            <img
                              src="../../../../images/minions.png"
                              alt="cs"
                            />
                            <span>
                              {totalMinionsKilled + neutralMinionsKilled}
                            </span>
                          </div>
                          <div className="gold-earned">
                            {' '}
                            <img
                              src="../../../../images/gold.png"
                              alt="gold"
                            />
                            {' '}
                            <span>{numberFormatter(goldEarned)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="blank-div" />

      <div className="view" data-testid="view">
        <Paper square>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={matchView}
            onChange={handleViewChange}
            aria-label="disabled tabs example"
            className="overview"
          >
            <Tab label="Overview" />
            <Tab label="Match Timeline" />
          </Tabs>
        </Paper>

        <div className="content-border">
          {matchView === 0 ? (
            <div className="charts" data-testid="match-summary">
              {totalDamageDealtStat && (
                <Chart
                  version={patchData.version}
                  data={totalDamageDealtStat}
                  title="Total Damage Dealt"
                />
              )}
              {totalDamageTakenStat && (
                <Chart
                  version={patchData.version}
                  data={totalDamageTakenStat}
                  title="Total Damage Taken"
                />
              )}
              {goldEarnedStat && (
                <Chart
                  version={patchData.version}
                  data={goldEarnedStat}
                  title="Gold Earned"
                />
              )}
              {killsStat && (
                <Chart
                  version={patchData.version}
                  data={killsStat}
                  title="Kills"
                />
              )}
              {assistsStat && (
                <Chart
                  version={patchData.version}
                  data={assistsStat}
                  title="Assists"
                />
              )}
              {killParticipationStat && (
                <Chart
                  version={patchData.version}
                  data={killParticipationStat}
                  title="Kill Participation (% rounded down)"
                />
              )}
              {deathStat && (
                <Chart
                  version={patchData.version}
                  data={deathStat}
                  title="Deaths"
                />
              )}
              {deathShareStat && (
                <Chart
                  version={patchData.version}
                  data={deathShareStat}
                  title="Death Share (% rounded down)"
                />
              )}
              {creepScoreStat && (
                <Chart
                  version={patchData.version}
                  data={creepScoreStat}
                  title="Creep Score"
                />
              )}
            </div>
          ) : (
            <MatchTimeline
              currentPlayer={currentPlayer}
              timeline={match.byTimeframe}
              mapId={match.mapId}
              participants={match.participants}
              version={patchData.version}
              matchId={match.matchId}
            />
          )}
        </div>
      </div>
    </MatchSummaryStyled>
  );
};

export default MatchSummary;
