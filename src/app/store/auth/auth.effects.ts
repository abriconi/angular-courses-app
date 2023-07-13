import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { noop, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { loginSuccess, loginFailure, AuthActionTypes, GetUserActionTypes, getUserSuccess, getUserFailure, getUser, logoutSuccess } from './auth.actions';
import { ajax } from 'rxjs/ajax';
import { UserLogin, User } from 'src/app/utilus/global.moduls';
import {  Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  login$ = createEffect((): any =>
    { return this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      mergeMap(({ login, password }) =>
        ajax({
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
        )
      ),
      concatMap((data: any): any => {
        return of(
          loginSuccess(data),
          data.token ? getUser({ token: data.token }) : noop,
          this.router.navigate(['/courses']),
        );
      }),
      catchError((error) => of(loginFailure({ error: error.message })))
    )
    });

  logout$ = createEffect((): any =>
    { return this.actions$.pipe(
      ofType(AuthActionTypes.Logout),
      mergeMap(() => {
        localStorage.removeItem('token');
        return of(
          logoutSuccess(),
          this.router.navigate(['/login']),);
      })
    ) }
  );

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
    private store: Store,
    private router: Router,
  ) {}
}
