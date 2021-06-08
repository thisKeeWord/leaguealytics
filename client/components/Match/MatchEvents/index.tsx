import React, { FunctionComponent, ReactElement } from 'react';
import cx from 'classnames';
import { StyledMatchEvents } from './styles';

interface MatchEventsProps {
  events: Record<any, any>[]
  participants: Record<any, any>[]
  currentPlayer: Record<any, any>
  version: number | string
}

const MatchEvents: FunctionComponent<MatchEventsProps> = (props: MatchEventsProps) => {
  const {
    events, participants, currentPlayer, version,
  } = props;
  /* BUILDING_KILL,
  ** - BUILDING_TYPE: TOWER_BUILDING
  ** - TOWER_TYPE: INNER_TURRET, OUTER_TURRET, BASE_TURRET, NEXUS_TURRET, INHIBITOR_BUILDING
  ** CHAMPION_KILL,
  ** ELITE_MONSTER_KILL,
  ** - DRAGON, RIFTHERALD, ELDER_DRAGON, BARON_NASHOR
  ** WARD_PLACED && WARD_TYPE
  ** WARD_KILLED && WARD_TYPE
  */

  const eventsList: (ReactElement | null)[] = events.map((event) => {
    if (event.type === 'CHAMPION_KILL') {
      const victim = participants.find((participant) => participant.participantId === event.victimId) || {};
      const killer = participants.find((participant) => participant.participantId === event.killerId) || {};
      const assisters = event.assistingParticipantIds ? event.assistingParticipantIds.map((assister: number) => {
        const assist = participants.find((participant) => participant.participantId === assister);
        if (!assist) {
          return <div className="no-champion" />;
        }

        return (
          <div
            className={cx('champion-assister', { blue: assister <= 5, red: assister > 5, user: assister === currentPlayer.participantId })}
          >
            <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${assist.championName}.png`} alt="champion" />
          </div>
        );
      }) : [];

      return (
        <div className="event-champion-kills">
          <div className="team-kill">
            <div
              // eslint-disable-next-line max-len
              className={cx('champion-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })}
            >
              {killer.participantId ? (
                <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championName}.png`} alt="champion" />
              ) : 'Executed'}
            </div>
            {assisters.length > 0 && (
              <div className="team-assist">
                {assisters}
              </div>
            )}
          </div>
          <div className="desc-icon">
            <img src="../../../../images/kda.png" alt="kda" />
          </div>
          <div
              // eslint-disable-next-line max-len
            className={cx('champion-victim', { blue: victim.participantId <= 5, red: victim.participantId > 5, user: victim.participantId === currentPlayer.participantId })}
          >
            <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${victim.championName}.png`} alt="champion" />
          </div>
        </div>
      );
    }

    return null;
  });

  return (
    <StyledMatchEvents>
      <div className="events">
        <h4>Objectives</h4>
        {eventsList}
      </div>
    </StyledMatchEvents>
  );
};
export default MatchEvents;
