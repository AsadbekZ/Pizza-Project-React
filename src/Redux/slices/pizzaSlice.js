import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const {sortBy, order, category, search, currentPage} = params;
    const { data } = await axios.get(
      `https://65428e35ad8044116ed39393.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    );
    return data;
  }
)


const initialState = {
  items: [],
  status: 'loading',
};



const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }
  },

  extraReducers: {
    [fetchPizzas.pending] : (state, action) => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizzas.fulfilled] : (state, action) => {
      state.items = action.payload
      state.status = 'success';
    },

    [fetchPizzas.rejected] : (state, action) => {
      state.status = 'error';
      state.items = [];
    }
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
