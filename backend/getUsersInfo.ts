import api from '../api';

export const getUsersInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const firestoreUser = await api.users.doc(username).get();

    let userData = firestoreUser.data();

    if (!userData) {
      const user = await api.riotAPI.users.get(username);
      userData = user.data;
    }

    const matchList = await api.riotAPI.matchList.get(userData!.puuid);
    const matches = matchList.data;

    matches.forEach((match, index, self) => {
      self[index] = { matchId: match };
    });

    await api.users.doc(username).set({ ...userData, matches });

    res.send({ ...userData, matches });
  } catch (error) {
    res.send({ error: error.message ? error.message : error });
  }
};
