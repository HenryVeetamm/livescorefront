import { Avatar, Card, Skeleton, Table } from 'antd';
import { useGetAllTeamsQuery } from 'app/services/team';
import { Paths } from 'constants/paths';
import { TeamsIcon, VolleyballIcon } from 'icons';
import { NavLink, useNavigate } from 'react-router-dom';

const Teams = () => {
  const { data, isFetching } = useGetAllTeamsQuery();
  const navigate = useNavigate();
  if (isFetching) return <Skeleton active/>;
  if (!data) return <Card> Võistkondi ei leitud</Card>;

  const columns = [
    {
      title: <VolleyballIcon/>,
      dataIndex: 'teamLogoUri',
      key: 'teamLogoUri',
      render: (data : any,) => { return <Avatar
        src={data}
        size={'large'}
        icon={<TeamsIcon/>}
      />;}
    },
    {
      title: 'Nimi',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, data: any) => {return <NavLink to={Paths.TEAM.replace(':id', data.id)}>{text}</NavLink>;}
    },
    {
      title: 'Kodusaal',
      dataIndex: 'homeStadium',
      key: 'homeStadium',
    },

  ];

  return <>
    <Table
      columns={columns}
      dataSource={data}
      onRow={(data: any) => {return { onClick: () => navigate(Paths.TEAM.replace(':id', data.id)) };}}
      pagination={false}
      locale={{ emptyText: <><VolleyballIcon/> Võistkonnad puuduvad</> }}
      rowKey="id"
    />
  </>;
};

export default Teams;