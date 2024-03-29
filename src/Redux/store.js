import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './slices/cartSlice';
import filter from './slices/filterSlice';
import pizzaSlice from './slices/pizzaSlice';


export const store = configureStore({
  reducer: {
    filter,
    cartSlice,
    pizzaSlice,
  },
})