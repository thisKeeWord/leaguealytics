import React, { FunctionComponent } from 'react'

interface MatchSummaryProps {
  match: Record<any, any>
  currentPlayer: Record<any, any>
}

export const MatchSummary: FunctionComponent<MatchSummaryProps> = (
  props: MatchSummaryProps,
) => (
  <>
    <div>{props.match.matchId}</div>
    <div>{props.currentPlayer.summonerId}</div>
  </>
)
