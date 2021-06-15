import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import MatchEvents from '.';

const participants = [
  { participantId: 1 },
  { participantId: 2 },
  { participantId: 3 },
  { participantId: 4 },
  { participantId: 5 },
  { participantId: 6 },
  { participantId: 7 },
  { participantId: 8 },
  { participantId: 9 },
  { participantId: 10 },
];
const eventFrame = [
  {
    buildingType: 'TOWER_BUILDING',
    killerId: 10,
    laneType: 'MID_LANE',
    position: {
      x: 5846,
      y: 6396,
    },
    teamId: 100,
    timestamp: 1178722,
    towerType: 'OUTER_TURRET',
    type: 'BUILDING_KILL',
  },
  {
    assistingParticipantIds: [
      1,
      3,
    ],
    bounty: 300,
    killStreakLength: 0,
    killerId: 2,
    position: {
      x: 6728,
      y: 3168,
    },
    timestamp: 1218724,
    type: 'CHAMPION_KILL',
    victimDamageDealt: [],
    victimDamageReceived: [],
    victimId: 7,
  },
  {
    creatorId: 3,
    timestamp: 1228731,
    type: 'WARD_PLACED',
    wardType: 'SIGHT_WARD',
  },
  {
    assistingParticipantIds: [
      8,
    ],
    killerId: 9,
    killerTeamId: 200,
    monsterSubType: 'AIR_DRAGON',
    monsterType: 'DRAGON',
    position: {
      x: 9866,
      y: 4416,
    },
    timestamp: 1342601,
    type: 'ELITE_MONSTER_KILL',
  },
];

const currentPlayer = {
  teamId: 200,
  totalMinionsKilled: 33,
  magicDamageDealtToChampions: 15214,
  physicalDamageDealt: 22041,
  summonerName: 'TEEHEE92',
  goldEarned: 10740,
};

const prevTimeframe = 60000;
const currTimeframe = 120000;

describe('MatchEvents', () => {
  let renderer: ReturnType<typeof render>;
  let getByTestId: Function;

  beforeEach(() => {
    renderer = render(
      <MatchEvents
        events={eventFrame}
        prevTimeframe={prevTimeframe}
        currTimeframe={currTimeframe}
        version={faker.random.alphaNumeric()}
        participants={participants}
        currentPlayer={currentPlayer}
      />,
    );
    getByTestId = renderer.getByTestId;
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('displays the champion kills block if CHAMPION_KILL event exists', () => {
    expect(getByTestId('champion-kills')).toBeInTheDocument();
  });

  it('displays the ward event block if WARD_PLACED event exists', () => {
    expect(getByTestId('ward-event')).toBeInTheDocument();
  });

  it('displays the elite monster kills block if ELITE_MONSTER_KILL event exists', () => {
    expect(getByTestId('elite-monster-kills')).toBeInTheDocument();
  });

  it('displays the building kills block if BUILDING_KILL event exists', () => {
    expect(getByTestId('building-kills')).toBeInTheDocument();
  });

  it('displays the time range', () => {
    const timeRange = getByTestId('time-range');

    expect(timeRange).toHaveTextContent('00:01:00 - 00:02:00');
  });
});
