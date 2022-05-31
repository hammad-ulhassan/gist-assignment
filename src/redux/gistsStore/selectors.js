export const selectAllGists = (state) => state.gists.gists;
export const selectGistsStatus = (state) => state.gists.status;
export const selectGistsError = (state) => state.gists.error;
export const selectSelectedGist = (state) => state.gists.selectedGist;
export const selectedGistAllData = (state) => state.gists.selectedGistAllData;
export const selectAllDataStatus = (state) => state.gists.gistAllDataStatus;
export const selectGistDeleteStatus = (state) => state.gists.deleteGistStatus;
export const selectGistCreatedStatus = (state) => state.gists.createGistStatus;
