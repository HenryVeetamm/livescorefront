import { Col, Divider, Row } from 'antd';
import { ManagePlayerScoreDto, PlayerInGameDto } from 'app/services/player/types';
import { useManagePlayerScoreMutation } from 'app/services/player';
import Can from 'components/Can/Can';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import ReceptionActions from '../Actions/Statistics/ReceptionActions';
import AttackActions from '../Actions/Statistics/AttackActions';
import BlockActions from '../Actions/Statistics/BlockActions';
import ServeActions from '../Actions/Statistics/ServeActions';
import '../../styles.less';
import MobilePlayerInsert from './MobilePlayerInsert';

//InsertMode
const PlayerRow = ({ playerInGame, gameId, teamId } : { playerInGame : PlayerInGameDto, gameId : string, teamId : string }) => {

  const { isMobile } = useScreenBreakpoint();
  const [ addPoints ] = useManagePlayerScoreMutation();

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
  if (isMobile) return <MobilePlayerInsert playerInGame={playerInGame} onClick={onClick} />;

  return <>
    <Divider>#{playerInGame.player.shirtNumber} {playerInGame.player.firstName} {playerInGame.player.lastName}</Divider>
    <Row justify={'center'}>

      <Col span={6} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
      <Col span={6} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
      <Col span={6} className={'text-center'}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Col>
      <Col span={6} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
    </Row>
    <Row justify={'center'}>
      <Can teamId={[ teamId ]}>
        <Col span={6} className={'text-center'}>
          <AttackActions onClick={onClick}/>
        </Col>

        <Col span={6} className={'text-center'}>
          <BlockActions onClick={onClick}/>
        </Col>
        <Col span={6} className={'text-center'}>
          <ReceptionActions onClick={onClick}/>
        </Col>


        <Col span={6} className={'text-center'}>
          <ServeActions onClick={onClick}/>
        </Col>
      </Can>

    </Row>
  </>;
};

export default PlayerRow;
