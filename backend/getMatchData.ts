/* 
  1. get championId and other information 
    corresponding to participantId from 
    https://na1.api.riotgames.com/lol/match/v4/matches/3813810489
  2. save to firestore
  3. return data
*/

import api from '../api';

export const getMatchData = async (req, res) => {
  const { username, matchId } = req.params;

  try {
    const firestoreMatchDoc = api.users
      .doc(username)
      .collection('match')
      .doc(matchId);
    const firestoreMatchData = (await firestoreMatchDoc.get()).data() || {};

    if (firestoreMatchData.size > 0) {
      res.send(firestoreMatchData);

      return;
    }

    const matchOverviewData = (await api.riotAPI.match.overview.get(matchId)).data;
    const matchTimelineData = (await api.riotAPI.match.timeline.get(matchId)).data;

    const matchData = { ...matchOverviewData, ...matchTimelineData };

    await firestoreMatchDoc.set(matchData, { merge: true });

    res.send(matchData);
  } catch (error) {
    throw new Error(error.message);
  }
};
