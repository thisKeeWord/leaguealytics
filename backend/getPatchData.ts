import api from '../api';

export const getPatchData = async (req, res) => {
  try {
    const versions = await api.riotAPI.patch.version.get();
    const firestorePatchData = api.patchData.doc('latest');
    const firestorePatchObject = (await firestorePatchData.get()).data();
    const { version, data } = firestorePatchObject || {};
    const latestVersion = versions.data[0];
    const isPatchEqual = version === latestVersion;

    const responseData = {
      version: latestVersion,
      patchData: isPatchEqual ? data : {},
    };

    if (!version || !isPatchEqual) {
      const newPatchData = await api.riotAPI.patch.data.get(latestVersion);

      const newData = newPatchData.data;

      await firestorePatchData.set({
        ...newData,
      });

      responseData.patchData = newData;
    }

    res.send(responseData);
  } catch (error) {
    throw new Error(error.message);
  }
};
