import { createReducer, on } from '@ngrx/store';
import * as tweetActions from './tweet.actions';
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
  postModal: boolean;
  retweetTo: ReplyingTo | null;
  error: string | null;
  validationErrors: ValidationErrors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  tweetType: 'single' | 'timeline' | 'reply';
}

export const initialState: TweetState = {
  content: null,
  // replyingTo is used for modal only
  replyingTo: null,
  postModal: false,
  retweetTo: null,
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

function findTweetOrReplyById(
  currentState: TweetState,
  id: string,
  context: 'tweet' | 'reply'
): ReplyingTo | null {
  let content = currentState.content;
  let tweetOrReply;

  if (context === 'tweet') {
    if (currentState.tweetType === 'timeline') {
      content = content as Timeline;
      tweetOrReply = content.tweets.find((x) => x._id === id);
    } else {
      content = content as IReply | Single;
      tweetOrReply = content.tweet;
    }
  } else if (context === 'reply') {
    if (currentState.tweetType === 'single') {
      content = content as Single;
      tweetOrReply = content.replies.find((x) => x._id === id);
    } else if (currentState.tweetType === 'reply') {
      content = content as IReply;
      tweetOrReply = content.parents
        .concat(content.reply)
        .concat(content.children)
        .find((x) => x._id === id);
    }
  }

  if (tweetOrReply) {
    const type = context === 'tweet' ? 'tweet' : 'reply';
    const affected = [tweetOrReply.profile.at];
    if ('parent' in tweetOrReply && tweetOrReply.parent) {
      affected.push('and more');
    }

    return {
      _id: tweetOrReply._id,
      type,
      content: tweetOrReply.content,
      at: tweetOrReply.profile.at,
      firstName: tweetOrReply.profile.firstName,
      lastName: tweetOrReply.profile.lastName,
      affected,
    };
  }

  return null;
}

const loadingState = (state: TweetState) => {
  return {
    ...state,
    content: null,
    validationErrors: null,
    error: null,
    status: 'loading' as const,
  };
};

const assignErrors = (
  state: TweetState,
  validationErrors: ValidationErrors | undefined,
  error: string | undefined
) => {
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
};

const pushTweetToTimeline = (tweet: Tweet, state: TweetState) => {
  const updateTweet = (x: Tweet | Reply): Tweet | Reply => {
    if (tweet.retweet.original?._id === x._id) {
      return {
        ...x,
        isRetweeted: true,
        retweetsCount: x.retweetsCount + 1,
      };
    }
    return x;
  };

  const searchForRetweetParent = (
    arr: (Tweet | Reply)[]
  ): (Tweet | Reply)[] => {
    return arr.map(updateTweet);
  };

  let content = state.content;

  if (state.tweetType === 'timeline') {
    content = content as Timeline;
    content = {
      ...content,
      tweets: searchForRetweetParent([tweet, ...content.tweets]) as Tweet[],
    };
  } else if (state.tweetType === 'single') {
    content = content as Single;
    content = {
      ...content,
      tweet: updateTweet(content.tweet) as Tweet,
      replies: searchForRetweetParent(content.replies) as Reply[],
    };
  } else if (state.tweetType === 'reply') {
    content = content as IReply;
    content = {
      ...content,
      tweet: updateTweet(content.tweet) as Tweet,
      parents: searchForRetweetParent(content.parents) as Reply[],
      reply: updateTweet(content.reply) as Reply,
      children: searchForRetweetParent(content.children) as Reply[],
    };
  }

  return { ...state, content };
};

export const tweetReducer = createReducer(
  initialState,

  on(tweetActions.getTimeline, (state) => loadingState(state)),
  on(tweetActions.getTweet, (state) => loadingState(state)),
  on(tweetActions.getReply, (state) => loadingState(state)),
  on(tweetActions.openReplyModal, (state, { id, context }) => {
    let replyingTo = findTweetOrReplyById(state, id, context);
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
          context === 'tweet'
            ? 'Failed to find tweet'
            : ('Failed to find reply' as const),
      };
    }
  }),
  on(tweetActions.closeReplyingToModal, (state) => ({
    ...state,
    status: 'success' as const,
    replyingTo: null,
  })),
  on(tweetActions.openRetweetModal, (state, { id, context }) => {
    let retweetTo = findTweetOrReplyById(state, id, context);
    if (retweetTo) {
      return {
        ...state,
        retweetTo,
        status: 'success' as const,
      };
    } else {
      return {
        ...state,
        status: 'error' as const,
        error:
          context === 'tweet'
            ? 'Failed to find tweet'
            : ('Failed to find reply' as const),
      };
    }
  }),
  on(tweetActions.closeRetweetModal, (state) => ({
    ...state,
    status: 'success' as const,
    retweetTo: null,
  })),
  on(tweetActions.getTimelineSuccess, (state, { timeline }) => ({
    ...state,
    content: { tweets: timeline },
    status: 'success' as const,
    tweetType: 'timeline' as const,
  })),
  on(tweetActions.getTimelineFailure, (state, { error }) => ({
    ...state,
    content: null,
    errror: error,
    status: 'error' as const,
  })),
  on(tweetActions.getTweetSuccess, (state, { tweet, replies }) => ({
    ...state,
    content: { tweet, replies },
    status: 'success' as const,
    tweetType: 'single' as const,
  })),
  on(tweetActions.likeTweetSuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'tweets', _id, likeOrDislike);
  }),
  on(tweetActions.likeReplySuccess, (state, { _id, likeOrDislike }) => {
    return likeDislike(state, 'replies', _id, likeOrDislike);
  }),
  on(tweetActions.likeTweetFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(tweetActions.likeReplyFailure, (state, { error }) => ({
    ...state,
    errror: error,
    status: 'error' as const,
  })),
  on(tweetActions.postReplySuccess, (state, { reply }) => {
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
      if (reply.parent === content.tweet._id) {
        content = {
          ...content,
          tweet: {
            ...content.tweet,
            repliesCount: content.tweet.repliesCount + 1,
          },
        };
      }
      if (reply.parent === reply._id) {
        content = { ...content, children: [...content.children, reply] };
      }
      content = {
        ...content,
        parents: content.parents.map((x) =>
          x._id === reply.parent
            ? { ...x, repliesCount: x.repliesCount + 1 }
            : { ...x }
        ),
      };
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
  on(tweetActions.postReplyFailure, (state, { error, validationErrors }) => {
    return assignErrors(state, validationErrors, error);
  }),
  on(
    tweetActions.getReplySuccess,
    (state, { tweet, reply, parents, children }) => {
      return {
        ...state,
        status: 'success' as const,
        tweetType: 'reply' as const,
        content: { tweet, reply, parents, children },
      };
    }
  ),
  on(tweetActions.postReplyToReplySuccess, (state, { reply }) => {
    let content = state.content;
    if (state.tweetType === 'reply') {
      content = content as IReply;
      content = {
        ...content,
        reply: {
          ...content.reply,
          repliesCount: content.reply.repliesCount + 1,
        },
        children: [reply, ...content.children],
      };
    }
    if (state.tweetType === 'single') {
      content = content as Single;
      content = {
        ...content,
        replies: content.replies.map((x) =>
          x._id === reply.parent
            ? { ...x, repliesCount: x.repliesCount + 1 }
            : { ...x }
        ),
      };
    }

    return { ...state, content };
  }),
  on(tweetActions.postTweetSuccess, (state, { tweet }) => {
    return pushTweetToTimeline(tweet, state);
  }),
  on(tweetActions.postTweetFailure, (state, { error, validationErrors }) => {
    return assignErrors(state, validationErrors, error);
  }),
  on(tweetActions.retweetTweetSuccess, (state, { tweet }) => {
    return pushTweetToTimeline(tweet, state);
  }),
  on(tweetActions.retweetTweetFailure, (state, { error, validationErrors }) => {
    return assignErrors(state, validationErrors, error);
  }),
  on(tweetActions.retweetReplySuccess, (state, { tweet }) => {
    return pushTweetToTimeline(tweet, state);
  }),
  on(tweetActions.openTweetModal, (state) => ({
    ...state,
    postModal: true,
  })),
  on(tweetActions.closeTweetModal, (state) => ({
    ...state,
    postModal: false,
  })),
  on(tweetActions.clearTweetError, (state) => ({
    ...state,
    errror: null,
    validationErrors: null,
    status: 'pending' as const,
  }))
);
