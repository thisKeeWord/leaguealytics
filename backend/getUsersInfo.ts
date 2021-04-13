import api from '../api';

interface PatchType {
  type: string;
  format: string;
  version?: string;
  data: Record<any, any>;
}

export const getUsersInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const firestoreUser = await api.users.doc(username).get();
    const hasUser = firestoreUser.exists;

    if (hasUser) {
      res.send(firestoreUser.data());

      return;
    }

    const user = await api.riotAPI.users.get(username);
    const userData = user.data;

    const patchData = (await api.patchData.doc('latest').get()).data() || { data: {} };
    const matchList = await api.riotAPI.matchList.get(userData.accountId);

    const matches = matchList.data.matches.slice(0, 20);
    const championList = patchData.data as PatchType;

    matches.forEach((match) => {
      // eslint-disable-next-line no-restricted-syntax, prefer-const
      for (let championData in championList) {
        if (championList[championData].key == match.champion) {
          match.championImg = championList[championData].image.full;

          break;
        }
      }
    });

    const userFullData = {...userData, matches }

    await api.users.doc(username).set(userFullData);

    res.send(userFullData);
  } catch (error) {
    res.send({ error: error.message ? error.message : error });
  }
};
