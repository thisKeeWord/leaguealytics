import api from '../api';

interface PatchType {
  type: string;
  format: string;
  version: string;
  data: Record<any, any>;
}

export const getUserMatches = async (req, res) => {
  const userId = req.params.userId;

  try {
    const patchData = (await api.patchData.doc('latest').get()).data() || { data: {} };
    const matchList = await api.riotAPI.matchList.get(userId);
    const matches = matchList.data.matches.slice(-20);
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

    await api.users.doc(firestoreUser).set({ matches }, { merge: true });
    res.send(matches);
  } catch (error) {
    throw new Error(error.message);
  }
};
