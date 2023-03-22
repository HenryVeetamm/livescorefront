import { Card, Divider, List, Row, Skeleton } from 'antd';
import { useGetMyGamesQuery } from 'app/services/game';
import AddGame from 'screens/Games/AddGame';
import GameRow from 'screens/Games/components/GameRow';

const MyGames = () => {
  const { data, isLoading } = useGetMyGamesQuery();

  if (isLoading) return <Skeleton active/>;

  return <>
    <Row>
      <Card>
        Mängu loomine
        <AddGame />
      </Card>
    </Row>

    <Divider />
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={data}
      renderItem={(game) => (
        <List.Item>
          <GameRow game={game}/>
        </List.Item>
      )}
    />
  </>;


};

export default MyGames;