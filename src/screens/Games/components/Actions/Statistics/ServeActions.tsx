import { Button } from 'antd';
import { Method, PointCategory, CategoryResult } from 'constants/assignScore';
import { SmileHappyIcon, SmileSadIcon } from 'icons';

const ServeActions = ({ onClick } : { onClick : (method: number, category: number, result: number) => any }) => {
  return <><Button size='large' icon={<SmileHappyIcon/>} style={{ backgroundColor: 'green', color: 'white', height: '50px', width: '50px' }}
    onClick={() => onClick(Method.Increment, PointCategory.Serve, CategoryResult.Good)}/>
  <Button size='large' icon={<SmileSadIcon/>} style={{ backgroundColor: 'red', color: 'white', height: '50px', width: '50px' }}
    onClick={() => onClick(Method.Increment, PointCategory.Serve, CategoryResult.Bad)}/>
  </>;
};

export default ServeActions;