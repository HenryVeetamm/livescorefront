import { Col, Row } from 'antd';

import '../../styles.less';
import { PlayerInGameDto } from 'app/services/player/types';
import Tracker from 'components/Tracker/Tracker';
import MobilePlayerViewMode from './MobilePlayerRow';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

//ViewMode
const PlayerViewMode = ({ playerInGame } : { playerInGame : PlayerInGameDto }) => {
  const { isLarge } = useScreenBreakpoint();

  if (!isLarge) return <MobilePlayerViewMode playerInGame={playerInGame} />;

  return <>
    <Row justify={'center'}>
      <Col span={4} className={'text-center'}><span className='text-bold'>#{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}</span></Col>

      <Col span={5} className={'text-center'}>
        <Tracker content={playerInGame.attackToPoint + playerInGame.attackInGame + playerInGame.attackFault}>
        Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}
        </Tracker> </Col>
      <Col span={5} className={'text-center'}>
        <Tracker content={playerInGame.blockPoint + playerInGame.blockFault}>
        Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}
        </Tracker></Col>
      <Col span={5} className={'text-center'}>
        <Tracker content={playerInGame.perfectReception + playerInGame.goodReception + playerInGame.receptionFault} >
        Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}
        </Tracker></Col>
      <Col span={5} className={'text-center'}>
        <Tracker content={playerInGame.aces + playerInGame.serveFaults}>
        Serv {playerInGame.aces}/{playerInGame.serveFaults}
        </Tracker></Col>
    </Row>
  </>;

};

export default PlayerViewMode;