import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import headers from "../credentials";
import { loadState } from "../localStorage";

const myHeaders = new Headers(headers);

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
      });
  },
});

export default gistSlice.reducer;

export const selectAllGists = (state) => state.gists.gists;
export const selectGistsStatus = (state) => state.gists.status;
export const selectGistsError = (state) => state.gists.error;
export const selectSelectedGist = (state) => state.gists.selectedGist;
export const selectedGistAllData = (state) => state.gists.selectedGistAllData;
export const selectAllDataStatus = (state) => state.gists.gistAllDataStatus;

export const selectGistDeleteStatus = (state) => state.gists.deleteGistStatus;

export const selectGistCreatedStatus = (state) => state.gist.createGistStatus;

export const { selectedGist } = gistSlice.actions;

export const fetchPublicGists = createAsyncThunk(
  "gist/fetchPublicGists",
  async ({ per_page, page }) => {
    const res = await fetch(
      "https://api.github.com/gists/public?" +
        new URLSearchParams({ per_page: per_page, page: page }),
      { method: "get" , headers: myHeaders}
    );
    const response = await res.json();
    const resp = await response.map((gist) => {
      return {
        gist,
        date: moment(gist.created_at).format("DD-MM-YYYY"),
        time: moment(gist.created_at).format("HH:mm"),
        keyword: gist.description,
        notebook: [...Object.keys(gist.files)],
        key: gist.id,
      };
    });
    return resp;
  }
);

export const fetchSelectedGistData = createAsyncThunk(
  "gist/fetchSelectedGistData",
  async (_, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`, 
    {
      method: "get",
      headers: myHeaders,
    });
    const response = await res.json();
    return response;
  }
);

export const editGist = createAsyncThunk(
  "gist/editGist",
  async (postData, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`,
      { method: "patch", headers: myHeaders, body: JSON.stringify(postData) }
    );
    const response = await res.json();
    return response;
  }
);

//conditional dispatch
//delayed dispatch
//synchronous thunk

export const deleteGist = createAsyncThunk(
  "gist/deleteGist",
  async (_, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`,
      { method: "delete", headers: myHeaders }
    );
    const response = await res.json();
    return response;
  }
);

export const createGist = createAsyncThunk(
  "gist/createGist",
  async (postData, _) => {
    const res = await fetch(`https://api.github.com/gists`, {
      method: "post",
      headers: myHeaders,
      body: JSON.stringify(postData),
    });
    const response = await res.json();
    return response;
  }
);
