import { Card, List, Skeleton } from 'antd';
import { useGetAllTeamsQuery } from 'app/services/team';
import TeamRow from './TeamRow';

const Teams = () => {

  const { data, isFetching } = useGetAllTeamsQuery();
  if (isFetching) return <Skeleton active/>;
  if (!data) return <Card> Võistkondi ei leitud</Card>;

  return <>

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
      renderItem={(team) => (
        <List.Item>
          <TeamRow team={team}/>
        </List.Item>
      )}
    />
  </>;
};

export default Teams;