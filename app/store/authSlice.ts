import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  username: string;
  name: string;
  role: string;
  // role: 'admin';
  // role: 'admin' | 'employee';
};

interface AuthState {
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
