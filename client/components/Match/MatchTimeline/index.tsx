import React, {
  ChangeEvent, FunctionComponent, useEffect, useState,
} from 'react';
import Slider from '@material-ui/core/Slider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Map from '../Map';
import MatchEvents from '../MatchEvents';
import Chart from '../../Chart';
import { convertTimestamp, parseStats } from '../../../../utils/helper';
import { StyledMatchTimeline } from './styles';

interface MatchTimelineProps {
  currentPlayer: Record<any, any>
  timeline: Record<any, any>
  mapId: number
  participants: Record<any, any>[]
  version: number | string;
  matchId: string
}

const MatchTimeline: FunctionComponent<MatchTimelineProps> = (props: MatchTimelineProps) => {
  const [timeframe, setTimeframe] = useState(0);
  const [matchStatsView, setMatchStatsView] = useState<number>(0);

  const handleViewChange = (event: ChangeEvent<{}>, newValue: number) => {
    setMatchStatsView(newValue);
  };

  const {
    currentPlayer, timeline, mapId, participants, version, matchId,
  } = props;

  if (!timeline || !timeline.length) {
    return null;
  }

  const onChange = (e: ChangeEvent<{}>, value: number | number[]): void => {
    if (Array.isArray(value)) {
      return;
    }
    setTimeframe(value);
  };

  useEffect(() => {
    setTimeframe(0);
    setMatchStatsView(0);
  }, [matchId, timeline]);

  if (!timeline[timeframe]) {
    return null;
  }

  const stats = timeline[timeframe].participantFrames ? timeline[timeframe].participantFrames.map((participantFrame) => {
    const player = participants.find((participant) => participant.participantId === participantFrame.participantId) || {};

    return {
      champion: player.championName,
      player: player.summonerName,
      participantId: participantFrame.participantId,
      damageDealt: Math.floor(participantFrame.damageDoneToChampions),
      damageTaken: Math.floor(participantFrame.damageTaken),
      goldEarned: Math.floor(participantFrame.goldEarned),
      kills: Math.floor(participantFrame.kills),
      assists: Math.floor(participantFrame.assists),
      deaths: Math.floor(participantFrame.deaths),
      creepScore: Math.floor(participantFrame.minionsKilled),
      wardsPurchased: Math.floor(participantFrame.wardsPurchased),
      wardsPlaced: Math.floor(participantFrame.wardsPlaced),
      wardsKilled: Math.floor(participantFrame.wardsKilled),
      isCurrentPlayer: currentPlayer.participantId == participantFrame.participantId,
      team: participantFrame.participantId <= 5 ? 100 : 200,
    };
  }) : [];

  const creepScoreStat = parseStats(stats, 'creepScore');
  const killStat = parseStats(stats, 'kills');
  const deathStat = parseStats(stats, 'deaths');
  const assistStat = parseStats(stats, 'assists');
  const damageDealtStat = parseStats(stats, 'damageDealt');
  const damageTakenStat = parseStats(stats, 'damageTaken');
  const wardsPurchasedStat = parseStats(stats, 'wardsPurchased');
  const wardsPlacedStat = parseStats(stats, 'wardsPlaced');

  return (
    <StyledMatchTimeline data-testid="timeline">
      <Paper square>
        <Tabs
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="on"
          value={matchStatsView}
          onChange={handleViewChange}
          aria-label="scrollable force tabs example"
          className="timeline"
        >
          <Tab label="Objectives" />
          <Tab label="Gold Earned" />
          <Tab label="Kills" />
          <Tab label="Deaths" />
          <Tab label="Assists" />
          <Tab label="Damage Dealt" />
          <Tab label="Damage Taken" />
          <Tab label="Wards Purchased" />
          <Tab label="Wards Placed" />
        </Tabs>
      </Paper>

      <div className="slider-container" data-testid="slider">
        <Slider
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          min={0}
          max={timeline.length - 1}
          onChange={onChange}
          value={timeframe}
          valueLabelFormat={(val: number) => `${convertTimestamp(timeline[val].timestamp)}`}
        />
      </div>

      <div className="map-events">
        <Map
          mapId={mapId}
          participantFrames={timeline[timeframe].participantFrames}
          currentPlayer={currentPlayer}
          participants={participants}
          version={version}
          matchId={matchId}
        />

        {matchStatsView === 0 && (
          <MatchEvents
            prevTimeframe={timeframe > 0 && timeline[timeframe - 1].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            events={timeline[timeframe].events}
            currentPlayer={currentPlayer}
            participants={participants}
            version={version}
          />
        )}

        {matchStatsView === 1 && creepScoreStat && (
          <Chart
            version={version}
            data={creepScoreStat}
            title="Creep Score"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 2 && killStat && (
          <Chart
            version={version}
            data={killStat}
            title="Kills"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 3 && deathStat && (
          <Chart
            version={version}
            data={deathStat}
            title="Deaths"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 4 && assistStat && (
          <Chart
            version={version}
            data={assistStat}
            title="Assists"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 5 && damageDealtStat && (
          <Chart
            version={version}
            data={damageDealtStat}
            title="Damage Dealt"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 6 && damageTakenStat && (
          <Chart
            version={version}
            data={damageTakenStat}
            title="Damage Taken"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 7 && wardsPurchasedStat && (
          <Chart
            version={version}
            data={wardsPurchasedStat}
            title="Wards Purchased"
            className="timeline-stat"
          />
        )}

        {matchStatsView === 7 && wardsPlacedStat && (
          <Chart
            version={version}
            data={wardsPlacedStat}
            title="Wards Placed"
            className="timeline-stat"
          />
        )}
      </div>
    </StyledMatchTimeline>
  );
};

export default MatchTimeline;
