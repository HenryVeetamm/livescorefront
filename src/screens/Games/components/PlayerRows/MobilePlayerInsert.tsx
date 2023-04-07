import { Col, Divider, Modal, Row } from 'antd';
import { PlayerInGameDto } from 'app/services/player/types';
import AttackActions from '../Actions/Statistics/AttackActions';
import BlockActions from '../Actions/Statistics/BlockActions';
import ReceptionActions from '../Actions/Statistics/ReceptionActions';
import ServeActions from '../Actions/Statistics/ServeActions';
import '../../styles.less';
import { useState } from 'react';
import { EfficiencyDto } from 'utils/statistics';
import Efficency from 'components/Tags/EfficencyTag';

const MobilePlayerInsert = ({ playerInGame, onClick, playerEfficency } : { playerInGame: PlayerInGameDto, onClick : any, playerEfficency : EfficiencyDto }) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const getContent = () => {
    return (
      <>
        <Divider>#{playerInGame.player.shirtNumber} {playerInGame.player.lastName} <Efficency playerEfficency={playerEfficency}/></Divider>
        <Row justify={'center'}>
          <Col className={'text-center'}>
          Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}
          </Col>
        </Row>
        <Row>
          <Col span={24}className={'text-center'}>
            <ReceptionActions onClick={onClick}/>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col className={'text-center'}>
          Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}
          </Col>
        </Row>
        <Row>
          <Col span={24}className={'text-center'}>
            <AttackActions onClick={onClick}/>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col className={'text-center'}>
          Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}
          </Col>
        </Row>
        <Row>
          <Col span={24}className={'text-center'}>
            <BlockActions onClick={onClick}/>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col className={'text-center'}>
          Serv {playerInGame.aces}/{playerInGame.serveFaults}
          </Col>
        </Row>
        <Row>
          <Col span={24}className={'text-center'}>
            <ServeActions onClick={onClick}/>
          </Col>
        </Row>
      </>
    );
  };

  const onOK = () => {

    setIsModalOpen(false);
  };

  const onDivClick = (e : any) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return <>

    <div onClick={(e) => onDivClick(e)}>
      <Divider >
        #{playerInGame.player.shirtNumber} {playerInGame.player.lastName} <Efficency playerEfficency={playerEfficency}/>
      </Divider>
    </div>

    <Modal

      open={isModalOpen}
      onOk={onOK}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      {getContent()}
    </Modal>
  </>;
};

export default MobilePlayerInsert;