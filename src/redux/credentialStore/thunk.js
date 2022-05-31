import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectToken } from "./selectors";

export const fetchAuthUserData = createAsyncThunk(
    "login/fetchAuthUserData",
    async (_, {getState}) => {
      const res = await fetch("https://api.github.com/user", 
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${selectToken(getState())}`,
          Accept: "application/json",
        },
      });
      const response = await res.json();
      return response;
    }
  );