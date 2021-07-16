import api from '../api';

export const getUsersInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const firestoreUser = await api.users.doc(username).get();
    const userData = firestoreUser.data();

    const user = await api.riotAPI.users.get(username);

    const matchList = await api.riotAPI.matchList.get(user.data.puuid);
    const matches = matchList.data;

    matches.forEach((match, index: number, self) => {
      self[index] = { matchId: match };
    });

    await api.users.doc(username).set({ ...userData, ...user.data, matches });

    res.send({ ...userData, ...user.data, matches });
  } catch (error) {
    res.status(500).send({ error: `An error occurred fetching the user's profile. ${error.message ? error.message : error}` });
  }
};
