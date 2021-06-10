import { AxiosResponse } from 'axios';

export const generateAxiosResponseObject = (data: any, options = {}): AxiosResponse => {
  const defaults = {
    status: 0,
    statusText: '',
    headers: '',
    config: {},
  };

  return { ...defaults, ...options, data };
};

// get summoner spell name
interface Summoners {
  summoner1Id: number;
  summoner2Id: number
}

export const getSummoners = (summonersList: Record<any, any> | null, summonerSpells: Summoners) => {
  const spellName = {
    spell1: '',
    spell2: '',
  };

  if (!summonersList) {
    return spellName;
  }

  // eslint-disable-next-line no-restricted-syntax, prefer-const, guard-for-in
  for (let spell in summonersList) {
    const { image, key } = summonersList[spell];

    if (key == summonerSpells.summoner1Id) {
      spellName.spell1 = image;
    }
    if (key == summonerSpells.summoner2Id) {
      spellName.spell2 = image;
    }
  }

  return spellName;
};

/* converts number to string representation with K and M.
** toFixed(d) returns a string that has exactly 'd' digits
** after the decimal place, rounding if necessary.
*/
export const numberFormatter = (num: number): string => {
  if (num > 999 && num <= 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  } if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  }
  return num.toString(); // if value < 1000, nothing to do
};

export const msToTime = (duration: number): string => {
  let seconds = (duration / 1000) % 60;
  let minutes = (duration / (1000 * 60)) % 60;
  let hours = (duration / (1000 * 60 * 60)) % 24;

  hours = (hours < 10) ? 0 : hours;
  minutes = (minutes < 10) ? 0 : minutes;
  seconds = (seconds < 10) ? 0 : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

export const parseStats = (statsData: Record<any, any>[], type: string) => {
  const stats = statsData.map(
    ({
      champion, isCurrentPlayer, player, team,
    }, index, self) => ({
      x: `${champion}`,
      y: ['deathShare', 'killParticipation'].includes(type)
        ? Math.floor(self[index][type])
        : self[index][type],
      player,
      label: `${champion} ${player}`,
      isCurrentPlayer,
      team,
    }),
  );

  return stats;
};

export const convertTimestamp = (timestamp: number): string => {
  const hours = Math.floor(timestamp / (1000 * 3600));
  const minutes = Math.floor(timestamp / (1000 * 60)) % 60;
  const seconds = Math.floor(timestamp / 1000) % 60;

  const longHours = hours < 10 ? `0${hours}` : hours;
  const longMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const longSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${longHours}:${longMinutes}:${longSeconds}`;
};

export const getStrokeColor = (participantId: number, isCurrentPlayer: boolean) => {
  if (isCurrentPlayer) {
    return 'purple';
  }
  if (participantId <= 5) {
    return '#2747e8';
  }
  return '#cb2124';
};

export const getParticipant = (participants: Record<any, any>[], playerId: number): Record<any, any> => {
  const participantObj = participants.find((participant) => participant.participantId === playerId) || {};
  return participantObj;
};

export const getMonster = (monsterType: string, monsterSubType: string, killerTeamId: 100 | 200): string | null => {
  const teamColor = killerTeamId === 100 ? 'blue' : 'red';

  if (monsterType === 'DRAGON') {
    if (monsterSubType === 'AIR_DRAGON') {
      return `air-dragon-${teamColor}`;
    }
    if (monsterSubType === 'EARTH_DRAGON') {
      return `earth-dragon-${teamColor}`;
    }
    if (monsterSubType === 'FIRE_DRAGON') {
      return `fire-dragon-${teamColor}`;
    }
    if (monsterSubType === 'WATER_DRAGON') {
      return `water-dragon-${teamColor}`;
    }
    if (monsterSubType === 'ELDER_DRAGON') {
      return `elder-dragon-${teamColor}`;
    }
  }

  if (monsterType === 'RIFTHERALD') {
    return `riftherald-${teamColor}`;
  }

  if (monsterType === 'BARON_NASHOR') {
    return `baron-nashor-${teamColor}`;
  }

  return null;
};
