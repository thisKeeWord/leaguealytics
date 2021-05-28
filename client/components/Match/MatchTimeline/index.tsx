import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { convertTimestamp } from '../../../../utils/helper';

interface MatchTimelineProps {
  currentPlayer: Record<any, any>
  timeline: Record<any, any>
}

const MatchTimeline: FunctionComponent<MatchTimelineProps> = (props: MatchTimelineProps) => {
  const [timeframe, setTimeframe] = useState(0);
  const { currentPlayer, timeline } = props;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTimeframe(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <div>{convertTimestamp(timeline[timeframe].timestamp)}</div>
      <input type="range" value={timeframe} step="1" min="0" max={timeline.length - 1} onChange={onChange} />
    </div>
  );
};

export default MatchTimeline;
