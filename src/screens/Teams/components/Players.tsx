import { Card, Col, Skeleton } from 'antd';
import { useGetTeamPlayersQuery } from 'app/services/player';
import isEmpty from 'lodash/isEmpty';
import PlayerCard from 'screens/MyTeam/components/PlayerCard';


const PlayerTable = ({ teamId } : { teamId: string }) => {
  const { data, isFetching } = useGetTeamPlayersQuery(teamId);

  if (isFetching) return <Skeleton active/>;
  if (!data || data && isEmpty(data)) return <Col span={24}><Card>Mängijaid ei leitud</Card></Col>;

  return <>{data.map((player) =><Col xs={24} md={12} xl={8} key={player.id}>
    <PlayerCard
      player={{
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        shirtNumber: player.shirtNumber,
        dateOfBirth: player.dateOfBirth,
        profileAbsoulteUri: player.profileAbsoulteUri,
      }}
      hideActions
    />
  </Col>)}</>;

//
};

export default PlayerTable;