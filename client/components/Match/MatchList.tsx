import React, { FunctionComponent } from 'react';

interface MatchListProps {
  index: number;
  handleClick: (gameId: number) => void;
  version: number | string;
  timestamp: Date;
  championImg: string;
  gameId: number;
}

export const MatchList: FunctionComponent<MatchListProps> = (props: MatchListProps) => {
  return (
    <input
      type='button'
      key={`${props.index}`}
      style={{
        backgroundSize: '25px',
        backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${props.championImg})`,
        backgroundRepeat: 'no-repeat',
        height: '30px',
        paddingLeft: '30px',
        margin: '4px',
      }}
      value={new Date(props.timestamp).toLocaleDateString()}
      onClick={() => props.handleClick(props.gameId)}
    />
  );
};
