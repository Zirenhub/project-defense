import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as TweetActions from './tweet.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { TweetService } from './tweet.service';
import { getErrors } from '../getErrors';
import { Router } from '@angular/router';

@Injectable()
export class TweetEffects {
  constructor(
    private actions$: Actions,
    private tweetService: TweetService,
    private router: Router
  ) {}

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

  getReply$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TweetActions.getReply),
    mergeMap((action) =>
      this.tweetService.getReply(action.id).pipe(
        map((res) => TweetActions.getReplySuccess(res.data)),
        catchError((error) =>
          of(
            TweetActions.getReplyFailure({
              error: error.error.message || 'Unknown',
            })
          )
        )
      )
    )
  )
);

  likeTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.likeTweet),
      mergeMap((action) =>
        this.tweetService.likeTweet(action.id).pipe(
          map((res) => TweetActions.likeTweetSuccess(res.data)),
          catchError((error) =>
            of(
              TweetActions.likeTweetFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  likeReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.likeReply),
      mergeMap((action) =>
        this.tweetService.likeReply(action.id).pipe(
          map((res) => TweetActions.likeReplySuccess(res.data)),
          catchError((error) =>
            of(
              TweetActions.likeReplyFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  postReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.postReply),
      mergeMap((action) =>
        this.tweetService.postReply(action.id, action.content).pipe(
          map((res) => TweetActions.postReplySuccess({ reply: res.data })),
          catchError((error) =>
            of(TweetActions.postReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );

  postReplyToReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.postReplyToReply),
      mergeMap((action) =>
        this.tweetService.postReplyToReply(action.id, action.content).pipe(
          map((res) => TweetActions.postReplySuccess({ reply: res.data })),
          catchError((error) =>
            of(TweetActions.postReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );

  // postReplyToReplySuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(TweetActions.postReplyToReplySuccess),
  //       tap(({ reply }) => {
  //         this.router.navigateByUrl('/home');
  //       })
  //     ),
  //   { dispatch: false } // Set dispatch to false so it doesn't trigger any additional actions
  // );
}
