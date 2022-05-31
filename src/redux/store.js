import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./credentialSlice";

import gistReducer from "./gistSlice";
import userReducer from "./userSlice";

import searchReducer from "./searchSlice";
import { saveState } from "../localStorage";


export const store = configureStore({
  reducer: {
    gists: gistReducer,
    logins: loginReducer,
    users: userReducer,
    searches: searchReducer,
  },


});


store.subscribe(()=>{
  saveState(store.getState());
})