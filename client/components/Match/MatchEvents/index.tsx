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
  ** ELITE_MONSTER_KILL,
  ** - DRAGON, RIFTHERALD, ELDER_DRAGON, BARON_NASHOR
  */

  const eventsList: (ReactElement | null)[] = events ? events.map((event, index) => {
    if (event.type === 'CHAMPION_KILL') {
      const victim = participants.find((participant) => participant.participantId === event.victimId) || {};
      const killer = participants.find((participant) => participant.participantId === event.killerId) || {};
      const assisters = event.assistingParticipantIds ? event.assistingParticipantIds.map((assister: number) => {
        const assist = participants.find((participant) => participant.participantId === assister);
        if (!assist) {
          return <div className="no-champion" key={assister} />;
        }

        return (
          <div
            key={assister}
            className={cx('champion-assister', { blue: assister <= 5, red: assister > 5, user: assister === currentPlayer.participantId })}
          >
            <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${assist.championName}.png`} alt="champion" />
          </div>
        );
      }) : [];

      return (
        <div className="champion-kills" key={index}>
          <div className="team-kill">

            {killer.participantId ? (
              // eslint-disable-next-line max-len
              <img className={cx('champion-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championName}.png`} alt="champion" />
            ) : 'Executed'}
            <img className="desc-icon" src="../../../../images/kda.png" alt="kda" />
            {/* eslint-disable-next-line max-len */}
            <img className={cx('champion-victim', { blue: victim.participantId <= 5, red: victim.participantId > 5, user: victim.participantId === currentPlayer.participantId })} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${victim.championName}.png`} alt="champion" />
          </div>
          {assisters.length > 0 && (
          <div className="team-assist">
            {assisters}
          </div>
          )}
        </div>
      );
    }

    if (event.type === 'WARD_PLACED' || event.type === 'WARD_KILL') {
      let wardNumber = '';
      // eslint-disable-next-line max-len
      const wardParticipant = participants.find((participant) => participant.participantId === (event.type === 'WARD_PLACED' ? event.creatorId : event.killerId)) || {};
      if (event.wardType === 'YELLOW_TRINKET') {
        wardNumber = '3340'; // stealth ward
      }
      if (event.wardType === 'CONTROL_WARD') {
        wardNumber = '2055';
      }

      if (!wardNumber || !wardParticipant.participantId) {
        return null;
      }

      return (
        <div className="ward-event" key={index}>
          {/* eslint-disable-next-line max-len */}
          <img className={cx({ blue: wardParticipant.participantId <= 5, red: wardParticipant.participantId > 5, user: wardParticipant.participantId === currentPlayer.participantId })} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${wardParticipant.championName}.png`} alt="champion" />
          <span>{event.type === 'WARD_PLACED' ? 'placed' : 'destroyed'}</span>
          <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${wardNumber}.png`} alt="ward" />
        </div>
      );
    }

    return null;
  }) : [];

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
