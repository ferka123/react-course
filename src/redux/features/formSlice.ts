import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonCard } from '../../types/form';

interface FormState {
  cards: PersonCard[];
}

const initialState: FormState = {
  cards: [],
};

export const formSlice = createSlice({
  initialState,
  name: 'searchSlice',
  reducers: {
    setCard: (state, action: PayloadAction<PersonCard>) => {
      state.cards.push(action.payload);
    },
  },
});

export default formSlice.reducer;

export const { setCard } = formSlice.actions;
