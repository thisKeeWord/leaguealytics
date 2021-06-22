import React, { FunctionComponent } from 'react';

interface MatchPlayerBuildsProps {
  version: string | number
  title: string
  initialTimeframe: number
  currTimeframe: number
  participantFrames: Record<any, any>
  participants: Record<any, any>[]
  currentPlayer: Record<any, any>
}

const MatchPlayerBuilds: FunctionComponent<MatchPlayerBuildsProps> = (props: MatchPlayerBuildsProps) => {
  console.log(props);
  return null;
};

export default MatchPlayerBuilds;
