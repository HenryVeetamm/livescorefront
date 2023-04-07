import { Col, Divider, Row, Tag } from 'antd';
import { PlayerInGameDto } from 'app/services/player/types';
import Tracker from 'components/Tracker/Tracker';
import '../../styles.less';
import { EfficiencyDto } from 'utils/statistics';
import Efficency from 'components/Tags/EfficencyTag';


const MobilePlayerViewMode = ({ playerInGame, playerEfficency }: { playerInGame: PlayerInGameDto, playerEfficency: EfficiencyDto }) => {

  const totalCount = () => {
    return playerInGame.perfectReception + playerInGame.goodReception + playerInGame.receptionFault +
      playerInGame.attackToPoint + playerInGame.attackInGame + playerInGame.attackFault +
      playerInGame.blockPoint + playerInGame.blockFault +
      playerInGame.aces + playerInGame.serveFaults;
  };

  return <>
    <Divider plain>
      <Tracker content={totalCount()}>
        <span className='text-bold'>#{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}</span> <Efficency playerEfficency={playerEfficency} />
      </Tracker>
    </Divider>
    <Row>
      <Col span={6} className={'text-center'}>
        <Row justify={'center'}>
          Rünnak:
        </Row>
        <Row justify={'center'}>
          <Tag color='success'>{playerInGame.attackToPoint}</Tag>
          <Tag color='warning'>{playerInGame.attackInGame}</Tag>
          <Tag color='error'>{playerInGame.attackFault}</Tag>
        </Row>
      </Col>
      <Col span={6} className={'text-center'}>
        <Row justify={'center'}>Blokk:</Row>
        <Row justify={'center'}>
          <Tag color='success'>{playerInGame.blockPoint}</Tag>
          <Tag color='error'>{playerInGame.blockFault}</Tag>
        </Row>
      </Col>
      <Col span={6} className={'text-center'}>
        <Row justify={'center'}>Vastuvõtt:</Row>
        <Row justify={'center'}>
          <Tag color='success'>{playerInGame.perfectReception}</Tag>
          <Tag color='warning'>{playerInGame.goodReception}</Tag>
          <Tag color='error'>{playerInGame.receptionFault}</Tag>
        </Row>
      </Col>
      <Col span={6} className={'text-center'}>
        <Row justify={'center'}>Serv:</Row>
        <Row justify={'center'}>
          <Tag color='success'>{playerInGame.aces}</Tag>
          <Tag color='error'>{playerInGame.serveFaults}</Tag>
        </Row>
      </Col>
    </Row>
  </>;
};

export default MobilePlayerViewMode;