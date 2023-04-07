import { Col, Divider, Row } from 'antd';
import { PlayerInGameDto } from 'app/services/player/types';
import ReceptionActions from '../Actions/Statistics/ReceptionActions';
import AttackActions from '../Actions/Statistics/AttackActions';
import BlockActions from '../Actions/Statistics/BlockActions';
import ServeActions from '../Actions/Statistics/ServeActions';
import '../../styles.less';
import { EfficiencyDto } from 'utils/statistics';
import Efficency from 'components/Tags/EfficencyTag';

//InsertMode
const TabletPlayerInsert = ({ playerInGame, onClick, playerEfficency } : { playerInGame : PlayerInGameDto, onClick: any, playerEfficency: EfficiencyDto }) => {
  return <>
    <Divider>#{playerInGame.player.shirtNumber} {playerInGame.player.lastName} <Efficency playerEfficency={playerEfficency}/></Divider>
    <Row justify={'center'}>
      <Col span={6} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
      <Col span={6} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
      <Col span={6} className={'text-center'}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Col>
      <Col span={6} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
    </Row>
    <Row justify={'center'}>
      <Col span={7} className={'text-center'}>
        <AttackActions onClick={onClick}/>
      </Col>

      <Col span={5} className={'text-center'}>
        <BlockActions onClick={onClick}/>
      </Col>
      <Col span={7} className={'text-center'}>
        <ReceptionActions onClick={onClick}/>
      </Col>

      <Col span={5} className={'text-center'}>
        <ServeActions onClick={onClick}/>
      </Col>
    </Row>
  </>;
};

export default TabletPlayerInsert;
