import { Tag } from 'antd';
import { EfficiencyDto } from 'utils/statistics';

const Efficency = ({ playerEfficency }: { playerEfficency : EfficiencyDto }) => {

  const symbol = playerEfficency.efficiency > 0 ? '+' : '';
  return <div>
    <Tag>{playerEfficency.totalPoints}</Tag>
    <Tag color={playerEfficency.efficiency >= 0 ? 'success' : 'error'}>{symbol}{playerEfficency.efficiency}</Tag>
  </div>;
};

export default Efficency;