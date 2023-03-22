import { Col, Row } from 'antd';

import '../../styles.less';
import { PlayerInGameDto } from 'app/services/player/types';
import Tracker from 'components/Tracker/Tracker';
import MobilePlayerViewMode from './MobilePlayerRow';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

const PlayerViewMode = ({ playerInGame } : { playerInGame : PlayerInGameDto }) => {
  const { isMobile } = useScreenBreakpoint();
  if (isMobile) return <MobilePlayerViewMode playerInGame={playerInGame} />;

  return <>
    <Row justify={'center'}>
      <Col span={4} className={'text-center'}>#{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}</Col>
      <Col span={5} className={'text-center'}>
        <Tracker content={playerInGame.perfectReception} >
        Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}
        </Tracker></Col>
      <Col span={5} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
      <Col span={5} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
      <Col span={5} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
    </Row>
  </>;

};

export default PlayerViewMode;