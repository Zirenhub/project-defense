import { ValidationErrors } from '@angular/forms';
import { createReducer, on } from '@ngrx/store';
import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';
import * as replyActions from './reply.actions';
import { mapToggleLike, toggleLike } from '../shared/toggleLike';
import { mapToggleRetweet, toggleRetweet } from '../shared/toggleRetweet';
import { incRepliesCount, mapIncRepliesCount } from '../shared/toggleReply';

export interface IReply {
  tweet: Tweet | null;
  parents: Reply[] | null;
  reply: Reply | null;
  children: Reply[] | null;
}

export interface ReplyState {
  content: IReply;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ReplyState = {
  content: { tweet: null, parents: null, reply: null, children: null },
  error: null,
  validationErrors: null,
  status: 'pending',
};

export const replyReducer = createReducer(
  initialState,
  on(replyActions.getReply, (state) => ({
    ...state,
    content: {
      tweet: null,
      parents: null,
      reply: null,
      children: null,
    },
    error: null,
    validationErrors: null,
    status: 'loading' as const,
  })),
  on(
    replyActions.getReplySuccess,
    (state, { tweet, parents, reply, children }) => ({
      ...state,
      content: {
        tweet,
        parents,
        reply,
        children,
      },
    })
  ),
  on(replyActions.getReplyFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(replyActions.likeTweetSuccess, (state, { _id, likeOrDislike }) => {
    if (state.content.tweet?._id === _id) {
      const modifiedTweet = toggleLike(
        state.content.tweet,
        likeOrDislike
      ) as Tweet;
      return { ...state, content: { ...state.content, tweet: modifiedTweet } };
    }
    return { ...state };
  }),
  on(replyActions.likeTweetFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(replyActions.likeReplySuccess, (state, { _id, likeOrDislike }) => ({
    ...state,
    content: {
      ...state.content,
      parents: state.content.parents?.length
        ? (mapToggleLike(_id, likeOrDislike, state.content.parents) as Reply[])
        : null,
      reply:
        state.content.reply?._id === _id
          ? (toggleLike(state.content.reply, likeOrDislike) as Reply)
          : state.content.reply,
      children: state.content.children?.length
        ? (mapToggleLike(_id, likeOrDislike, state.content.children) as Reply[])
        : null,
    },
  })),
  on(replyActions.likeReplyFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const,
  })),
  on(replyActions.retweetTweetSuccess, (state, { tweet }) => {
    if (
      state.content.tweet &&
      state.content.tweet._id === tweet.retweet.original?._id
    ) {
      const modifiedTweet = toggleRetweet(state.content.tweet) as Tweet;
      return { ...state, content: { ...state.content, tweet: modifiedTweet } };
    }
    return { ...state };
  }),
  on(
    replyActions.retweetTweetFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  ),
  on(replyActions.retweetReplySuccess, (state, { tweet }) => ({
    ...state,
    content: {
      ...state.content,
      parents: state.content.parents?.length
        ? (mapToggleRetweet(state.content.parents, tweet) as Reply[])
        : null,
      reply:
        state.content.reply &&
        state.content.reply._id === tweet.retweet.original?._id
          ? (toggleRetweet(state.content.reply) as Reply)
          : state.content.reply,
      children: state.content.children?.length
        ? (mapToggleRetweet(state.content.children, tweet) as Reply[])
        : null,
    },
  })),
  on(replyActions.postReplyToReplySuccess, (state, { reply }) => {
    if (reply.parent === state.content.reply?._id) {
      return {
        ...state,
        content: {
          ...state.content,
          reply: incRepliesCount(state.content.reply) as Reply,
          children: state.content.children
            ? [reply, ...state.content.children]
            : state.content.children,
        },
      };
    }
    return {
      ...state,
      content: {
        ...state.content,
        parents: state.content.parents
          ? (mapIncRepliesCount(state.content.parents, reply.parent) as Reply[])
          : state.content.parents,
        children: state.content.children
          ? (mapIncRepliesCount(
              state.content.children,
              reply.parent
            ) as Reply[])
          : state.content.children,
      },
    };
  }),
  on(
    replyActions.postReplyToReplyFailure,
    (state, { error, validationErrors }) => ({
      ...state,
      error: error ? error : null,
      validationErrors: validationErrors ? validationErrors : null,
      status: 'error' as const,
    })
  )
);
