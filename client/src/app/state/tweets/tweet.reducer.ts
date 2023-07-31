import { createReducer, on } from '@ngrx/store';
import {
  clearTweetError,
  closeReplyingToModal,
  getReplySuccess,
  getTimeline,
  getTimelineFailure,
  getTimelineSuccess,
  getTweet,
  getTweetSuccess,
  likeReplyFailure,
  likeReplySuccess,
  likeTweetFailure,
  likeTweetSuccess,
  openReplyModal,
  postReplyFailure,
  postReplySuccess,
  postReplyToReplySuccess,
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
  children: Reply[];
}

export interface ReplyingTo {
  _id: string;
  type: 'tweet' | 'reply';
  content: string;
  firstName: string;
  lastName: string;
  at: string;
  affected: string[];
}

export interface TweetState {
  content: Single | Timeline | IReply | null;
  replyingTo: ReplyingTo | null;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  tweetType: 'single' | 'timeline' | 'reply';
}

export const initialState: TweetState = {
  content: null,
  replyingTo: null,
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
        children: mapArr(content.children) as Reply[],
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
  on(openReplyModal, (state, { id, context }) => {
    let currentState = state.content;
    let replyingTo: any; // give type

    if (context === 'tweet') {
      if (state.tweetType === 'timeline') {
        currentState = currentState as Timeline;
        const tweet = currentState.tweets.find((x) => x._id === id);
        if (tweet) {
          replyingTo = {
            content: tweet.content,
            _id: tweet._id,
            type: 'tweet' as const,
            at: tweet.profile.at,
            firstName: tweet.profile.firstName,
            lastName: tweet.profile.lastName,
            affected: [tweet.profile.at],
          };
        }
      } else {
        currentState = currentState as IReply | Single;
        const tweet = currentState.tweet;
        replyingTo = {
          content: tweet.content,
          _id: tweet._id,
          type: 'tweet' as const,
          at: tweet.profile.at,
          firstName: tweet.profile.firstName,
          lastName: tweet.profile.lastName,
          affected: [tweet.profile.at],
        };
      }
    } else if (context === 'reply') {
      if (state.tweetType === 'single') {
        currentState = currentState as Single;
        const reply = currentState.replies.find((x) => x._id === id);
        if (reply) {
          replyingTo = {
            _id: reply._id,
            type: 'reply' as const,
            content: reply.content,
            at: reply.profile.at,
            firstName: reply.profile.firstName,
            lastName: reply.profile.lastName,
            affected: [currentState.tweet.profile.at, reply.profile.at],
          };
        }
      } else if (state.tweetType === 'reply') {
        currentState = currentState as IReply;
        const reply = currentState.parents
          .concat(currentState.reply)
          .find((x) => x._id === id);
        if (reply) {
          const affected = [currentState.tweet.profile.at, reply.profile.at];
          if (reply.parent) {
            affected.push('and more');
          }
          replyingTo = {
            content: reply.content,
            _id: reply._id,
            type: 'reply' as const,
            at: reply.profile.at,
            firstName: reply.profile.firstName,
            lastName: reply.profile.lastName,
            affected,
          };
        }
      }
    }

    if (replyingTo) {
      return {
        ...state,
        replyingTo,
        status: 'success' as const,
      };
    } else {
      return {
        ...state,
        status: 'error' as const,
        error:
          context === 'tweet' ? 'Failed to find tweet' : 'Failed to find reply',
      };
    }
  }),
  on(closeReplyingToModal, (state) => ({
    ...state,
    status: 'success' as const,
    replyingTo: null,
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
    if (state.tweetType === 'timeline') {
      content = content as Timeline;
      content = {
        ...content,
        tweets: content.tweets.map((x) =>
          x._id === reply.tweet._id
            ? { ...x, repliesCount: x.repliesCount + 1 }
            : { ...x }
        ),
      };
    }
    if (state.tweetType === 'reply') {
      content = content as IReply;
      content = { ...content, children: [...content.children, reply] };
    }
    if (state.tweetType === 'single') {
      content = content as Single;
      let replies: Reply[];
      if (reply.parent) {
        replies = content.replies.map((x) =>
          x._id === reply.parent
            ? { ...x, repliesCount: x.repliesCount + 1 }
            : { ...x }
        );
      } else {
        replies = [reply, ...content.replies];
      }
      content = { ...content, replies };
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
  on(getReplySuccess, (state, { tweet, reply, parents, children }) => {
    return {
      ...state,
      status: 'success' as const,
      tweetType: 'reply' as const,
      content: { tweet, reply, parents, children },
    };
  }),
  on(clearTweetError, (state) => ({
    ...state,
    errror: null,
    validationErrors: null,
    status: 'pending' as const,
  }))
);
