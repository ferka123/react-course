import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchQuery: string;
}

const initialState: SearchState = {
  searchQuery: '',
};

export const searchSlice = createSlice({
  initialState,
  name: 'searchSlice',
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export default searchSlice.reducer;

export const { setSearchQuery } = searchSlice.actions;
