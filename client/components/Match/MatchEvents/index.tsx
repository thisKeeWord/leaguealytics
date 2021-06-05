import React, { FunctionComponent } from 'react';

interface MatchEventsProps {
  events: Record<any, any>[]
  participants: Record<any, any>[]
  currentPlayer: Record<any, any>
  version: number | string
}

const MatchEvents: FunctionComponent<MatchEventsProps> = (props: MatchEventsProps) => (
  <div id="hwllo" data-testid="hwllo" />
);

export default MatchEvents;
