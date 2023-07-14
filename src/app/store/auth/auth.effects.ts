import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { noop, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { loginSuccess, loginFailure, AuthActionTypes, GetUserActionTypes, getUserSuccess, getUserFailure, getUser, logoutSuccess, logoutFail } from './auth.actions';
import { ajax } from 'rxjs/ajax';
import { UserLogin, User } from 'src/app/utilus/global.moduls';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect((): any =>
    {
      return this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        mergeMap(({ login, password }): any => {
          return ajax({
            url: 'http://localhost:3004/auth/login',
            method: 'POST',
            body: { login, password },
            headers: {
              'Content-Type': 'application/json'
            }
            }).pipe(
              map(({ response }) => {
                const data = response as { token: string; user: UserLogin }
                const token = data.token;
                localStorage.setItem('token', token);
                return data;
              }),
            )}
        ),
        concatMap((data: any): any => {
          return of(
            loginSuccess(data),
            data.token ? getUser({ token: data.token }) : noop,
          );
        }),
        catchError((error) => of(loginFailure({ error: error.message })))
      )
    });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActionTypes.LoginSuccess),
      tap(() => {
        this.router.navigate(['/courses'])
      }),
    )
   }, { dispatch: false });

  logout$ = createEffect((): any =>
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
    ajax({
      url: 'http://localhost:3004/auth/userinfo',
          method: 'POST',
          body: { token },
          headers: {
            'Content-Type': 'application/json'
          }
    })),
    concatMap(({ response }: any) => {
      const data = response as {user: User};
      return of(getUserSuccess(data));
    }),
    catchError((error) => of(getUserFailure({ error: error.message })))
  )
  })

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}
}
