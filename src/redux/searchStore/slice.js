import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../localStorage";
import { searchGists } from "./thunk";

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

export default searchSlice.reducer;
