import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage";
import {
  fetchPublicGists,
  fetchSelectedGistData,
  editGist,
  deleteGist,
  createGist,
  starGist,
} from "./thunk";

const initialState = {
  gists: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedGist: {},
  selectedGistAllData: null,
  gistAllDataStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  editGistStatus: "idle",
  editGistResponse: null,
  deleteGistStatus: "idle",
  deleteGistResponse: null,
  createGistStatus: "idle",
  createGistResponse: null,
};

export const gistSlice = createSlice({
  name: "gist",
  initialState: loadState().gists || initialState,
  reducers: {
    selectedGist(state, action) {
      state.selectedGist = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPublicGists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPublicGists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gists = action.payload;
      })
      .addCase(fetchPublicGists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSelectedGistData.pending, (state, action) => {
        state.gistAllDataStatus = "loading";
      })
      .addCase(fetchSelectedGistData.fulfilled, (state, action) => {
        state.gistAllDataStatus = "succeeded";
        state.selectedGistAllData = action.payload;
      })
      .addCase(editGist.fulfilled, (state, action) => {
        state.editGistStatus = "succeeded";
        state.editGistResponse = action.payload;
      })
      .addCase(deleteGist.fulfilled, (state, action) => {
        state.deleteGistStatus = "succeeded";
        state.deleteGistResponse = action.payload;
      })
      .addCase(createGist.fulfilled, (state, action) => {
        state.createGistStatus = "succeeded";
        state.createGistResponse = action.payload;
      })
      .addCase(starGist.fulfilled, (state, action) => {
        state.createGistStatus = "succeeded";
        state.createGistResponse = action.payload;
      });
  },
});

export default gistSlice.reducer;
