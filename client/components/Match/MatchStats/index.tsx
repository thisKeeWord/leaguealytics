import React, { FunctionComponent } from 'react';
import MatchSummary from '../MatchSummary';

interface MatchStatsProps {
  match: Record<any, any>;
  currentPlayer: Record<any, any>
}

const MatchStats: FunctionComponent<MatchStatsProps> = (
  props: MatchStatsProps,
) => {
  if (!props.match.matchId || !props.currentPlayer.summonerId) {
    return null;
  }

  return (
    <div data-testid="match-stats">
      <MatchSummary match={props.match} currentPlayer={props.currentPlayer} />
    </div>
  );
};

export default MatchStats;
