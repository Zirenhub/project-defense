import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  // this.actions$ is an observable that emits the actions dispatched in the application

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(login),
  //     mergeMap((action) =>
  //       this.authService.login(action.email, action.password).pipe(
  //         map((user) => loginSuccess({ user })),
  //         catchError((error) => of(loginFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  // logout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(logout),
  //     mergeMap(() =>
  //       this.authService.logout().pipe(
  //         map(() => logoutSuccess()),
  //         catchError((error) => of(logoutFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap((action) =>
        this.authService.signup(action).pipe(
          map((user) => AuthActions.signupSuccess({ user })),
          catchError((error) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
