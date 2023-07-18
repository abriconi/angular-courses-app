import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { noop, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { loginSuccess, loginFailure, AuthActionTypes, GetUserActionTypes, getUserSuccess, getUserFailure, getUser, logoutSuccess, logoutFail } from './auth.actions';
import { UserLogin, User } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect((): any =>
    {
      return this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        mergeMap(({ login, password }) =>
          this.http.post<{ token: string; user: UserLogin }>(
            'http://localhost:3004/auth/login',
            { login, password })
          ),
        map((data) => {
          const token = data.token;
          localStorage.setItem('token', token);
          return data;
        }),
        concatMap((data) =>
          of(
            data.token ? getUser({ token: data.token }) : noop,
            loginSuccess(data),
          )
        ),
        catchError((error) => of(loginFailure({ error: error.message })))
      )
    }
  );

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LoginSuccess),
      tap(() => {
        this.router.navigate(['/courses'])
      }),
    )
   }, { dispatch: false });

  logout$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(AuthActionTypes.Logout),
      mergeMap(() => {
        localStorage.removeItem('token');
        return of(
          logoutSuccess(),
        );
      }),
      catchError((error) => of(logoutFail({ error: error.message })))
    ) }
  );

  logoutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LogoutSuccess),
      tap(() => {
        this.router.navigate(['/login'])
      }),
    )
   }, { dispatch: false });

   getUser$ = createEffect(() =>
   { return this.actions$.pipe(
     ofType(GetUserActionTypes.GetUser),
     mergeMap(({ token }) =>
       this.http.post<{ user: User }>(
         'http://localhost:3004/auth/userinfo',
         { token })
     ),
     map((user) => getUserSuccess(user)),
     catchError((error) => of(getUserFailure({ error: error.message })))
   ) }
 );

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient,
  ) {}
}
