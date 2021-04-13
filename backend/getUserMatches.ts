import api from '../api';

export const getUserMatches = async (req, res) => {
  const userId = req.params.userId;

  try {
    const firestoreUser = (await api.users.where('accountId', '==', userId).get()).docs[0].id;

    const userDoc = api.users.doc(firestoreUser);
    const userDocMatches = (await userDoc.get()).data();

    // if (!userDocMatches) {
    //   return
    // }

    const userMatchesDoc = userDoc.collection('match');
    const currentMatches = (await userMatchesDoc.get()).docs;

    await Promise.all(userDocMatches?.matches.map(async (match) => {
      const savedMatchData = currentMatches.find(
        (currentMatchDoc) => currentMatchDoc.data().gameId == match.gameId,
      );
      const savedMatchDataObj = savedMatchData ? savedMatchData?.data() : {};

      const matchOverviewData = (await api.riotAPI.match.overview.get(match.gameId)).data;
      const teamKillsAndDeaths = (matchOverviewData.participants as Array<any>)
        .reduce((accumulator, currentValue: Record<any, any>) => {
          const { stats, teamId } = currentValue;
          accumulator[teamId] = {
            kills: accumulator[teamId]
              ? accumulator[teamId].kills + stats.kills
              : stats.kills,
            deaths: accumulator[teamId]
              ? accumulator[teamId].deaths + stats.deaths
              : stats.deaths,
          };

          return accumulator;
        }, {});

      (matchOverviewData.teams as Array<Record<any, any>>).forEach(
        ({ teamId }, index, self) => {
          self[index].kills = teamKillsAndDeaths[teamId].kills;
          self[index].deaths = teamKillsAndDeaths[teamId].deaths;
        },
        {},
      );

      (matchOverviewData.teams as Array<Record<any, any>>).forEach(({ teamId }, index, self) => {
        self[index].kills = teamKillsAndDeaths[teamId].kills;
        self[index].deaths = teamKillsAndDeaths[teamId].deaths;
      });

      await userMatchesDoc.doc(match.gameId.toString()).set({
        ...savedMatchDataObj,
        ...matchOverviewData,
      }, { merge: true });
    }));

    const updatedMatches = (await userMatchesDoc.get()).docs;

    res.send({
      matches: userDocMatches?.matches,
      matchListData: updatedMatches.map((match) => match.data()),
    });
  } catch (error) {
    res.send({ error: error.message ? error.message : error });
  }
};
