import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./credentialSlice";

import gistReducer from "./gistSlice";
import userReducer from "./userSlice";

import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    gists: gistReducer,
    logins: loginReducer,
    users: userReducer,
    searches: searchReducer
  },
});
