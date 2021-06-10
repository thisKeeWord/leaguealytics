import React, { FunctionComponent, ReactElement } from 'react';
import cx from 'classnames';
import { StyledMatchEvents } from './styles';
import { getMonster, getParticipant } from '../../../../utils/helper';

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
  */

  const eventsList: (ReactElement | null)[] = events ? events.map((event, index) => {
    if (event.type === 'CHAMPION_KILL') {
      const victim = getParticipant(participants, event.victimId);
      const killer = getParticipant(participants, event.killerId);
      const assisters = getAssisters(event.assistingParticipantIds || [], participants, currentPlayer, version);

      return (
        <div className="champion-kills" key={`champion-kills-${index}`}>
          <div className="team-champion-kill">
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
      const wardParticipant = getParticipant(participants, event.type === 'WARD_PLACED' ? event.creatorId : event.killerId);
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
        <div className="ward-event" key={`ward-event-${index}`}>
          {/* eslint-disable-next-line max-len */}
          <img className={cx({ blue: wardParticipant.participantId <= 5, red: wardParticipant.participantId > 5, user: wardParticipant.participantId === currentPlayer.participantId })} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${wardParticipant.championName}.png`} alt="champion" />
          <span>{event.type === 'WARD_PLACED' ? 'placed' : 'destroyed'}</span>
          <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${wardNumber}.png`} alt="ward" />
        </div>
      );
    }

    if (event.type === 'ELITE_MONSTER_KILL') {
      const killer = getParticipant(participants, event.killerId);
      const filteredAssisters = event.assistingParticipantIds ? event.assistingParticipantIds.filter((assistingId: number) => (
        event.killerTeamId === 200 ? assistingId > 5 : assistingId <= 5
      )) : [];
      const assisters = getAssisters(filteredAssisters, participants, currentPlayer, version);
      const monster = getMonster(event.monsterType, event.monsterSubType, event.killerTeamId);

      return (
        <div className="monster-kills" key={`monster-kills-${index}`}>
          <div className="team-monster-kill">
            {/* eslint-disable-next-line max-len */}
            <img className={cx('monster-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championName}.png`} alt="champion" />
            <img className="desc-icon" src="../../../../images/kda.png" alt="kda" />
            {/* eslint-disable-next-line max-len */}
            <img className="monster-victim" src={`../../../images/${monster}.png`} alt="monster" />
          </div>
          {assisters.length > 0 && (
          <div className="team-assist">
            {assisters}
          </div>
          )}
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

// eslint-disable-next-line max-len
const getAssisters = (assistingParticipantIds: number[], participants: Record<any, any>[], currentPlayer: Record<any, any>, version: string | number): ReactElement[] => {
  if (!assistingParticipantIds.length || !participants || !participants.length) {
    return [];
  }

  return assistingParticipantIds.map((assister: number, index) => {
    const assist = getParticipant(participants, assister);

    if (!Object.keys(assist).length) {
      return <div className="no-assist" key={assister} />;
    }

    return (
      <div
        key={`assister-${index}`}
        className={cx('assister', { blue: assister <= 5, red: assister > 5, user: assister === currentPlayer.participantId })}
      >
        <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${assist.championName}.png`} alt="champion" />
      </div>
    );
  });
};
