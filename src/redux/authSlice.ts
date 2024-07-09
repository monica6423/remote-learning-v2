import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
