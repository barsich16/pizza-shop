import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	selectedCategory: 0,
	currentPage: 1,
	countPage: 1,
	itemsPerPage: 4,
	activeSort: {
		name: 'популярністю (DESC)',
		sortProperty: 'rating',
	},
};

export const filterSlice = createSlice({
	name: 'filter ',
	initialState,
	reducers: {
		setSelectedCategory(state, action) {
			state.selectedCategory = action.payload;
		},
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		setActiveSort(state, action) {
			state.activeSort = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setCountPage(state, action) {
			//action = pizzaCount
			state.countPage = Math.ceil(action.payload / state.itemsPerPage);
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage);
			state.selectedCategory = Number(action.payload.selectedCategory);
			state.activeSort = action.payload.activeSort;
		},
	},
});

export const {
	setSelectedCategory,
	setActiveSort,
	setCurrentPage,
	setCountPage,
	setSearchValue,
	setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
