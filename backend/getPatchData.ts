import api from '../api';

export const getPatchData = async (req, res) => {
  try {
    const versions = await api.riotAPI.patch.version.get();
    const firestorePatchData = api.patchData.doc('latest');
    const firestorePatchObject = (await firestorePatchData.get()).data();
    const { version, patchData } = firestorePatchObject || {};
    const latestVersion = versions.data[0];
    const isPatchEqual = version === latestVersion;

    const responseData = {
      version: latestVersion,
      patchData: isPatchEqual ? patchData : {},
    };

    if (!version || !isPatchEqual) {
      const newPatchData = await api.riotAPI.patch.data.get(latestVersion);

      const data = newPatchData.data;

      await firestorePatchData.set({
        version: latestVersion,
        patchData: data,
      });

      responseData.patchData = data;
    }

    res.send(responseData);
  } catch (error) {
    throw new Error(error.message);
  }
};
