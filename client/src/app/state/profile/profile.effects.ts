import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as profileActions from './profile.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getErrors } from '../getErrors';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private router: Router
  ) {}

  // this.actions$ is an observable that emits the actions dispatched in the application

  profileTweets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.profileTweets),
      mergeMap((action) =>
        this.profileService.getProfileTweets(action.id).pipe(
          map((res) =>
            profileActions.profileTweetsSuccess({ tweets: res.data })
          ),
          catchError((error) =>
            of(
              profileActions.profileTweetsFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  profileLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.profileLikes),
      mergeMap((action) =>
        this.profileService.getProfileLikes(action.id).pipe(
          map((res) => profileActions.profileLikesSuccess({ likes: res.data })),
          tap((asd) => console.log(asd)),
          catchError((error) =>
            of(
              profileActions.profileLikesFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  profile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.profile),
      mergeMap((action) =>
        this.profileService.getProfile(action.id).pipe(
          map((res) => profileActions.profileSuccess({ profile: res.data })),
          catchError((error) =>
            of(
              profileActions.profileFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );
}
