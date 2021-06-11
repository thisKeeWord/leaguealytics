import React, {
  ChangeEvent, FunctionComponent, useEffect, useState,
} from 'react';
import Slider from '@material-ui/core/Slider';
import Map from '../Map';
import MatchEvents from '../MatchEvents';
import { convertTimestamp } from '../../../../utils/helper';
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
  }, [matchId, timeline]);

  if (!timeline[timeframe]) {
    return null;
  }

  return (
    <StyledMatchTimeline data-testid="timeline">
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
        <MatchEvents
          prevTimeframe={timeframe > 0 && timeline[timeframe - 1].timestamp}
          currTimeframe={timeline[timeframe].timestamp}
          events={timeline[timeframe].events}
          currentPlayer={currentPlayer}
          participants={participants}
          version={version}
        />
      </div>
    </StyledMatchTimeline>
  );
};

export default MatchTimeline;
