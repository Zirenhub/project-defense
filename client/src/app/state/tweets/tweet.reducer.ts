import { createReducer, on } from '@ngrx/store';
import {
  clearTweetError,
  closeReplyingToModal,
  getTimeline,
  getTimelineFailure,
  getTimelineSuccess,
  getTweet,
  getTweetSuccess,
  likeReplyFailure,
  likeReplySuccess,
  likeTweetFailure,
  likeTweetSuccess,
  openReplyCommentModal,
  openReplyTweetModal,
  postReplyFailure,
  postReplySuccess,
  postTweetSuccess,
} from './tweet.actions';
import { Tweet } from 'src/app/types/Tweet';
import { Reply } from 'src/app/types/Reply';
import { ValidationErrors } from 'src/app/types/Api';

export interface Single {
  tweet: Tweet;
  replies: Reply[];
}

export interface Timeline {
  tweets: Tweet[];
}

export interface IReply {
  tweet: Tweet;
  parents: Reply[];
  reply: Reply;
  chilren: Reply[];
}

export interface TweetState {
  content: Single | Timeline | IReply | null;
  replyingToTweet: Tweet | null;
  replyingToReply: Reply | null;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  tweetType: 'single' | 'timeline' | 'reply';
}

export const initialState: TweetState = {
  content: null,
  replyingToTweet: null,
  replyingToReply: null,
  error: null,
  validationErrors: null,
  status: 'pending',
  tweetType: 'timeline',
};

const likeDislike = (
  state: TweetState,
  type: 'tweets' | 'replies',
  _id: string,
  change: 'like' | 'dislike'
) => {
  const mapArr = (arr: Tweet[] | Reply[]) => {
    return arr.map((x) =>
      x._id === _id
        ? {
            ...x,
            isLiked: change === 'like' ? true : false,
            likesCount: change === 'like' ? x.likesCount + 1 : x.likesCount - 1,
          }
        : x
    );
  };

  let content = state.content;
  if (state.tweetType === 'timeline') {
    content = content as Timeline;
    content = { ...content, tweets: mapArr(content.tweets) as Tweet[] };
  }
  if (state.tweetType === 'reply') {
    content = content as IReply;
    if (type === 'tweets') {
      content = { ...content, tweet: mapArr([content.tweet])[0] as Tweet };
    }
    if (type === 'replies') {
      content = {
        ...content,
        parents: mapArr(content.parents) as Reply[],
        reply: mapArr([content.reply])[0] as Reply,
        chilren: mapArr(content.chilren) as Reply[],
      };
    }
  }
  if (state.tweetType === 'single') {
    content = content as Single;
    if (type === 'tweets') {
      content = { ...content, tweet: mapArr([content.tweet])[0] as Tweet };
    }
    if (type === 'replies') {
      content = { ...content, replies: mapArr(content.replies) as Reply[] };
    }
  }
  const newState: TweetState = {
    ...state,
    content,
    status: 'success',
  };
  return newState;
};

const loadingState = (state: TweetState) => {
  return {
    ...state,
    content: null,
    validationErrors: null,
    error: null,
    status: 'loading' as const,
  };
};

export const tweetReducer = createReducer(
  initialState,
  // on(postTweetSuccess, (state, { tweet }) => ({
  //   ...state,
  //   tweets: [tweet, ...state.tweets],
  // })),
  on(getTimeline, (state) => loadingState(state)),
  on(getTweet, (state) => loadingState(state)),
  on(openReplyCommentModal, (state, { id }) => {
    let currentState = state.content;
    if (state.tweetType === 'single') {
      currentState = currentState as Single;
      const reply = currentState.replies.find((x) => x._id === id);
      if (reply) {
        return {
          ...state,
          replyingToReply: reply,
          replyingToTweet: null,
          status: 'success' as const,
        };
      }
    }
    if (state.tweetType === 'reply') {
      currentState = currentState as IReply;
      const reply = currentState.parents
        .concat(currentState.reply)
        .find((x) => x._id === id);
      if (reply) {
        return {
          ...state,
          replyingToReply: reply,
          replyingToTweet: null,
          status: 'success' as const,
        };
      }
    }
    return {
      ...state,
      status: 'error' as const,
      error: 'Failed to find reply',
    };
  }),
  on(openReplyTweetModal, (state, { id }) => {
    let currentState = state.content;
    if (state.tweetType === 'timeline') {
      currentState = currentState as Timeline;
      const tweet = currentState.tweets.find((x) => x._id === id);
      if (tweet) {
        return {
          ...state,
          replyingToTweet: tweet,
          replyingToReply: null,
          status: 'success' as const,
        };
      }
    }
    if (state.tweetType === 'reply' || state.tweetType === 'single') {
      currentState = currentState as IReply | Single;
      const tweet = currentState.tweet;
      return {
        ...state,
        replyingToTweet: tweet,
        replyingToReply: null,
        status: 'success' as const,
      };
    }
    return {
      ...state,
      status: 'error' as const,
      error: 'Failed to find tweet',
    };
  }),
  on(closeReplyingToModal, (state) => ({
    ...state,
    status: 'success' as const,
    replyingToReply: null,
    replyingToTweet: null,
  })),
  on(getTimelineSuccess, (state, { timeline }) => ({
    ...state,
    content: { tweets: timeline },
    status: 'success' as const,
    tweetType: 'timeline' as const,
  })),
  on(getTimelineFailure, (state, { error }) => ({
    ...state,
    content: null,
    errror: error,
    status: 'error' as const,
  })),
  on(getTweetSuccess, (state, { tweet, replies }) => ({
    ...state,
    content: { tweet, replies },
    status: 'success' as const,
    tweetType: 'single' as const,
  })),
  on(likeTweetSuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'tweets', _id, likeOrDislike);
  }),
  on(likeReplySuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'replies', _id, likeOrDislike);
  }),
  on(likeTweetFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(likeReplyFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(postReplySuccess, (state, { reply }) => {
    let content = state.content;
    if (state.tweetType === 'reply') {
      content = content as IReply;
      content.chilren = [...content.chilren, reply];
    }
    if (state.tweetType === 'single') {
      content = content as Single;
      content.replies = [reply, ...content.replies];
    }
    return {
      ...state,
      content,
      status: 'success' as const,
    };
  }),
  on(postReplyFailure, (state, { error, validationErrors }) => {
    if (validationErrors && validationErrors.length > 0) {
      return {
        ...state,
        errror: null,
        validationErrors,
        status: 'error' as const,
      };
    } else if (error) {
      return {
        ...state,
        error,
        validationErrors: null,
        status: 'error' as const,
      };
    }
    return { ...state };
  }),
  on(clearTweetError, (state) => ({
    ...state,
    errror: null,
    validationErrors: null,
    status: 'pending' as const,
  }))
);
