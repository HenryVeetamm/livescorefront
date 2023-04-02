import GameRow from './components/GameRow';
import { Card, Skeleton } from 'antd';
import { useGetGamesQuery } from 'app/services/game';
import isEmpty from 'lodash/isEmpty';

const Games = () => {
  const { data, isFetching } = useGetGamesQuery({ page: '1', pageSize: '1' }, { refetchOnMountOrArgChange: true });

  if (isFetching) return <Skeleton active/>;
  if (!data || isEmpty(data)) return <Card>Mänge ei leitud</Card>;

  return <>
    {data.map((game:any) => <GameRow key={game.id} game={game}/>)}
  </>;
};

export default Games;