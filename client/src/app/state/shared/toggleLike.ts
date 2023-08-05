import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

const toggleLike = (x: Tweet | Reply, toggle: 'like' | 'dislike') => {
  return {
    ...x,
    isLiked: toggle === 'like' ? true : false,
    likesCount: toggle === 'like' ? x.likesCount + 1 : x.likesCount - 1,
  };
};

function mapToggleLike(
  _id: string,
  toggle: 'like' | 'dislike',
  arr: (Tweet | Reply)[]
) {
  return arr.map((x) => (x._id === _id ? toggleLike(x, toggle) : x));
}

export { toggleLike, mapToggleLike };
