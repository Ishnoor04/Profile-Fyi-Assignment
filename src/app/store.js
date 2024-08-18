import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'

// Configure the Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    // Reducer for managing cart-related state
    allCart: cartReducer,
    // Reducer for managing authentication-related state
    auth: authReducer,
  },
});