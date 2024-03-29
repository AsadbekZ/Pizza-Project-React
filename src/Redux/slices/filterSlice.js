import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: "популярности (ASC)",
    sortProperty: "rating",
  },
};


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId (state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
          state.searchValue = action.payload;
        }, 

        setSortType (state, action) {
            state.sortType = action.payload;
        },
        setCurrentPage (state, action) {
          state.currentPage = action.payload;
        },
        setFilters(state, action) { 
          state.currentPage = action.payload.currentPage;
          state.sort = action.payload.sort;
          state.categoryId  = action.payload.categoryId
        }
    }
});

export const {setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;