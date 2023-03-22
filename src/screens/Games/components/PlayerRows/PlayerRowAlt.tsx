import { Col, Row } from 'antd';
import { ManagePlayerScoreDto, PlayerInGameDto } from 'app/services/player/types';
import { useManagePlayerScoreMutation } from 'app/services/player';
import Can from 'components/Can/Can';
import Tracker from 'components/Tracker/Tracker';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import MobilePlayerRow from './MobilePlayerRow';
import ReceptionActions from '../Actions/Statistics/ReceptionActions';
import AttackActions from '../Actions/Statistics/AttackActions';
import BlockActions from '../Actions/Statistics/BlockActions';
import ServeActions from '../Actions/Statistics/ServeActions';
import '../../styles.less';

const PlayerRowAlt = ({ playerInGame, gameId, teamId } : { playerInGame : PlayerInGameDto, gameId : string, teamId : string }) => {

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
  console.log(isMobile);
  if (isMobile) return <MobilePlayerRow playerInGame={playerInGame} />;

  return <>
    <Row justify={'center'}>
      <Col span={4} className={'text-center'}>nimi</Col>
      <Col span={5} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
      <Col span={5} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
      <Col span={5} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
      <Col span={5} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
    </Row>
    <Row justify={'center'}>
      <Col span={4} className={'text-center'}>{playerInGame.player.firstName} {playerInGame.player.lastName}</Col>
      <Can teamId={teamId}>
        <Col span={5} className={'text-center'}>
          <ReceptionActions onClick={onClick}/>
        </Col>
      </Can>
      <Col span={5} className={'text-center'}>
        <AttackActions onClick={onClick}/>
      </Col>
      <Col span={5} className={'text-center'}>
        <BlockActions onClick={onClick}/>
      </Col>
      <Col span={5} className={'text-center'}>
        <ServeActions onClick={onClick}/>
      </Col>
    </Row>
  </>;

};

export default PlayerRowAlt;

// import { Col, Divider, Row } from 'antd';
// import { ManagePlayerScoreDto, PlayerInGameDto } from 'app/services/player/types';
// import { useManagePlayerScoreMutation } from 'app/services/player';
// import Can from 'components/Can/Can';
// import Tracker from 'components/Tracker/Tracker';
// import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
// import MobilePlayerRow from './MobilePlayerRow';
// import ReceptionActions from '../Actions/Statistics/ReceptionActions';
// import AttackActions from '../Actions/Statistics/AttackActions';
// import BlockActions from '../Actions/Statistics/BlockActions';
// import ServeActions from '../Actions/Statistics/ServeActions';
// import '../../styles.less';

// const PlayerRow = ({ playerInGame, gameId, teamId } : { playerInGame : PlayerInGameDto, gameId : string, teamId : string }) => {

//   const { isMobile } = useScreenBreakpoint();
//   const [ addPoints ] = useManagePlayerScoreMutation();

//   const onClick = async (method: number, category: number, categoryResult: number) => {
//     const obs : ManagePlayerScoreDto= {
//       playerInGameId: playerInGame.id,
//       playerId: playerInGame.player.id,
//       teamId: teamId,
//       gameId: gameId,
//       method: method,
//       category: category,
//       categoryResult: categoryResult
//     };

//     await addPoints(obs).unwrap();
//   };
//   console.log(isMobile);
//   if (isMobile) return <MobilePlayerRow playerInGame={playerInGame} />;

//   return <>
//     <Divider>Henry Veetamm</Divider>
//     <Row justify={'center'}>
//       <Col span={4} className={'text-center'}>nimi</Col>
//       <Col span={5} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
//       <Col span={5} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
//       <Col span={5} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
//       <Col span={5} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
//     </Row>
//     <Row justify={'center'}>
//       <Col span={4} className={'text-center'}>{playerInGame.player.firstName} {playerInGame.player.lastName}</Col>
//       <Can teamId={teamId}>
//         <Col span={5} className={'text-center'}>
//           <ReceptionActions onClick={onClick}/>
//         </Col>
//       </Can>
//       <Col span={5} className={'text-center'}>
//         <AttackActions onClick={onClick}/>
//       </Col>
//       <Col span={5} className={'text-center'}>
//         <BlockActions onClick={onClick}/>
//       </Col>
//       <Col span={5} className={'text-center'}>
//         <ServeActions onClick={onClick}/>
//       </Col>
//     </Row>
//     <Divider>Henry Veetamm</Divider>
//     <Row justify={'center'}>
//       <Col span={5} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
//       <Col span={5} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
//       <Col span={5} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
//       <Col span={5} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
//     </Row>
//     <Row justify={'center'}>
//       <Can teamId={teamId}>
//         <Col span={6} className={'text-center'}>
//           <ReceptionActions onClick={onClick}/>
//         </Col>
//       </Can>
//       <Col span={6} className={'text-center'}>
//         <AttackActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <BlockActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <ServeActions onClick={onClick}/>
//       </Col>
//     </Row>
//     <Divider>Henry Veetamm</Divider>
//     <Row justify={'center'}>
//       <Col span={6} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
//       <Col span={6} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
//       <Col span={6} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
//       <Col span={6} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
//     </Row>
//     <Row justify={'center'}>
//       <Can teamId={teamId}>
//         <Col span={6} className={'text-center'}>
//           <ReceptionActions onClick={onClick}/>
//         </Col>
//       </Can>
//       <Col span={6} className={'text-center'}>
//         <AttackActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <BlockActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <ServeActions onClick={onClick}/>
//       </Col>
//     </Row>
//     <Divider>Henry Veetamm</Divider>
//     <Row justify={'center'}>
//       <Col span={6} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
//       <Col span={6} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
//       <Col span={6} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
//       <Col span={6} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
//     </Row>
//     <Row justify={'center'}>
//       <Can teamId={teamId}>
//         <Col span={6} className={'text-center'}>
//           <ReceptionActions onClick={onClick}/>
//         </Col>
//       </Can>
//       <Col span={6} className={'text-center'}>
//         <AttackActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <BlockActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <ServeActions onClick={onClick}/>
//       </Col>
//     </Row>
//     <Divider>Henry Veetamm</Divider>
//     <Row justify={'center'}>
//       <Col span={6} className={'text-center'}><Tracker content={playerInGame.perfectReception}>Vastuvõtt {playerInGame.perfectReception}/{playerInGame.goodReception}/{playerInGame.receptionFault}</Tracker></Col>
//       <Col span={6} className={'text-center'}>Rünnak {playerInGame.attackToPoint}/{playerInGame.attackInGame}/{playerInGame.attackFault}</Col>
//       <Col span={6} className={'text-center'}>Blokk {playerInGame.blockPoint}/{playerInGame.blockFault}</Col>
//       <Col span={6} className={'text-center'}>Serv {playerInGame.aces}/{playerInGame.serveFaults}</Col>
//     </Row>
//     <Row justify={'center'}>
//       <Can teamId={teamId}>
//         <Col span={6} className={'text-center'}>
//           <ReceptionActions onClick={onClick}/>
//         </Col>
//       </Can>
//       <Col span={6} className={'text-center'}>
//         <AttackActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <BlockActions onClick={onClick}/>
//       </Col>
//       <Col span={6} className={'text-center'}>
//         <ServeActions onClick={onClick}/>
//       </Col>
//     </Row>
//   </>;

// };

// export default PlayerRow;