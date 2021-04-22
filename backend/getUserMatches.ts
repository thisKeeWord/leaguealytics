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
      const savedMatchDataObj = savedMatchData ? savedMatchData?.data() : {};

      const matchOverviewData = (await api.riotAPI.match.overview.get(match.matchId)).data;
      const teamKillsAndDeaths = (matchOverviewData.info.participants as Array<any>)
        .reduce((accumulator, currentValue: Record<any, any>) => {
          const { kills, deaths, teamId } = currentValue;
          accumulator[teamId] = {
            kills: accumulator[teamId]
              ? accumulator[teamId].kills + kills
              : kills,
            deaths: accumulator[teamId]
              ? accumulator[teamId].deaths + deaths
              : deaths,
          };

          return accumulator;
        }, {});

      (matchOverviewData.info.teams as Array<Record<any, any>>).forEach(
        ({ teamId }, index, self) => {
          self[index].kills = teamKillsAndDeaths[teamId].kills;
          self[index].deaths = teamKillsAndDeaths[teamId].deaths;
        },
        {},
      );

      // eslint-disable-next-line max-len
      const currentUser = matchOverviewData.info.participants.find(({ summonerId }) => summonerId === userDocData.id);

      await userMatchesDoc.doc(match.matchId).set({
        ...savedMatchDataObj,
        ...matchOverviewData.info,
        matchId: match.matchId,
      }, { merge: true });

      return ({
        matchId: match.matchId,
        gameCreation: matchOverviewData.info.gameCreation,
        gameDuration: matchOverviewData.info.gameDuration,
        gameId: matchOverviewData.info.gameId,
        gameMode: matchOverviewData.info.gameMode,
        gameName: matchOverviewData.info.gameName,
        gameType: matchOverviewData.info.gameType,
        gameVersion: matchOverviewData.info.gameVersion,
        mapId: matchOverviewData.info.mapId,
        platformId: matchOverviewData.info.platformId,
        queueId: matchOverviewData.info.queueId,
        champion: currentUser.championId,
        championName: currentUser.championName,
        champLevel: currentUser.champLevel,
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
