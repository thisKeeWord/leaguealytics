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

    const matchTimelineData = (await api.riotAPI.match.timeline.get(matchId)).data;
    await firestoreMatchDoc.set(matchTimelineData.info, { merge: true });

    res.send(matchTimelineData.info);
  } catch (error) {
    res.send({ error: error.message });
  }
};
