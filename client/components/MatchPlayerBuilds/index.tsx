import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import { convertTimestamp } from '../../../utils/helper';
import { MatchPlayerBuildsStyled } from './styles';

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
  const particpantsItemSet = props.participantFrames.map((participantFrame: Record<any, any>) => {
    const participantObj = props.participants.find((participant: Record<any, any>) => (
      participant.participantId === participantFrame.participantId
    )) || {};
    const items = Object.values(participantFrame.itemSet || {});

    // itemSet object within participantFrame
    return (
      // eslint-disable-next-line max-len
      <div className={cx('player-items', { blue: participantObj.teamId === 100, red: participantObj.teamId === 200, user: participantFrame.participantId === props.currentPlayer.participantId })}>
        <div className="player">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${participantObj?.championImg}.png`}
            alt={participantObj?.championName}
          />
          <div className="name" title={participantObj?.summonerName}>{participantObj?.summonerName}</div>
        </div>
        <div className="items-list">
          {items.map((item, index) => (
            <img src={`https://ddragon.leagueoflegends.com/cdn/${props.version}/img/item/${item}.png`} alt="item" key={index} />
          ))}
        </div>
      </div>
    );
  });

  return (
    <MatchPlayerBuildsStyled>
      <div data-testid="match-player-builds" className="match-player-builds">
        <h4>{props.title}</h4>

        <div className="time-range">
          {props.currTimeframe > 0 && `${convertTimestamp(props.initialTimeframe)} - `}
          {convertTimestamp(props.currTimeframe)}
        </div>

        {particpantsItemSet}
      </div>
    </MatchPlayerBuildsStyled>
  );
};

export default MatchPlayerBuilds;
