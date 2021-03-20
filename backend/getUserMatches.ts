import api from '../api';

interface PatchType {
  type: string;
  format: string;
  version?: string;
  data: Record<any, any>;
}

export const getUserMatches = async (req, res) => {
  const userId = req.params.userId;

  try {
    const patchData = (await api.patchData.doc('latest').get()).data() || { data: {} };
    const matchList = await api.riotAPI.matchList.get(userId);
    const matches = matchList.data.matches.slice(0, 20);
    const championList = patchData.data as PatchType;

    matches.forEach((match) => {
      for (let championData in championList) {
        if (championList[championData].key == match.champion) {
          match.championImg = championList[championData].image.full;

          break;
        }
      }
    });

    const firestoreUser = (await api.users.where('accountId', '==', userId).get()).docs[0].id;

    const userDoc = api.users.doc(firestoreUser);

    await userDoc.set({ matches }, { merge: true });

    const userMatchesDoc = userDoc.collection('match');

    const currentMatches = (await userMatchesDoc.get()).docs;

    matches.forEach(async (match) => {
      const savedMatchData = currentMatches.find(
        (currentMatchDoc) => currentMatchDoc.data().gameId === match.gameId
      );

      if (savedMatchData) {
        const savedMatchDataObj = savedMatchData?.data();
        await userMatchesDoc.doc(match.gameId.toString()).set(savedMatchDataObj, { merge: true });
      }
    });

    const updatedMatches = (await userMatchesDoc.get()).docs;

    res.send({ matches, matchListData: updatedMatches.map((match) => match.data()) });
  } catch (error) {
    throw new Error(error.message);
  }
};
