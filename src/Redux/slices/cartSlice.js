import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  count: 0,
};

const calculateTotalPrice = (items) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const calculateTotalCount = (items) => {
  return items.reduce((sum, obj) => obj.count + sum, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calculateTotalPrice(state.items)

      state.count = calculateTotalCount(state.items)
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if(findItem.count > 0) {
        findItem.count--;
      } 
      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      } 

      state.totalPrice = calculateTotalPrice(state.items)

      state.count = calculateTotalCount(state.items)
    },

    removeProduct(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      
      state.totalPrice = calculateTotalPrice(state.items)

      state.count = calculateTotalCount(state.items)
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.count = 0;
    },
  },
});

export const selectCart = (state) => state.cartSlice;
export const selectCartItemById = (id) => (state) => state.cartSlice.items.find((obj) => obj.id === id)


export const { addProduct, removeProduct, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
