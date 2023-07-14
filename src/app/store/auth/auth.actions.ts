import { createAction, props } from '@ngrx/store';
import { User, UserLogin } from 'src/app/utilus/global.moduls';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFail = '[Auth] Logout Fail'
}

export enum GetUserActionTypes {
  GetUser = '[Auth] GetUser',
  GetUserSuccess = '[Auth] Get User Success',
  GetUserFail = '[Auth] Get User Fail'
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ login: string, password: string }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ token: string, user: UserLogin }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFail,
  props<{ error: string }>()
);

export const getUser = createAction(
  GetUserActionTypes.GetUser,
  props<{ token: string }>()
);

export const getUserSuccess = createAction(
  GetUserActionTypes.GetUserSuccess,
  props<{ user: User }>()
);

export const getUserFailure = createAction(
  GetUserActionTypes.GetUserFail,
  props<{ error: string }>()
);

export const logout = createAction(
  AuthActionTypes.Logout
);

export const logoutSuccess = createAction(
  AuthActionTypes.LogoutSuccess
);

export const logoutFail = createAction(
  AuthActionTypes.LogoutFail,
  props<{ error: string }>()
);

export const setToken = createAction('[Auth] Set Token', props<{ token: string | null }>());
