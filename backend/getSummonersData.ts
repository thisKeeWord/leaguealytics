import api from '../api';

export const getSummonersData = async (req, res) => {
  const version = req.params.version;

  try {
    const firestoreSummonerSpellData = api.summoners.doc('summoners');
    const summoners = (await firestoreSummonerSpellData.get()).data() || {};
    const summonersVersion = summoners.version;

    if (!version) {
      throw new Error('An error has occurred.');
    }

    const isPatchEqual = summonersVersion === version;

    const responseData = {
      summonersData: isPatchEqual ? summoners : {},
    };

    if (!summonersVersion || !isPatchEqual) {
      const newSummonersData = await api.riotAPI.summoners.get(version);
      const newData = newSummonersData.data;
      const { data, ...rest } = newData;

      // eslint-disable-next-line no-restricted-syntax, prefer-const, guard-for-in
      for (let spell in data) {
        data[spell] = {
          id: data[spell].id,
          name: data[spell].name,
          description: data[spell].description,
          tooltip: data[spell].tooltip,
          key: data[spell].key,
          image: data[spell].image.full,
        };
      }

      await firestoreSummonerSpellData.set({ ...rest, data });

      responseData.summonersData = { ...rest, data };
    }

    res.send(responseData);
  } catch (error: any) {
    res.status(500).send({ error: `An error occurred fetching summoner spells information. ${error.message ? error.message : error}` });
  }
};
