import { Col, Row } from 'antd';
import { ManagePlayerScoreDto, PlayerInGameDto } from 'app/services/player/types';

import Can from 'components/Can/Can';
import ReceptionActions from '../Actions/Statistics/ReceptionActions';
import AttackActions from '../Actions/Statistics/AttackActions';
import BlockActions from '../Actions/Statistics/BlockActions';
import ServeActions from '../Actions/Statistics/ServeActions';
import '../../styles.less';
import MobilePlayerInsert from './MobilePlayerInsert';
import { EfficiencyDto } from 'utils/statistics';
import TabletPlayerInsert from './TabletPlayerInsert';
import Efficency from 'components/Tags/EfficencyTag';

//InsertMode
const PlayerRow = ({ playerInGame, gameId, teamId, isMobile, addPoints, isLarge, isSmall, isMedium, playerEfficency } : {
  playerInGame : PlayerInGameDto,
  gameId : string,
  teamId : string,
  addPoints : any,
  isMobile? : boolean,
  isLarge?: boolean,
  isSmall?: boolean,
  isMedium?: boolean,
  playerEfficency: EfficiencyDto
}) => {

  const onClick = async (method: number, category: number, categoryResult: number) => {
    const obs : ManagePlayerScoreDto= {
      playerInGameId: playerInGame.id,
      playerId: playerInGame.player.id,
      teamId: teamId,
      gameId: gameId,
      method: method,
      category: category,
      categoryResult: categoryResult
    };

    await addPoints(obs).unwrap();
  };

  if (isMobile || (isSmall && !isMedium)) return <MobilePlayerInsert playerInGame={playerInGame} onClick={onClick} playerEfficency={playerEfficency}/>;
  if (!isLarge) return <TabletPlayerInsert playerInGame={playerInGame} onClick={onClick} playerEfficency={playerEfficency}/>;

  return <Row>
    <Col span={4}>
      <Row justify={'center'}><Col>#{playerInGame.player.shirtNumber} {playerInGame.player.lastName}</Col></Row>
      <Row justify={'center'}>
        <Efficency playerEfficency={playerEfficency} />
      </Row>
    </Col>
    <Col span={20}>
      <Row justify={'center'}>
        <Col span={5} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
        <Col span={5} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
        <Col span={5} className={'text-center'}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Col>
        <Col span={5} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
      </Row>
      <Row justify={'center'}>
        <Can teamId={[ teamId ]}>
          <Col span={6} className={'text-center'}>
            <AttackActions onClick={onClick}/>
          </Col>
          <Col span={4} className={'text-center'}>
            <BlockActions onClick={onClick}/>
          </Col>
          <Col span={6} className={'text-center'}>
            <ReceptionActions onClick={onClick}/>
          </Col>
          <Col span={4} className={'text-center'}>
            <ServeActions onClick={onClick}/>
          </Col>
        </Can>

      </Row>
    </Col>
  </Row>;
};

export default PlayerRow;
