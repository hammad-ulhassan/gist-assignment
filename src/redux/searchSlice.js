import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import headers from '../credentials';
import { loadState } from "../localStorage";

const myHeaders = new Headers(headers)


const initialState = {
  searchResults: [],
  status: "idle"
};

export const searchSlice = createSlice({
  name: "search",
  initialState: loadState().searches || initialState,
  reducers: {
    registerSearch: (state, action) => {
      state.searchInput += action.payload;
    },
  },
  extraReducers(builder){
    builder
    .addCase(searchGists.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload;
    });
  }
});

export const { registerSearch } = searchSlice.actions;

export const selectSearchResults = (state) => state.searches.searchResults;

export default searchSlice.reducer;

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
