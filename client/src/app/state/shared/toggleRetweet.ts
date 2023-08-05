import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

const toggleRetweet = (x: Tweet | Reply): Tweet | Reply => {
  return {
    ...x,
    isRetweeted: true,
    retweetsCount: x.retweetsCount + 1,
  };
};

function mapToggleRetweet(arr: (Tweet | Reply)[], tweet: Tweet) {
  return arr.map((x) =>
    tweet.retweet.original?._id === x._id ? toggleRetweet(x) : x
  );
}

export { mapToggleRetweet, toggleRetweet };
