import api from '../api';

export const getUserInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const firestoreUser = api.users.doc(username).get();
    const hasUser = (await firestoreUser).exists;

    if (hasUser) {
      res.send(firestoreUser);
    }

    const user = await api.riotAPI.users.get(username);
    const userData = user.data;
    await api.users.doc(username).set(userData);
    res.send(userData);
  } catch (error) {
    throw new Error(error.message);
  }
};
