import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectUsername } from "./credentialSlice";
import { selectSelectedGist } from "./gistSlice";
import headers from '../credentials';
import { loadState } from "../localStorage";

const myHeaders = new Headers(headers)


const initialState = {
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  userData: null,
  userGists: null,
  userGistsStatus:"idle",
  userGistsError:null,
  myGists:null,
  myGistsStatus: "idle"
};

export const userSlice = createSlice({
  name: "user",
  initialState: loadState().users || initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserGists.rejected, (state, action) => {
        state.userGistsStatus = "failed";
        state.userGistsError = action.error.message;
      })
      .addCase(fetchUserGists.pending, (state, action) => {
        state.userGistsStatus = "loading";
      })
      .addCase(fetchUserGists.fulfilled, (state, action) => {
        state.userGistsStatus = "succeeded";
        state.userGists = action.payload;
      })
      .addCase(fetchMyGists.fulfilled, (state, action) => {
        state.myGistsStatus = "succeeded";
        state.myGists = action.payload;
      });

  },
});

export default userSlice.reducer;

export const selectUserData = (state) => state.users.userData;
export const selectUserDataStatus = (state) => state.users.status;
export const selectUserDataError = (state) => state.users.error;

export const selectUserGistsStatus = (state) => state.users.userGistsStatus;
export const selectUserGists = (state) => state.users.userGists;

export const selectMyGistsStatus = (state) => state.users.myGistsStatus;
export const selectMyGists = (state) => state.users.myGists;


export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState }) => {
    const res = await fetch(selectSelectedGist(getState())?.owner?.url, {
      method: "get",
      headers: myHeaders,
    });
    const response = await res.json();
    return response;
  }
);

export const fetchUserGists = createAsyncThunk(
    "user/fetchUserGists",
    async (_, { getState }) => {
      const res = await fetch(` https://api.github.com/users/${selectSelectedGist(getState())?.owner?.login}/gists`, {
        method: "get",
        headers: myHeaders,
      });
      const response = await res.json();
      return response;
    }
  );

export const fetchMyGists = createAsyncThunk(
    "user/fetchMyGists",
    async (_, { getState }) => {
        console.log('here')
      const res = await fetch(` https://api.github.com/users/${selectUsername(getState())}/gists`, {
        method: "get",
        headers: myHeaders,
      });
      const response = await res.json();
      return response;
    }
);

  
