import { selectors } from 'app/services/game/slice';
import { useSelector } from 'react-redux';
import CommentaryRow from './CommentaryRow';
import './styles.less';

const Commentary = () => {
  const data = useSelector(selectors.getCommentary);

  if (!data) return <>Andmed puuduvad</>;
  return <div className='container' style={{ backgroundColor: '#F0F8FF' }}>
    {data.map((change : any, index: number) => <CommentaryRow key={index} comment={change}/>)}
  </div>;
};

export default Commentary;