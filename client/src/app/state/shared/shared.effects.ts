import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as sharedActions from './shared.actions';
import * as singleActions from '../single/single.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { getErrors } from '../getErrors';
import { Router } from '@angular/router';
import { profileLikeTweetSuccess } from '../profile/profile.actions';

function getActionsForPostTweet<T extends sharedActions.sharedContext>(
  context: T
) {
  switch (context) {
    case sharedActions.sharedContext.Single:
      return {
        success: singleActions.postTweetSuccess,
        failure: singleActions.postTweetFailure,
      };
    default:
      return {
        success: singleActions.postTweetSuccess,
        failure: singleActions.postTweetFailure,
      };
  }
}

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private router: Router
  ) {}

  postTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.postTweet),
      switchMap((action) =>
        this.sharedService.postTweet(action.content).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        const { action } = response;
        const actionsForContext = getActionsForPostTweet(action.context);
        if ('res' in response) {
          const { res } = response;
          const successAction = actionsForContext.success;
          return successAction({ tweet: res.data });
        }
        const { error } = response;
        const errorAction = actionsForContext.failure;
        return errorAction(getErrors(error.error || 'Unknown'));
      })
    )
  );

  retweetTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.retweetTweet),
      mergeMap((action) =>
        this.sharedService.retweetTweet(action.id, action.content).pipe(
          map((res) => sharedActions.retweetTweetSuccess({ tweet: res.data })),
          catchError((error) =>
            of(sharedActions.retweetTweetFailure(getErrors(error)))
          )
        )
      )
    )
  );

  retweetReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.retweetReply),
      mergeMap((action) =>
        this.sharedService.retweetReply(action.id, action.content).pipe(
          map((res) => sharedActions.retweetReplySuccess({ tweet: res.data })),
          catchError((error) =>
            of(sharedActions.retweetReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );

  getTimeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.getTimeline),
      // switchMap operator cancels the previous observable (if there is any) and switches to a new one
      switchMap(() =>
        this.sharedService.getTimeline().pipe(
          map((res) =>
            sharedActions.getTimelineSuccess({ timeline: res.data })
          ),
          catchError((error) =>
            of(
              sharedActions.getTimelineFailure({
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
      ofType(sharedActions.getTweet),
      mergeMap((action) =>
        this.sharedService.getTweet(action.id).pipe(
          map((res) => sharedActions.getTweetSuccess(res.data)),
          catchError((error) =>
            of(
              sharedActions.getTweetFailure({
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
      ofType(sharedActions.getReply),
      mergeMap((action) =>
        this.sharedService.getReply(action.id).pipe(
          map((res) => sharedActions.getReplySuccess(res.data)),
          catchError((error) =>
            of(
              sharedActions.getReplyFailure({
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
      ofType(sharedActions.likeTweet),
      mergeMap((action) =>
        this.sharedService.likeTweet(action.id).pipe(
          map((res) =>
            action.isOnProfile
              ? profileLikeTweetSuccess(res.data)
              : sharedActions.likeTweetSuccess(res.data)
          ),
          catchError((error) =>
            of(
              sharedActions.likeTweetFailure({
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
      ofType(sharedActions.likeReply),
      mergeMap((action) =>
        this.sharedService.likeReply(action.id).pipe(
          map((res) => sharedActions.likeReplySuccess(res.data)),
          catchError((error) =>
            of(
              sharedActions.likeReplyFailure({
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
      ofType(sharedActions.postReply),
      mergeMap((action) =>
        this.sharedService.postReply(action.id, action.content).pipe(
          map((res) => sharedActions.postReplySuccess({ reply: res.data })),
          catchError((error) =>
            of(sharedActions.postReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );

  postReplyToReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.postReplyToReply),
      mergeMap((action) =>
        this.sharedService.postReplyToReply(action.id, action.content).pipe(
          map((res) =>
            sharedActions.postReplyToReplySuccess({ reply: res.data })
          ),
          catchError((error) =>
            of(sharedActions.postReplyFailure(getErrors(error)))
          )
        )
      )
    )
  );
}
