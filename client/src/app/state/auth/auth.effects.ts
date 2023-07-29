import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // this.actions$ is an observable that emits the actions dispatched in the application

  getErrors(error: any) {
    if (error.error.errors) {
      return { validationErrors: error.error.errors };
    }
    if (error.error.message) {
      return { error: error.error.message };
    }
    return { error: 'Unknown error' };
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((res) => AuthActions.loginSuccess({ user: res.data })),
          catchError((error) =>
            of(AuthActions.loginFailure(this.getErrors(error)))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/home');
        })
      ),
    { dispatch: false } // Set dispatch to false so it doesn't trigger any additional actions
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => {
        return this.authService.checkAuth().pipe(
          map((res) => AuthActions.loginSuccess({ user: res.data })),
          catchError((error) =>
            of(AuthActions.loginFailure(this.getErrors(error)))
          )
        );
      })
    )
  );

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
          map((res) => AuthActions.signupSuccess({ user: res.data })),
          catchError((error) =>
            of(AuthActions.signupFailure(this.getErrors(error)))
          )
        )
      )
    )
  );
}
