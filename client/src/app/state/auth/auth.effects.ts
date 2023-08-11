import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { getErrors } from '../getErrors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // this.actions$ is an observable that emits the actions dispatched in the application

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action).pipe(
          map((res) => AuthActions.loginSuccess({ user: res.data })),
          catchError((error) => of(AuthActions.loginFailure(getErrors(error))))
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

  // checkAuthFailure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.checkAuthFailure),
  //       tap(() => {
  //         this.router.navigateByUrl('/auth');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => {
        return this.authService.checkAuth().pipe(
          map((res) => AuthActions.checkAuthSuccess({ user: res.data })),
          catchError((error) => of(AuthActions.checkAuthFailure()))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) =>
            of(AuthActions.logoutFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // logoutSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.logoutSuccess),
  //     tap(() => {
  //       this.router.navigate(['/auth']);
  //     })
  //   )
  // );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap((action) =>
        this.authService.signup(action).pipe(
          map((res) =>
            AuthActions.signupSuccess({
              user: {
                ...res.data,
                email: action.email,
                password: action.password,
              },
            })
          ),
          catchError((error) => of(AuthActions.signupFailure(getErrors(error))))
        )
      )
    )
  );

  loginAfterSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupSuccess),
      switchMap((action) => {
        const user = action.user;
        return of(
          AuthActions.login({ email: user.email, password: user.password })
        );
      })
    )
  );
}
