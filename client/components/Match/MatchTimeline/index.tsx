import React, {
  ChangeEvent, FunctionComponent, useEffect, useState,
} from 'react';
import Slider from '@material-ui/core/Slider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Map from '../Map';
import MatchEvents from '../MatchEvents';
import { convertTimestamp, parseStats } from '../../../../utils/helper';
import { StyledMatchTimeline } from './styles';
import TimelineChart from '../../Chart/TimelineChart';
import MatchPlayerBuilds from '../../MatchPlayerBuilds';

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
      championImg: player.championImg,
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
  const wardsKilledStat = parseStats(stats, 'wardsKilled');

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
          <Tab label="Wards Killed" />
          <Tab label="Player Builds" />
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

        {matchStatsView === 1 && (
          <TimelineChart
            version={version}
            data={creepScoreStat}
            title="Creep Score"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="creepScoreStat"
          />
        )}

        {matchStatsView === 2 && (
          <TimelineChart
            version={version}
            data={killStat}
            title="Kills"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="killStat"
          />
        )}

        {matchStatsView === 3 && (
          <TimelineChart
            version={version}
            data={deathStat}
            title="Deaths"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="deathStat"
          />
        )}

        {matchStatsView === 4 && (
          <TimelineChart
            version={version}
            data={assistStat}
            title="Assists"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="assistStat"
          />
        )}

        {matchStatsView === 5 && (
          <TimelineChart
            version={version}
            data={damageDealtStat}
            title="Damage Dealt"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="damageDealtStat"
          />
        )}

        {matchStatsView === 6 && (
          <TimelineChart
            version={version}
            data={damageTakenStat}
            title="Damage Taken"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="damageTakenStat"
          />
        )}

        {matchStatsView === 7 && (
          <TimelineChart
            version={version}
            data={wardsPurchasedStat}
            title="Wards Purchased"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="wardsPurchasedStat"
          />
        )}

        {matchStatsView === 8 && (
          <TimelineChart
            version={version}
            data={wardsPlacedStat}
            title="Wards Placed"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="wardsPlacedStat"
          />
        )}

        {matchStatsView === 9 && (
          <TimelineChart
            version={version}
            data={wardsKilledStat}
            title="Wards Killed"
            className="timeline-chart"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
            testId="wardsKilledStat"
          />
        )}

        {matchStatsView === 10 && (
          <MatchPlayerBuilds
            version={version}
            participantFrames={timeline[timeframe].participantFrames}
            participants={participants}
            currentPlayer={currentPlayer}
            title="Player Builds"
            initialTimeframe={timeline[0].timestamp}
            currTimeframe={timeline[timeframe].timestamp}
          />
        )}
      </div>
    </StyledMatchTimeline>
  );
};

export default MatchTimeline;
