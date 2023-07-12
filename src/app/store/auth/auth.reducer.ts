import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/utilus/global.moduls';
import { loginSuccess, loginFailure, logout, getUserSuccess, getUserFailure } from './auth.actions';

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const token = localStorage.getItem('token');
const initialAuthState: AuthState = {
  token: token,
  isAuthenticated: Boolean(token),
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token }): any => {
    return {
      ...state,
      token,
      isAuthenticated: true,
      error: null
    }
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    token: null,
    user: null,
    error
  })),
  on(logout, state => ({
    ...state,
    token: null,
    user: null,
    error: null
  })),
  on(getUserSuccess, (state, { user }): any => {
    return {
      ...state,
      user,
      error: null
    }
  }),
  on(getUserFailure, (state, { error }): any => {
    return {
      ...state,
      token: null,
      user: null,
      error
    }
  }),
);

