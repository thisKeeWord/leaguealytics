import React, { FunctionComponent, ReactElement } from 'react'
import cx from 'classnames'
import { StyledMatchEvents } from './styles'
import { convertTimestamp, getEventByType, getParticipant } from '../../../../utils/helper'

const getAssisters = (
  assistingParticipantIds: number[], participants: Record<any, any>[], currentPlayer: Record<any, any>, version: string | number,
): ReactElement[] => {
  if (!assistingParticipantIds.length || !participants || !participants.length) {
    return []
  }

  return assistingParticipantIds.map((assister: number, index) => {
    const assist = getParticipant(participants, assister)

    if (!Object.keys(assist).length) {
      return <div className="no-assist" key={assister} />
    }

    return (
      <div
        key={`assister-${index}`}
        className={cx('assister', { blue: assister <= 5, red: assister > 5, user: assister === currentPlayer.participantId })}
      >
        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${assist.championImg}.png`} alt="champion" />
      </div>
    )
  })
}

interface MatchEventsProps {
  prevTimeframe: number
  currTimeframe: number
  events: Record<any, any>[]
  participants: Record<any, any>[]
  currentPlayer: Record<any, any>
  version: number | string
}

const MatchEvents: FunctionComponent<MatchEventsProps> = (props: MatchEventsProps) => {
  const {
    prevTimeframe, currTimeframe, events, participants, currentPlayer, version,
  } = props

  const eventsList: (ReactElement | null)[] = events.map((event, index) => {
    if (event.type === 'CHAMPION_KILL') {
      const victim = getParticipant(participants, event.victimId)
      const killer = getParticipant(participants, event.killerId)
      const assisters = getAssisters(event.assistingParticipantIds || [], participants, currentPlayer, version)

      return (
        <div className="champion-kills" key={`champion-kills-${index}`} data-testid="champion-kills">
          <div className="team-champion-kill">
            {killer.participantId ? (
              // eslint-disable-next-line max-len
              <img className={cx('champion-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championImg}.png`} alt="champion" />
            ) : 'Executed'}
            <div className="champion-timestamp">
              <img className="desc-icon" src="../../../../images/kda.png" alt="kda" />
              <span className="timestamp">{convertTimestamp(event.timestamp)}</span>
            </div>
            {/* eslint-disable-next-line max-len */}
            <img className={cx('champion-victim', { blue: victim.participantId <= 5, red: victim.participantId > 5, user: victim.participantId === currentPlayer.participantId })} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${victim.championImg}.png`} alt="champion" />
          </div>
          {assisters.length > 0 && (
            <div className="team-assist">
              {assisters}
            </div>
          )}
        </div>
      )
    }

    if (event.type === 'WARD_PLACED' || event.type === 'WARD_KILL') {
      let wardNumber = ''
      const wardParticipant = getParticipant(participants, event.type === 'WARD_PLACED' ? event.creatorId : event.killerId)
      if (event.wardType === 'YELLOW_TRINKET' || event.wardType === 'SIGHT_WARD') {
        wardNumber = '3340' // stealth ward
      }
      if (event.wardType === 'CONTROL_WARD') {
        wardNumber = '2055'
      }
      if (event.wardType === 'BLUE_TRINKET') {
        wardNumber = '3363'
      }

      if (!wardNumber || !wardParticipant.participantId) {
        return null
      }

      return (
        <div className="ward-event" key={`ward-event-${index}`} data-testid="ward-event">
          {/* eslint-disable-next-line max-len */}
          <img className={cx({ blue: wardParticipant.participantId <= 5, red: wardParticipant.participantId > 5, user: wardParticipant.participantId === currentPlayer.participantId })} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${wardParticipant.championImg}.png`} alt="champion" />
          <div className="ward-timestamp">
            <span className="desc-icon">{event.type === 'WARD_PLACED' ? 'placed' : 'destroyed'}</span>
            <span className="timestamp">{convertTimestamp(event.timestamp)}</span>
          </div>
          <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${wardNumber}.png`} alt="ward" />
        </div>
      )
    }

    if (event.type === 'ELITE_MONSTER_KILL') {
      const killer = getParticipant(participants, event.killerId)
      const filteredAssisters = event.assistingParticipantIds ? event.assistingParticipantIds.filter((assistingId: number) => (
        event.killerTeamId === 200 ? assistingId > 5 : assistingId <= 5
      )) : []
      const assisters = getAssisters(filteredAssisters, participants, currentPlayer, version)
      // eslint-disable-next-line max-len
      const monster = getEventByType({ type: event.monsterType, subType: event.monsterSubType, teamId: event.killerTeamId || event.teamId })

      return (
        <div className="monster-kills" key={`monster-kills-${index}`} data-testid="elite-monster-kills">
          <div className="team-monster-kill">
            {killer.participantId ? (
              <img
                // eslint-disable-next-line max-len
                className={cx('monster-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })}
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championImg}.png`}
                alt="champion"
              />
            ) : (
              <span className={cx('minion', { blue: event.teamId === 100, red: event.teamId === 200 })}>minion</span>
            )}
            <div className="monster-timestamp">
              <img className="desc-icon" src="../../../../images/kda.png" alt="kda" />
              <span className="timestamp">{convertTimestamp(event.timestamp)}</span>
            </div>
            <img className="monster-victim" src={`../../../images/${monster}.png`} alt="monster" />
          </div>
          {assisters.length > 0 && (
            <div className="team-assist">
              {assisters}
            </div>
          )}
        </div>
      )
    }

    if (event.type === 'BUILDING_KILL') {
      const killer = getParticipant(participants, event.killerId)
      const assisters = getAssisters(event.assistingParticipantIds || [], participants, currentPlayer, version)
      const building = getEventByType({ type: event.buildingType, teamId: event.killerTeamId || event.teamId })

      const lane = event.laneType ? event.laneType.split('_')[0].toLowerCase() : ''
      const laneLocation = event.towerType ? event.towerType.split('_')[0].toLowerCase() : ''

      return (
        <div className="building-kills" key={`building-kills-${index}`} data-testid="building-kills">
          <div className="team-building-kill">
            {/* eslint-disable-next-line max-len */}
            {killer.participantId ? (
              // eslint-disable-next-line max-len
              <img className={cx('building-killer', { blue: killer.participantId <= 5, red: killer.participantId > 5, user: killer.participantId === currentPlayer.participantId })} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${killer.championImg}.png`} alt="champion" />
            ) : (
              <span className={cx('minion', { blue: event.teamId === 100, red: event.teamId === 200 })}>minion</span>
            )}
            <div className="building-timestamp">
              <img className="desc-icon" src="../../../../images/kda.png" alt="kda" />
              <span className="timestamp">{convertTimestamp(event.timestamp)}</span>
            </div>
            <img className="building-victim" src={`../../../images/${building}.png`} alt="building" />
          </div>
          <div className="event-desc">
            {assisters.length > 0 && (
              <div className="team-assist">
                {assisters}
              </div>
            )}
            <div className="building-desc">
              {lane && <span className="lane">{lane}</span>}
              {lane && laneLocation && <span>, </span>}
              {laneLocation && <span className="location">{laneLocation}</span>}
            </div>
          </div>
        </div>
      )
    }

    return null
  })

  return (
    <StyledMatchEvents>
      <div className="events" data-testid="events">
        <h4>Objectives</h4>
        <div className="time-range" data-testid="time-range">
          {currTimeframe > 0 && `${convertTimestamp(prevTimeframe)} - `}
          {convertTimestamp(currTimeframe)}
        </div>
        {eventsList}
      </div>
    </StyledMatchEvents>
  )
}
export default MatchEvents
