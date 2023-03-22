import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { positionValues } from 'constants/playerPosition';
import moment from 'moment';
import PlayerDetails from 'screens/Player/PlayerDetails';
import { calculateAge, getDate } from 'utils/date';
import EditPlayer from './Actions/EditPlayer';
import UploadProfile from './Actions/UploadProfile';
import PlayerForm from './PlayerForm';
import { UserOutlined } from '@ant-design/icons';

type PlayerInfoProps = {
  id: string,
  firstName: string,
  lastName: string,
  position: number,
  shirtNumber: number,
  dateOfBirth: Date,
  profileAbsoulteUri: string | undefined
}

const PlayerCard = ({ player, hideActions }: { player : PlayerInfoProps, hideActions?: boolean }) => {

  const getAvatar = () => {
    if (player.profileAbsoulteUri) {
      return <Avatar src={player.profileAbsoulteUri} size="large" />;
    }
    return <Avatar icon={<UserOutlined/>} size="large" />;
  };

  const getActions = () => {
    if (hideActions) {
      return [ <PlayerDetails
        key='view'
        player={player}/>, ];
    }
    return [
      <PlayerDetails
        key='view'
        player={player}/>,
      <PlayerForm
        key='edit'
        button={<EditPlayer/>}
        initialValues={{
          ...player,
          dateOfBirth: moment(player.dateOfBirth) }}
      />,
      <UploadProfile id={player.id} key='upload'/>
    ];
  };

  return <Card
    title={`${player.firstName} ${player.lastName}`} bordered={false}
    actions={getActions()}>
    <Meta
      avatar={getAvatar()}
      title={`#${player.shirtNumber} ${positionValues[player.position]}`}
      description={`Vanus: ${calculateAge(player.dateOfBirth)},${getDate(player.dateOfBirth)}`}
    />
  </Card>;
};

export default PlayerCard;