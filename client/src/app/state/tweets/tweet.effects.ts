import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as TweetActions from './tweet.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TweetService } from '../tweet.service';
import { getErrors } from '../getErrors';
import { Router } from '@angular/router';
import { profileLikeTweetSuccess } from '../profile/profile.actions';

@Injectable()
export class TweetEffects {
  constructor(
    private actions$: Actions,
    private tweetService: TweetService,
    private router: Router
  ) {}

  postTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.postTweet),
      mergeMap((action) =>
        this.tweetService.postTweet(action.content).pipe(
          map((res) => TweetActions.postTweetSuccess({ tweet: res.data })),
          catchError((error) =>
            of(TweetActions.postTweetFailure(getErrors(error)))
          )
        )
      )
    )
  );

  retweetTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.retweetTweet),
      mergeMap((action) =>
        this.tweetService.retweetTweet(action.id, action.content).pipe(
          map((res) => TweetActions.retweetTweetSuccess({ tweet: res.data })),
          catchError((error) =>
            of(TweetActions.retweetTweetFailure(getErrors(error)))
          )
        )
      )
    )
  );

  retweetReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TweetActions.retweetReply),
      mergeMap((action) =>
        this.tweetService.retweetReply(action.id, action.content).pipe(
          map((res) => TweetActions.retweetReplySuccess({ tweet: res.data })),
          catchError((error) =>
            of(TweetActions.retweetReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );

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
          map((res) =>
            action.isOnProfile
              ? profileLikeTweetSuccess(res.data)
              : TweetActions.likeTweetSuccess(res.data)
          ),
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
          map((res) =>
            TweetActions.postReplyToReplySuccess({ reply: res.data })
          ),
          catchError((error) =>
            of(TweetActions.postReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );
}
