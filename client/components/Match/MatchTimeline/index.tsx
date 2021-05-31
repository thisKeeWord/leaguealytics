import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { convertTimestamp } from '../../../../utils/helper';
import { StyledMatchTimeline } from './styles';

interface MatchTimelineProps {
  currentPlayer: Record<any, any>
  timeline: Record<any, any>
}

const MatchTimeline: FunctionComponent<MatchTimelineProps> = (props: MatchTimelineProps) => {
  const [timeframe, setTimeframe] = useState(0);
  const { currentPlayer, timeline } = props;

  if (!timeline.length) {
    return null;
  }

  const onChange = (e: ChangeEvent<{}>, value: number | number[]): void => {
    if (Array.isArray(value)) {
      return;
    }
    setTimeframe(value);
  };

  return (
    <StyledMatchTimeline data-testid="timeline">
      <div className="slider-container" data-testid="slider">
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          min={0}
          max={timeline.length - 1}
          onChange={onChange}
          value={timeframe}
          valueLabelFormat={(val: number) => convertTimestamp(timeline[val].timestamp)}
        />
      </div>

    </StyledMatchTimeline>
  );
};

export default MatchTimeline;
