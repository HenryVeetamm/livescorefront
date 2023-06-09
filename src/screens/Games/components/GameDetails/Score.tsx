import { Avatar, Button, Card, Col, Dropdown, MenuProps, Row, Space, Spin } from 'antd';
import { GameDto } from 'app/services/game/types';
import { TeamDto } from 'app/services/team/types';
import '../../styles.less';
import { useSelector } from 'react-redux';
import { selectors as gameSelectors } from 'app/services/game/slice';
import { useGetCurrentSetQuery, useManageGameScoreMutation, } from 'app/services/game';
import { Method, Team } from 'constants/assignScore';
import { GameStatus } from 'constants/game';
import Can from 'components/Can/Can';
import AddPlayerForm from '../Actions/AddPlayersForm';
import { selectors as sessionSelectors } from 'app/services/session';
import EndGameButton from '../Actions/EndGameButton';
import StartGameButton from '../Actions/StartGameButton';
import StartNewSetButton from '../Actions/StartNewSetButton';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

import { DownOutlined } from '@ant-design/icons';
import { TeamsIcon, VolleyballIcon } from 'icons';
import DeleteGameButton from '../Actions/DeleteGame';


const Score = ({ game }: { game: GameDto }) => {
  const currentSet = useSelector(gameSelectors.getCurrentSet);
  const viewersCount = useSelector(gameSelectors.getViwersCount);
  const userTeamId = useSelector(sessionSelectors.getUserTeamId);
  const { isMedium } = useScreenBreakpoint();
  const { isFetching, isLoading } = useGetCurrentSetQuery(game.id, { refetchOnMountOrArgChange: true });

  const [ addScore, meta ] = useManageGameScoreMutation();

  const getAwayTeamName = () => {
    if (game.awayTeam) return game.awayTeam.name;
    return game.awayTeamName;
  };

  const getTeamLogo = (team?: TeamDto) => {
    if (!team) return undefined;
    return team.teamLogoUri;
  };

  const onTeamScoreClick = async (method: number, team : number) => {
    await addScore({ gameId: game.id, method: method, team: team });
  };

  const getAddPlayers = () => {
    if (((game.awayTeam && game.awayTeam.id && game.awayTeam.id === userTeamId) ||
     game.homeTeam.id === userTeamId)) {
      if (game.gameStatus !== GameStatus.NotStarted) return undefined;
      return <AddPlayerForm gameId={game.id}/>;
    }
    return undefined;
  };

  const getDeleteButton = () => {
    if (game.gameStatus === GameStatus.NotStarted && game.homeTeam.id === userTeamId) {
      return <DeleteGameButton gameId={game.id}/>;
    }
    return undefined;
  };

  const getStartOrStopButton = () => {
    if (game.gameStatus === GameStatus.NotStarted) return <Can teamId={[ game.homeTeam.id ]}><StartGameButton gameId={game.id}/></Can>;
    if (game.gameStatus === GameStatus.Started) return <Can teamId={[ game.homeTeam.id ]}><EndGameButton gameId={game.id}/></Can>;
    return undefined;
  };

  const getSetButton = () => {
    if (game.gameStatus === GameStatus.Started) return <Can teamId={[ game.homeTeam.id ]}><StartNewSetButton gameId={game.id}/></Can>;
    return undefined;
  };

  const getDropDown = () =>{
    if (game.gameStatus !== GameStatus.NotStarted && userTeamId !== game.homeTeam.id) return undefined;
    if (game.gameStatus !== GameStatus.Ended) {
      const startButton = getStartOrStopButton();
      const setButton = getSetButton();
      const addPlayers = getAddPlayers();
      const deleteButton = getDeleteButton();

      const items: MenuProps['items'] = [
        { label: startButton, key: '1' },
        { label: setButton, key: '2' },
        { label: addPlayers, key: '3' },
        { label: deleteButton, key: '4' } ];

      return <Dropdown menu={{ items }} trigger={[ 'click' ]}>
        <Button icon={<DownOutlined />} type="primary">
              Tegevused
        </Button>
      </Dropdown>;
    }
    return <></>;
  };

  const renderExtra = () => {
    if (game.gameStatus === GameStatus.Ended) return <></>;
    return <Can teamId={[ game.homeTeam.id, game.awayTeam ? game.awayTeam.id : '' ]}>
      {isMedium ? <Space wrap>
        {getStartOrStopButton()}
        {getSetButton()}
        {getAddPlayers()}
        {getDeleteButton()}
      </Space> : getDropDown()
      }
    </Can>;
  };

  const getCorrectHomeTeamSocre = () => {
    if (game.gameStatus === GameStatus.Ended) return game.homeTeamSetWins;
    return currentSet ? currentSet.homeTeamScore : '-';
  };

  const getCorrectAwayTeamSocre = () => {
    if (game.gameStatus === GameStatus.Ended) return game.awayTeamSetWins;
    return currentSet ? currentSet.awayTeamScore : '-';
  };

  const getScores = () => {
    return <>
      <Col span={1} ><div className={'score-center'}>{getCorrectHomeTeamSocre()}</div></Col>
      <Col span={2}>
        <div className={'score-center'}>:</div>
      </Col>
      <Col span={1}><div className={'score-center'}>{getCorrectAwayTeamSocre()}</div></Col>
    </>;
  };

  return (
    <Spin spinning={isFetching || isLoading} indicator={<VolleyballIcon spin/>}>
      <Card className={`game-info${game.isGameLive ? ' live' : ''}`}
        title={<span style={{ fontWeight: 'lighter', color: 'grey' }}>Vaatajaid: {viewersCount ? viewersCount : '-'}</span>}
        extra={renderExtra()}>
        <Row>

          <Col span={10} >
            <Row justify={'center'}>
              <Avatar
                src={game.homeTeam.teamLogoUri}
                size={'large'}
                icon={<TeamsIcon/>}
                style={{ marginRight: '10px' }}
              />
            </Row>
            <Row justify={'center'} className={'text-center'}>
              <div style={{ fontWeight:'bold', marginRight: '10px' }}>{game.homeTeam.name} </div>
            </Row>
          </Col>
          {!isFetching && !isLoading ? getScores() : <Col span={4}></Col>}

          <Col span={10} >
            <Row justify={'center'}>
              <Avatar
                src={getTeamLogo(game.awayTeam)}
                size={'large'}
                icon={<TeamsIcon/>}
                style={{ marginLeft: '10px' }}
              />
            </Row>
            <Row justify={'center'} className={'text-center'}>
              <div style={{ fontWeight:'bold', marginLeft: '10px' }}>{getAwayTeamName()}</div>
            </Row>
          </Col>
        </Row>
        <Can teamId={[ game.homeTeam.id ]}
          gameStatus={game.gameStatus}
          requiredStatus={GameStatus.Started}
        >
          <Row className={'text-center'}>
            <Col span={10}>
              <Button disabled={meta.isLoading} className={'stats-button positive'} onClick={() => onTeamScoreClick(Method.Increment, Team.HomeTeam)}>+1</Button>
              <Button disabled={meta.isLoading} className={'stats-button negative'} onClick={() => onTeamScoreClick(Method.Decrement, Team.HomeTeam)}>-1</Button></Col>
            <Col span={4}></Col>
            <Col span={10}>
              <Button disabled={meta.isLoading} className={'stats-button positive'} onClick={() => onTeamScoreClick(Method.Increment, Team.AwayTeam)}>+1</Button>
              <Button disabled={meta.isLoading} className={'stats-button negative'} onClick={() => onTeamScoreClick(Method.Decrement, Team.AwayTeam)}>-1</Button></Col>
          </Row>
        </Can>
      </Card>
    </Spin>
  );
};

export default Score;

