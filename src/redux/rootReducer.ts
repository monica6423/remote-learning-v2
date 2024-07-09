import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  // add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
