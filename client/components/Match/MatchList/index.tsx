import React, { FunctionComponent } from 'react';

interface MatchListProps {
  // eslint-disable-next-line no-unused-vars
  handleClick: (matchId: string) => void;
  version: number | string;
  gameCreation: Date;
  championName: string;
  matchId: string;
}

export const MatchList: FunctionComponent<MatchListProps> = (
  props: MatchListProps,
) => (
  <input
    data-testid="input"
    type="button"
    style={{
      backgroundSize: '25px',
      backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${props.championName}.png)`,
      backgroundRepeat: 'no-repeat',
      height: '30px',
      paddingLeft: '30px',
      margin: '4px',
    }}
    value={new Date(props.gameCreation).toLocaleDateString()}
    onClick={() => props.handleClick(props.matchId)}
  />
);
