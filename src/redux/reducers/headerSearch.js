import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  recipes: [],
  location: '',
};

const headerSearchSlice = createSlice({
  name: 'headerSearch',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRecipe: (state, action) => {
      state.recipes = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setSearch, setRecipe, setLocation } = headerSearchSlice.actions;

export default headerSearchSlice.reducer;
