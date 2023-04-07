import { Skeleton, Card } from 'antd';
import { selectors as playerSelectors, useGetGamePlayersQuery } from 'app/services/player';
import { useSelector } from 'react-redux';
import PlayerRow from '../PlayerRows/PlayerRow';
import isEmpty from 'lodash/isEmpty';
import PlayerViewMode from '../PlayerRows/PlayerViewMode';
import { selectors as sessionSelectors } from 'app/services/session';
import { GameStatus } from 'constants/game';
import '../../styles.less';
import { useManagePlayerScoreMutation } from 'app/services/player';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { calculateEfficiency } from 'utils/statistics';

const PlayerTable = ({ gameId, teamId, gameStatus }: { gameId: string, teamId: string, gameStatus: number }) => {
  const players = useSelector((state: any) => playerSelectors.getPlayers(state, teamId));
  const { isLoading } = useGetGamePlayersQuery({ teamId: teamId, gameId: gameId });
  const userTeamId = useSelector(sessionSelectors.getUserTeamId);
  const { isMobile, isLarge, isSmall, isMedium } = useScreenBreakpoint();
  const [ addPoints ] = useManagePlayerScoreMutation();

  if (!players && isLoading) return <Skeleton active />;
  if ((!players || isEmpty(players)) && !isLoading) return <Card>Võistkond pole mängijaid märkinud</Card>;

  return <div className='stats-container'>

    {
      players.map((player: any) => {
        const playerEfficency = calculateEfficiency(player);
        return userTeamId !== teamId || gameStatus !== GameStatus.Started ?
          <PlayerViewMode
            key={player.id}
            playerInGame={player}
            playerEfficency={playerEfficency}
          />
          :
          <PlayerRow
            key={player.id}
            playerInGame={player}
            gameId={gameId}
            teamId={teamId}
            isMobile={isMobile}
            isLarge={isLarge}
            isSmall={isSmall}
            isMedium={isMedium}
            addPoints={addPoints}
            playerEfficency={playerEfficency}
          />;
      })
    }
  </div>;
};

export default PlayerTable;