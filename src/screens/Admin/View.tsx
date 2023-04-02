import { Card, Skeleton, Table } from 'antd';
import { useGetUsersQuery } from 'app/services/admin';
import UserForm from './UserForm';

const AdminView = () => {
  const { data, isFetching } = useGetUsersQuery();

  if (isFetching) return <Skeleton active/>;
  // if (!data) return <Card> Kasutajaid ei leitud</Card>;

  const columns = [
    {
      title: 'Nimi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return <Card title='Kasutajad' extra={<UserForm/>}>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      locale={{ emptyText: <>Kasutajaid ei leitud</> }}
      rowKey="id"
    />
  </Card>;
};

export default AdminView;