import TweetModel from '../models/tweet';

export const fillTweet = async (id: string) => {
  const tweet = await TweetModel.findById(id)
    .populate('profile')
    .populate({
      path: 'retweet.original',
      populate: {
        path: 'profile',
      },
    });
  if (!tweet) {
    throw new Error('Tweet not found');
  }

  return tweet;
};
