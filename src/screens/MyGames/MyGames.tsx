import { Card, Skeleton } from 'antd';
import { useGetMyGamesQuery } from 'app/services/game';
import GameRow from 'screens/Games/components/GameRow';
import isEmpty from 'lodash/isEmpty';

const MyGames = () => {
  const { data, isLoading } = useGetMyGamesQuery();


  if (isLoading) return <Skeleton active/>;
  if (!data || isEmpty(data)) return <Card>Mänge ei leitud</Card>;

  return <>
    {data.map((game:any) => <GameRow key={game.id} game={game}/>)}
  </>;


};

export default MyGames;