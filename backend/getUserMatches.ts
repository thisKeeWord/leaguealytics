import api from '../api';

export const getUserMatches = async (req, res) => {
  const puuid = req.params.puuid;

  try {
    const firestoreUser = (await api.users.where('puuid', '==', puuid).get()).docs[0].id;

    const userDoc = api.users.doc(firestoreUser);
    const userDocData = (await userDoc.get()).data();

    const userMatchesDoc = userDoc.collection('match');
    const currentMatches = (await userMatchesDoc.get()).docs;

    const matchInfo = await Promise.all(userDocData?.matches.map(async (match) => {
      const savedMatchData = currentMatches.find(
        (currentMatchDoc) => currentMatchDoc.data().matchId == match.matchId,
      );
      let matchDataObj = savedMatchData ? savedMatchData?.data() : {};

      if (!Object.keys(matchDataObj).length) {
        const matchOverviewData = (await api.riotAPI.match.overview.get(match.matchId)).data;
        const teamStats = (matchOverviewData.info.participants as Array<any>)
          .reduce((accumulator, currentValue: Record<any, any>) => {
            const {
              kills, deaths, assists, goldEarned, teamId,
            } = currentValue;
            accumulator[teamId] = {
              kills: accumulator[teamId]
                ? accumulator[teamId].kills + kills
                : kills,
              deaths: accumulator[teamId]
                ? accumulator[teamId].deaths + deaths
                : deaths,
              assists: accumulator[teamId]
                ? accumulator[teamId].assists + assists
                : assists,
              goldEarned: accumulator[teamId]
                ? accumulator[teamId].goldEarned + goldEarned
                : goldEarned,
            };

            return accumulator;
          }, {});

        (matchOverviewData.info.teams as Array<Record<any, any>>).forEach(
          ({ teamId }, index, self) => {
            self[index].kills = teamStats[teamId].kills;
            self[index].deaths = teamStats[teamId].deaths;
            self[index].assists = teamStats[teamId].assists;
            self[index].goldEarned = teamStats[teamId].goldEarned;
          },
          {},
        );

        matchDataObj = matchOverviewData.info;
      }

      // eslint-disable-next-line max-len
      const currentUser = matchDataObj.participants.find(({ summonerId }) => summonerId === userDocData.id);

      await userMatchesDoc.doc(match.matchId).set({
        ...matchDataObj,
        matchId: match.matchId,
      }, { merge: true });

      return ({
        matchId: match.matchId,
        gameCreation: matchDataObj.gameCreation,
        gameDuration: matchDataObj.gameDuration,
        gameId: matchDataObj.gameId,
        gameMode: matchDataObj.gameMode,
        gameName: matchDataObj.gameName,
        gameType: matchDataObj.gameType,
        gameVersion: matchDataObj.gameVersion,
        mapId: matchDataObj.mapId,
        platformId: matchDataObj.platformId,
        queueId: matchDataObj.queueId,
        champion: currentUser.championId,
        championName: currentUser.championName,
        champLevel: currentUser.champLevel,
        goldEarned: currentUser.goldEarned,
        summoner1Id: currentUser.summoner1Id,
        summoner2Id: currentUser.summoner2Id,
        item0: currentUser.item0,
        item1: currentUser.item1,
        item2: currentUser.item2,
        item3: currentUser.item3,
        item4: currentUser.item4,
        item5: currentUser.item5,
        item6: currentUser.item6,
        kills: currentUser.kills,
        deaths: currentUser.deaths,
        assists: currentUser.assists,
        creepScore: currentUser.neutralMinionsKilled + currentUser.totalMinionsKilled,
        victory: currentUser.win,
      });
    }));

    await userDoc.set({
      matches: matchInfo,
    }, { merge: true });
    const updatedMatches = (await userMatchesDoc.get()).docs;
    const updatedUser = (await userDoc.get()).data();

    res.send({
      user: updatedUser,
      matches: userDocData?.matches,
      matchListData: updatedMatches.map((match) => match.data()),
    });
  } catch (error) {
    res.send({ error: error.message ? error.message : error });
  }
};
