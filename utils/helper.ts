import { AxiosResponse } from 'axios';

export const generateAxiosResponseObject = (data: any, options = {}): AxiosResponse => {
  const defaults = {
    status: 0,
    statusText: '',
    headers: '',
    config: {},
  };

  return {
    ...defaults,
    ...options,
    data,
  };
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
export const numberFormatter = (num: number) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  } if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  } if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};
