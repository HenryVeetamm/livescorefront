import { Commentary } from 'app/services/game/types';
import { CategoryResult } from 'constants/assignScore';
import { generateComment } from 'utils/commentary';

const CommentaryRow = ({ comment } : { comment: Commentary }) => {
  const color = comment.categoryResult === CategoryResult.Good ? 'green' : comment.categoryResult === CategoryResult.Neutral ? 'yellow' : 'red';
  const textColor = color !== 'yellow' ? 'white' : '';
  const playerInfo = `#${comment.player.shirtNumber} ${comment.player.firstName} ${comment.player.lastName}`;
  return <div className='commentary-row' style={{ backgroundColor: color, color: textColor }}>
    <span style={{ fontWeight: 'bold' }}>{playerInfo} : </span>
    {generateComment(comment)}
  </div>;
};

export default CommentaryRow;