import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as TweetActions from './tweet.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TweetService } from './tweet.service';

@Injectable()
export class TweetEffects {
  constructor(private actions$: Actions, private tweetService: TweetService) {}

  getTimeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.getTimeline),
      // switchMap operator cancels the previous observable (if there is any) and switches to a new one
      switchMap(() =>
        this.tweetService.getTimeline().pipe(
          map((res) => TweetActions.getTimelineSuccess({ timeline: res.data })),
          catchError((error) =>
            of(
              TweetActions.getTimelineFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  getTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.getTweet),
      mergeMap((action) =>
        this.tweetService.getTweet(action.id).pipe(
          map((res) => TweetActions.getTweetSuccess(res.data)),
          catchError((error) =>
            of(
              TweetActions.getTweetFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );
}
