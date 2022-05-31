import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import headers from "../../credentials";
const myHeaders = new Headers(headers);


export const searchGists = createAsyncThunk(
    "search/searchGists",
    async (username, { getState }) => {
      const res = await fetch(`https://api.github.com/users/${username}/gists`, {
        method: "get",
        headers: myHeaders,
      });
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