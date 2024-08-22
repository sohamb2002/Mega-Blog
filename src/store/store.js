import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Ensure the path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure this is the correct reducer
  },
});

export default store; // Ensure this is the default export
