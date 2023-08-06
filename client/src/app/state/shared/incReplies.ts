import { Reply } from 'src/app/types/Reply';
import { Tweet } from 'src/app/types/Tweet';

const incRepliesCount = (x: Tweet | Reply): Tweet | Reply => {
  return {
    ...x,
    repliesCount: x.repliesCount + 1,
  };
};

function mapIncRepliesCount(arr: (Tweet | Reply)[], parentId: string) {
  return arr.map((x) => (parentId === x._id ? incRepliesCount(x) : x));
}

export { mapIncRepliesCount, incRepliesCount };
