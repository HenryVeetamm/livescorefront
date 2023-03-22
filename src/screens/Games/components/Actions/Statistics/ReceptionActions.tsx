import { Button } from 'antd';
import { Method, PointCategory, CategoryResult } from 'constants/assignScore';
import { SmileHappyIcon, SmileNeutralIcon, SmileSadIcon } from 'icons';


const ReceptionActions = ({ onClick } : { onClick : (method: number, category: number, result: number) => any }) => {
  return <><Button size='large' icon={<SmileHappyIcon/>} style={{ backgroundColor: 'green', color: 'white', height: '50px', width: '50px' }}
    onClick={() => onClick(Method.Increment, PointCategory.Reception, CategoryResult.Good)}/>
  <Button size='large' icon={<SmileNeutralIcon/>} style={{ backgroundColor: 'yellow', height: '50px', width: '50px' }}
    onClick={() => onClick(Method.Increment, PointCategory.Reception, CategoryResult.Neutral)}/>
  <Button size='large' icon={<SmileSadIcon/>} style={{ backgroundColor: 'red', color: 'white', height: '50px', width: '50px' }}
    onClick={() => onClick(Method.Increment, PointCategory.Reception, CategoryResult.Bad)}/>
  </>;
};

export default ReceptionActions;