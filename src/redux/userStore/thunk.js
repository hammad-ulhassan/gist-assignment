import { createAsyncThunk } from "@reduxjs/toolkit";
import headers from '../../credentials';
import { selectUsername } from "../credentialStore/selectors";
import { selectSelectedGist } from "../gistsStore/selectors";

const myHeaders = new Headers(headers)


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