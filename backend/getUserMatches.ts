import api from '../api';

export const getUserMatches = async (req, res) => {
  const userId = req.params.userId;

  try {
    const matchList = await api.riotAPI.matchList.get(userId);
    const matches = matchList.data.matches.slice(-20);

    const firestoreUser = (await api.users.where('accountId', '==', userId).get()).docs[0].id;

    await api.users.doc(firestoreUser).set({ matches }, { merge: true });
    res.send(matches);
  } catch (error) {
    throw new Error(error.message);
  }
};
