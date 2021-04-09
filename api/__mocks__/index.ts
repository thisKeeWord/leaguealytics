/* eslint-disable import/first */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/order */
import { API } from '../';
import { mockFirebase } from 'firestore-jest-mock';
import riotAPI from './../riotgames';

export const firebaseDatabase = {
  user: [
    {
      accountId: '123',
      id: '234',
      summonerLevel: 271,
      name: 'TEEHEE92',
      profileIconId: 123,
      puuid: '123',
      revisionDate: 1616226785000,
      matches: [
        {
          championImg: 'Anivia.png',
          role: 'DUO_SUPPORT',
          platformId: 'NA1',
          queue: 450,
          lane: 'MID',
          gameId: 3833657566,
          timestamp: 1616225321603,
          season: 13,
          champion: 34,
        },
      ],
    },
  ],
  patch: [
    {
      version: '11.6.1',
      patchData: {
        Malzahar: {
          stats: {
            critperlevel: 0,
            mpregenperlevel: 0.8,
            crit: 0,
            hpperlevel: 87,
            attackspeedperlevel: 1.5,
            armorperlevel: 3.5,
            attackdamage: 55,
            mpregen: 8,
            armor: 18,
            hpregen: 6,
            attackrange: 500,
            spellblockperlevel: 0.5,
            spellblock: 30,
            movespeed: 335,
            attackspeed: 0.625,
            attackdamageperlevel: 3,
            hpregenperlevel: 0.6,
            hp: 537,
            mpperlevel: 27.5,
            mp: 375,
          },
          image: {
            sprite: 'champion2.png',
            h: 48,
            w: 48,
            group: 'champion',
            full: 'Malzahar.png',
            y: 48,
            x: 0,
          },
          id: 'Malzahar',
          key: '90',
          info: {
            magic: 9, attack: 2, defense: 2, difficulty: 6,
          },
          blurb:
            "A zealous seer dedicated to the unification of all life, Malzahar truly believes the newly emergent Void to be the path to Runeterra's salvation. In the desert wastes of Shurima, he followed the voices that whispered in his mind, all the way to ancient...",
          partype: 'Mana',
          tags: ['Mage', 'Assassin'],
          version: '11.6.1',
          title: 'the Prophet of the Void',
          name: 'Malzahar',
        },
      },
    },
  ],
};

mockFirebase({
  database: firebaseDatabase,
});

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
});

const store = firebase.firestore();

const api: API = {
  users: store.collection('user'),
  patchData: store.collection('patch'),
  riotAPI,
};

export default api;
