import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Filter } from '../typings';

export interface FilterState {
	query: string;
	activeFilter: Filter | null;
}

const initialState: FilterState = {
	query: '',
	activeFilter: null,
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;
		},
		setFilter: (state, action: PayloadAction<Filter | null>) => {
			state.activeFilter = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setQuery, setFilter } = filterSlice.actions;

export const querySelector = (state: RootState) => state.filter.query;
export const filterSelector = (state: RootState) => state.filter.activeFilter;

export default filterSlice.reducer;
