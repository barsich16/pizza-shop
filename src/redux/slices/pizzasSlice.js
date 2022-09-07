import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzaStatus',
	async (params, thunkAPI) => {
		const { itemsPerPage, currentPage } = thunkAPI.getState().filter;
		const { category, sortBy, order, search } = params;
		const { data } = await axios.get(
			`https://62efd05a8d7bc7c2eb808100.mockapi.io/items?page=${currentPage}&limit=${itemsPerPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
		);

		return data;
	},
);

const initialState = {
	items: [],
	status: '',
};

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload.items;
			state.status = 'success';
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
