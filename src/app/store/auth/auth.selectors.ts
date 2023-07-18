import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { User } from 'src/app/utilus/global.moduls';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState): User | null => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState): string | null => state.token
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState): boolean => state.isAuthenticated
);

