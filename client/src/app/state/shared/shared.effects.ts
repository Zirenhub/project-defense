import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as sharedActions from './shared.actions';
import * as singleActions from '../single/single.actions';
import * as timelineActions from '../timeline/timeline.actions';
import * as profileActions from '../profile/profile.actions';
import * as replyActions from '../reply/reply.actions';
import { catchError, map, mergeMap, share, switchMap } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { getErrors } from '../getErrors';
import { Router } from '@angular/router';

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService,
    private router: Router
  ) {}

  private getActionsForPostTweet<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Timeline) {
      return {
        success: timelineActions.postTweetSuccess,
        failure: timelineActions.postTweetFailure,
      };
    }
    // modal also

    return {
      success: timelineActions.postTweetSuccess,
      failure: timelineActions.postTweetFailure,
    };
  }

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
        if ('error' in response) {
          const errorAction = this.getActionsForPostTweet(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForPostTweet(
            response.action.context
          ).success;
          return successAction({ tweet: response.res.data });
        }
      })
    )
  );

  private getActionsForRetweetTweet<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Timeline) {
      return {
        success: timelineActions.retweetTweetSuccess,
        failure: timelineActions.retweetTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.retweetTweetSuccess,
        failure: singleActions.retweetTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.retweetTweetSuccess,
        failure: replyActions.retweetTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Profile) {
      return {
        success: profileActions.retweetTweetSuccess,
        failure: profileActions.retweetTweetFailure,
      };
    }

    return {
      success: timelineActions.retweetTweetSuccess,
      failure: timelineActions.retweetTweetFailure,
    };
  }

  retweetTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.retweetTweet),
      switchMap((action) =>
        this.sharedService.retweetTweet(action.id, action.content).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForRetweetTweet(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForRetweetTweet(
            response.action.context
          ).success;
          return successAction({ tweet: response.res.data });
        }
      })
    )
  );

  private getActionsForRetweetReply<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.retweetReplySuccess,
        failure: singleActions.retweetTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.retweetReplySuccess,
        failure: replyActions.retweetReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Profile) {
      return {
        success: profileActions.retweetReplySuccess,
        failure: profileActions.retweetReplyFailure,
      };
    }

    return {
      success: profileActions.retweetReplySuccess,
      failure: profileActions.retweetReplyFailure,
    };
  }

  retweetReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.retweetReply),
      switchMap((action) =>
        this.sharedService.retweetReply(action.id, action.content).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForRetweetReply(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForRetweetReply(
            response.action.context
          ).success;
          return successAction({ tweet: response.res.data });
        }
      })
    )
  );

  getTimeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(timelineActions.getTimeline),
      // switchMap operator cancels the previous observable (if there is any) and switches to a new one
      switchMap(() =>
        this.sharedService.getTimeline().pipe(
          map((res) =>
            timelineActions.getTimelineSuccess({ timeline: res.data })
          ),
          catchError((error) =>
            of(
              timelineActions.getTimelineFailure({
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
      ofType(singleActions.singleGetTweet),
      mergeMap((action) =>
        this.sharedService.getTweet(action.id).pipe(
          map((res) => singleActions.getTweetSuccess(res.data)),
          catchError((error) =>
            of(
              singleActions.getTweetFailure({
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
      ofType(replyActions.getReply),
      mergeMap((action) =>
        this.sharedService.getReply(action.id).pipe(
          map((res) => replyActions.getReplySuccess(res.data)),
          catchError((error) =>
            of(
              replyActions.getReplyFailure({
                error: error.error.message || 'Unknown',
              })
            )
          )
        )
      )
    )
  );

  private getActionsForLikeTweet<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Timeline) {
      return {
        success: timelineActions.likeTweetSuccess,
        failure: timelineActions.likeTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.likeTweetSuccess,
        failure: singleActions.likeTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.likeTweetSuccess,
        failure: replyActions.likeTweetFailure,
      };
    }
    if (context === sharedActions.sharedContext.Profile) {
      return {
        success: profileActions.likeTweetSuccess,
        failure: profileActions.likeTweetFailure,
      };
    }

    return {
      success: profileActions.likeTweetSuccess,
      failure: profileActions.likeTweetFailure,
    };
  }

  likeTweet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.likeTweet),
      switchMap((action) =>
        this.sharedService.likeTweet(action.id).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForLikeTweet(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForLikeTweet(
            response.action.context
          ).success;
          return successAction({
            _id: response.res.data._id,
            likeOrDislike: response.res.data.likeOrDislike,
          });
        }
      })
    )
  );

  private getActionsForLikeReply<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.likeReplySuccess,
        failure: singleActions.likeReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.likeReplySuccess,
        failure: replyActions.likeReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Profile) {
      return {
        success: profileActions.likeTweetSuccess,
        failure: profileActions.likeTweetFailure,
      };
    }

    return {
      success: profileActions.likeTweetSuccess,
      failure: profileActions.likeTweetFailure,
    };
  }

  likeReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.likeReply),
      switchMap((action) =>
        this.sharedService.likeReply(action.id).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForLikeReply(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForLikeReply(
            response.action.context
          ).success;
          return successAction({
            _id: response.res.data._id,
            likeOrDislike: response.res.data.likeOrDislike,
          });
        }
      })
    )
  );

  private getActionsForPostReply<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Timeline) {
      return {
        success: timelineActions.postReplySuccess,
        failure: timelineActions.postReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.postReplySuccess,
        failure: singleActions.postReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.postReplySuccess,
        failure: replyActions.postReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Profile) {
      return {
        success: profileActions.postReplySuccess,
        failure: profileActions.postReplyFailure,
      };
    }

    return {
      success: replyActions.postReplySuccess,
      failure: replyActions.postReplyFailure,
    };
  }

  postReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.postReply),
      switchMap((action) =>
        this.sharedService.postReply(action.id, action.content).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForPostReply(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForPostReply(
            response.action.context
          ).success;
          return successAction({ reply: response.res.data });
        }
      })
    )
  );

  private getActionsForPostReplyToReply<T extends sharedActions.sharedContext>(
    context: T
  ) {
    if (context === sharedActions.sharedContext.Reply) {
      return {
        success: replyActions.postReplyToReplySuccess,
        failure: replyActions.postReplyToReplyFailure,
      };
    }
    if (context === sharedActions.sharedContext.Single) {
      return {
        success: singleActions.postReplyToReplySuccess,
        failure: singleActions.postReplyToReplyFailure,
      };
    }

    return {
      success: replyActions.postReplyToReplySuccess,
      failure: replyActions.postReplyToReplyFailure,
    };
  }

  postReplyToReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sharedActions.postReplyToReply),
      switchMap((action) =>
        this.sharedService.postReplyToReply(action.id, action.content).pipe(
          map((res) => ({ res, action })),
          catchError((error) => of({ error, action }))
        )
      ),
      map((response) => {
        if ('error' in response) {
          const errorAction = this.getActionsForPostReplyToReply(
            response.action.context
          ).failure;
          return errorAction({ error: response.error.error });
        } else {
          const successAction = this.getActionsForPostReplyToReply(
            response.action.context
          ).success;
          return successAction({ reply: response.res.data });
        }
      })
    )
  );
}
