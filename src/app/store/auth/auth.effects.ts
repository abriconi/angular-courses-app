import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { loginSuccess, loginFailure, logout, AuthActionTypes, GetUserActionTypes, getUserSuccess, getUserFailure, getUser, setToken } from './auth.actions';
import { ajax } from 'rxjs/ajax';
import { UserLogin, User } from 'src/app/utilus/global.moduls';
import { select, Store } from '@ngrx/store';
import { selectToken } from './auth.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    { console.log('login$ method from authEffects was called');

      return this.actions$.pipe(
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

            localStorage.setItem('token', data.token);
            return loginSuccess(data);
          }),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      ),
      withLatestFrom(this.store.pipe(select(selectToken))),
      concatMap(([action, token]) => {
        if (token) {
          return of(getUser({ token }));
        }
        return of(getUserFailure({ error: 'Token is null' }));
      })
    )
    });

  logout$ = createEffect(() =>
    { return this.actions$.pipe(
      ofType(logout),
      mergeMap(() => {
        localStorage.removeItem('token');
        return of(logout());
      }),
      concatMap(() => {
        return of(setToken({ token: null }));
      }),
      catchError((error) => of(loginFailure({ error: error.message })))
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
    }).pipe(
      map(({ response }) => {
        const data = response as {user: User};
        return getUserSuccess(data)
      }),
      catchError((error) => of(getUserFailure({ error: error.message })))
    ))
  )
  })

  constructor(
    private actions$: Actions,
    private store: Store,
  ) {}
}
