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
    const teamKillsAndDeaths = (matchOverviewData.participants as Array<any>).reduce(
      (accumulator, currentValue: Record<any, any>) => {
        const { stats, teamId } = currentValue;
        accumulator[teamId] = {
          kills: accumulator[teamId] ? accumulator[teamId].kills + stats.kills : stats.kills,
          deaths: accumulator[teamId] ? accumulator[teamId].deaths + stats.deaths : stats.deaths,
        };

        return accumulator;
      },
      {}
    );

    (matchOverviewData.teams as Array<Record<any, any>>).forEach(({ teamId }, index, self) => {
      self[index]['kills'] = teamKillsAndDeaths[teamId].kills;
      self[index]['deaths'] = teamKillsAndDeaths[teamId].deaths;
    });

    const matchData = { ...matchOverviewData, ...matchTimelineData };

    await firestoreMatchDoc.set(matchData, { merge: true });

    res.send(matchData);
  } catch (error) {
    throw new Error(error.message);
  }
};
