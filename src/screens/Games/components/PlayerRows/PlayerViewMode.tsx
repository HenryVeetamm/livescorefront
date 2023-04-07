import { Col, Divider, Row, Tag } from 'antd';

import '../../styles.less';
import { PlayerInGameDto } from 'app/services/player/types';
import Tracker from 'components/Tracker/Tracker';
import MobilePlayerViewMode from './MobilePlayerRow';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { EfficiencyDto } from 'utils/statistics';
import Efficency from 'components/Tags/EfficencyTag';

//ViewMode
const PlayerViewMode = ({ playerInGame, playerEfficency }: { playerInGame: PlayerInGameDto, playerEfficency: EfficiencyDto }) => {
  const { isLarge } = useScreenBreakpoint();

  if (!isLarge) return <MobilePlayerViewMode playerInGame={playerInGame} playerEfficency={playerEfficency} />;

  return <>
    <Row justify={'center'}>

      <Col span={6} className={'text-center'}>
        <span className='text-bold'>
          #{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}
        </span>
        <Efficency playerEfficency={playerEfficency}/>
      </Col>

      <Col span={5} className={'text-center'}>
        <span style={{ paddingRight: '5px' }}>
          <Tracker content={playerInGame.attackToPoint + playerInGame.attackInGame + playerInGame.attackFault}>
            Rünnak:
          </Tracker>
        </span>
        <Tag color='success'>{playerInGame.attackToPoint}</Tag>
        <Tag color='warning'>{playerInGame.attackInGame}</Tag>
        <Tag color='error'>{playerInGame.attackFault}</Tag>
      </Col>

      <Col span={4} className={'text-center'}>
        <span style={{ paddingRight: '5px' }}>
          <Tracker content={playerInGame.blockPoint + playerInGame.blockFault}>
            Blokk:
          </Tracker>
        </span>
        <Tag color='success'>{playerInGame.blockPoint}</Tag>
        <Tag color='error'>{playerInGame.blockFault}</Tag>
      </Col>

      <Col span={5} className={'text-center'}>
        <span style={{ paddingRight: '5px' }}>
          <Tracker content={playerInGame.perfectReception + playerInGame.goodReception + playerInGame.receptionFault} >
            Vastuvõtt:
          </Tracker>
        </span>
        <Tag color='success'>{playerInGame.perfectReception}</Tag>
        <Tag color='warning'>{playerInGame.goodReception}</Tag>
        <Tag color='error'>{playerInGame.receptionFault}</Tag>
      </Col>

      <Col span={4} className={'text-center'}>
        <span style={{ paddingRight: '5px' }}>
          <Tracker content={playerInGame.aces + playerInGame.serveFaults}>
            Serv:
          </Tracker>
        </span>
        <Tag color='success'>{playerInGame.aces}</Tag>
        <Tag color='error'>{playerInGame.serveFaults}</Tag>
      </Col>

    </Row>
    <Divider style={{ margin: '6px 0' }} />
  </>;

};

export default PlayerViewMode;