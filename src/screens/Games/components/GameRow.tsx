import { Avatar, Card, Col, Row } from 'antd';
import { GameDto } from 'app/services/game/types';
import { TeamDto } from 'app/services/team/types';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { getDateTime } from 'utils/date';
import '../styles.less';

import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import { GameStatus } from 'constants/game';
import { VolleyballIcon } from 'icons';

const GameRow = ({ game }: { game: GameDto }) => {
  const { isMobile } = useScreenBreakpoint();
  const navigate = useNavigate();

  const getData = () => {
    if (isMobile) return getDateTime(game.scheduledTime);
    return `${game.location}, ${getDateTime(game.scheduledTime)}`;
  };

  const getAwayTeamName = () => {
    if (game.awayTeam) return game.awayTeam.name;
    return game.awayTeamName;
  };

  const getTeamLogo = (team?: TeamDto) => {
    if (!team) return undefined;
    return team.teamLogoUri;
  };

  const getGameInfo = () => {
    if (game.gameStatus === GameStatus.Ended) {
      return (
        <>
          <Col span={1} ><div className={'score-center'}>{game.homeTeamSetWins}</div></Col>
          <Col span={2}><div className={'score-center'}>:</div></Col>
          <Col span={1}><div className={'score-center'}>{game.awayTeamSetWins}</div></Col>
        </>);
    }
    else if (game.gameStatus === GameStatus.Started) {
      return (
        <Col span={4}><div className='score-text-center'>OTSE</div></Col>
      );
    }
    else return <Col span={4}><div className='score-center text-bold'>VS</div></Col>;
  };


  return (
    <Card
      className={`game-row${game.isGameLive ? ' live' : ''}`}
      onClick={() => navigate(Paths.GAME.replace(':id', game.id))}
    >
      {game.gameStatus !== GameStatus.Started ? <div className='header-wrapper'>
        <div className='header-info'>{getData()}</div>
      </div> : null}
      <Row>

        <Col span={10} >
          <Row justify={'center'}>
            <Avatar
              src={game.homeTeam.teamLogoUri}
              size={'large'}
              icon={<VolleyballIcon/>}
            />
          </Row>
          <Row justify={'center'} className={'text-center'}>
            <div style={{ fontWeight:'bold' }}>{game.homeTeam.name} </div>
          </Row>
        </Col>

        {getGameInfo()}

        <Col span={10} >
          <Row justify={'center'}>
            <Avatar
              src={getTeamLogo(game.awayTeam)}
              size={'large'}
              icon={<VolleyballIcon/>}/>
          </Row>
          <Row justify={'center'} className={'text-center'}>
            <div style={{ fontWeight:'bold' }}>{getAwayTeamName()}</div>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default GameRow;
