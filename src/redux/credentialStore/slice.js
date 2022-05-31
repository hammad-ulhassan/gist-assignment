import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../localStorage";
import { fetchAuthUserData } from "./thunk";

const initialState = {
  token: null,
  username: null,
  loggedIn: false,
  loginTime: null,
  status:"idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
  authUserData: null
};

export const loginSlice = createSlice({
  name: "login",
  initialState: loadState().logins || initialState,
  reducers: {
    logMeIn: {
      reducer(state, action) {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loggedIn = true;
        state.loginTime = action.payload.loginTime;
      },
      prepare(token, username) {
        return {
          payload: {
            token,
            username,
            loginTime: new Date().toJSON(),
          },
        };
      },
    },
    logMeOut: {
      reducer(state, action){
        state.token = null;
        state.username = null;
        state.loggedIn = false;
        state.state="idle";
        state.authUserData = null;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAuthUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUserData=action.payload;
      })
      .addCase(fetchAuthUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});


export default loginSlice.reducer;

