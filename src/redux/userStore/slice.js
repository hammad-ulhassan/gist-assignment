import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../localStorage";
import { fetchMyGists, fetchUserData, fetchUserGists } from "./thunk";



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




  
