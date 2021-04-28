import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import cx from 'classnames';

interface MatchListProps {
  // eslint-disable-next-line no-unused-vars
  handleClick: (matchId: string) => void;
  version: number | string;
  gameCreation: Date;
  championName: string;
  matchId: string;
  isActiveMatch: boolean;
  role?: 'button';
}

const MatchStyled = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;

  &.active {
    background-color: #dcdcdc;
  }

  &:hover {
    background-color: #dcdcdc;
  }

  .match-button {
    padding: 7px;
    width: 100%;

    .champion-image {
      & > img {
        height: 30px;
        width: 30px;
      }
    }
  }
`;

export const MatchList: FunctionComponent<MatchListProps> = (
  props: MatchListProps,
) => (
  <MatchStyled
    data-testid="input"
    role={props.role}
    onClick={() => props.handleClick(props.matchId)}
    className={cx({ active: props.isActiveMatch })}
  >
    <div className="match-button">
      <div className="champion-image">
        <img src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${props.championName}.png`} alt="champion" />
      </div>
      <span>{new Date(props.gameCreation).toLocaleDateString()}</span>
    </div>
  </MatchStyled>
);
