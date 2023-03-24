import { Col, Divider, Row } from 'antd';
import { PlayerInGameDto } from 'app/services/player/types';
import Tracker from 'components/Tracker/Tracker';
import '../../styles.less';


const MobilePlayerViewMode = ({ playerInGame } : { playerInGame : PlayerInGameDto }) => {
  const totalCount = () => {
    return playerInGame.perfectReception + playerInGame.goodReception + playerInGame.receptionFault +
     playerInGame.attackToPoint + playerInGame.attackInGame + playerInGame.attackFault +
     playerInGame.blockPoint + playerInGame.blockFault +
     playerInGame.aces + playerInGame.serveFaults;
  };

  return <>
    <Divider plain>
      <Tracker content={totalCount()}>
        <span className='text-bold'>#{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}</span>
      </Tracker>
    </Divider>
    <Row>
      <Col span={6} className={'text-center'}>

        <Row justify={'start'} >
          <span className='text-bold'>Vastuvõtt:</span>
        </Row>
        <Row justify={'start'}>
          {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}
        </Row>
      </Col>
      <Col span={6} className={'text-center'}>

        <Row justify={'center'}>
          <span className='text-bold'>Rünnak:</span>
        </Row>
        <Row justify={'center'}>
          {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}
        </Row>
      </Col>
      <Col span={6} className={'text-center'}>

        <Row justify={'center'}><span className='text-bold'>Blokk:</span></Row>
        <Row justify={'center'}>{playerInGame.blockPoint}/{playerInGame.blockFault}</Row>
      </Col>
      <Col span={6} className={'text-center'}>
        <Row justify={'center'}>
          <span className='text-bold'>  Serv:</span>
        </Row>
        <Row justify={'center'}>
          {playerInGame.aces}/{playerInGame.serveFaults}
        </Row>
      </Col>
    </Row>
  </>;
};

export default MobilePlayerViewMode;