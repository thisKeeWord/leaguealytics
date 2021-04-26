import React, { FunctionComponent } from 'react';
import { MatchSummary } from './MatchSummary';

interface MatchStatsProps {
  match: Record<any, any>;
  currentPlayer: Record<any, any>
}

export const MatchStats: FunctionComponent<MatchStatsProps> = (
  props: MatchStatsProps,
) => {
  if (!props.match.matchId || !props.currentPlayer) {
    return null;
  }

  return (
    <MatchSummary match={props.match} currentPlayer={props.currentPlayer} />
  );
};
