import { Space, Skeleton, Card } from 'antd';
import { selectors as playerSelectors, useGetGamePlayersQuery } from 'app/services/player';
import { useSelector } from 'react-redux';
import PlayerRow from '../PlayerRows/PlayerRow';
import isEmpty from 'lodash/isEmpty';
import PlayerViewMode from '../PlayerRows/PlayerViewMode';
import { selectors as sessionSelectors } from 'app/services/session';
import { GameStatus } from 'constants/game';

const PlayerTable = ({ gameId, teamId, gameStatus }: { gameId: string, teamId: string, gameStatus: number }) => {

  const players = useSelector((state: any) => playerSelectors.getPlayers(state, teamId));
  const { isLoading } = useGetGamePlayersQuery({ teamId: teamId, gameId: gameId });
  const userTeamId = useSelector(sessionSelectors.getUserTeamId);


  if (!players && isLoading) return <Skeleton active/>;
  if ((!players || isEmpty(players)) && !isLoading) return <Card>Võistkond pole mängijaid märkinud</Card>;

  return <Space direction="vertical" size='middle' style={{ display: 'flex' }}>

    {players.map((player : any) =>
    {return userTeamId !== teamId || gameStatus !== GameStatus.Started? <PlayerViewMode playerInGame={player} /> : <PlayerRow
      key={player.id}
      playerInGame={player}
      gameId={gameId}
      teamId={teamId}
    />;})

    }

  </Space>;
};

export default PlayerTable;