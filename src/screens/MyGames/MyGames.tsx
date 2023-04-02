import { Card, Skeleton } from 'antd';
import { useGetMyGamesQuery } from 'app/services/game';
import GameRow from 'screens/Games/components/GameRow';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { selectors } from 'app/services/session';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';

const MyGames = () => {
  const { data, isLoading } = useGetMyGamesQuery();

  const isAdmin = useSelector(selectors.isUserAdmin);
  const navigate = useNavigate();
  if (isAdmin) navigate(Paths.HOME);


  if (isLoading) return <Skeleton active/>;
  if (!data || isEmpty(data)) return <Card>Mänge ei leitud</Card>;

  return <>
    {data.map((game:any) => <GameRow key={game.id} game={game}/>)}
  </>;


};

export default MyGames;