import api from '../api';

export const getPatchData = async (req, res) => {
  try {
    const versions = await api.riotAPI.patch.version.get();
    const firestorePatchData = api.patchData.doc('latest');
    const firestorePatchObject = (await firestorePatchData.get()).data();
    const { version, data, ...firestoreRest } = firestorePatchObject || {};

    const latestVersion = versions.data[0];

    if (!latestVersion) {
      throw new Error('An error has occurred.');
    }

    const isPatchEqual = version === latestVersion;

    let responseData = {
      version: latestVersion,
      data: isPatchEqual ? data : {},
      ...firestoreRest,
    };

    if (!version || !isPatchEqual) {
      const newPatchData = await api.riotAPI.patch.data.get(latestVersion);
      const newData = newPatchData.data;

      await firestorePatchData.set({
        ...newData,
      });

      responseData = {
        ...newData,
      };
    }

    res.send(responseData);
  } catch (error: any) {
    res.status(500).send({ error: `An error occurred getting the patch data. ${error.message ? error.message : error}` });
  }
};
