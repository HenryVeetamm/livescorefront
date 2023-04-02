import { Card, Col, Descriptions, Row, Skeleton, Space, Image, MenuProps, Button, Dropdown, Spin, Avatar } from 'antd';
import { useGetMyTeamQuery } from 'app/services/team';
import TeamForm from './components/TeamForm';
import PlayerTable from './components/PlayerTable';
import PlayerForm from './components/PlayerForm';
import UploadTeamLogo from './components/Actions/UploadTeamLogo';
import { useNavigate } from 'react-router-dom';
import AddGame from 'screens/Games/AddGame';
import { DownOutlined } from '@ant-design/icons';
import { TeamsIcon, VolleyballIcon } from 'icons';
import UpdatePassword from './components/Actions/UpdatePassword';
import { useSelector } from 'react-redux';
import { selectors } from 'app/services/session';
import { Paths } from 'constants/paths';
import { useEffect } from 'react';

const MyTeam = () => {
  const { data, isFetching, isLoading } = useGetMyTeamQuery();
  const isAdmin = useSelector(selectors.isUserAdmin);
  const navigate = useNavigate();
  console.log(isAdmin);

  useEffect(() => {
    if (isAdmin) navigate(Paths.HOME);
  }, []);


  if (!isFetching && !data) return <TeamForm onClose={() => navigate(-1)} forceOpen/>;

  const renderActions = () => {
    if (isFetching) return <Skeleton active />;
    if (!isFetching && data) return <TeamForm initialValues={data}/>;
    return <TeamForm/>;
  };

  const renderContent = () => {
    if (!isFetching && data) return <Space direction='vertical' size='middle' style={{ display : 'flex' }}>
      <Descriptions size={'small'}>
        <Descriptions.Item>
          {data.teamLogoUri ?
            <Image
              width={200}
              src={ data.teamLogoUri}
              preview={false}
            /> : <Avatar icon={<TeamsIcon/>} size={'large'}/>}
        </Descriptions.Item>
        <Descriptions.Item label='Nimi'>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label='Kodusaal'>
          {data.homeStadium}
        </Descriptions.Item>
      </Descriptions>
    </Space>;
  };


  const renderExtra = () => {
    const items: MenuProps['items'] = [
      { label: renderActions(), key: '1' },
      { label: data && <UploadTeamLogo id={data.id}/>, key: '2' },
      { label: data && <PlayerForm/>, key: '3' },
      { label:<AddGame />, key: '4' },
      { label: <UpdatePassword/>, key: '5' } ];

    return <Dropdown menu={{ items }} trigger={[ 'click' ]}>
      <Button icon={<DownOutlined />} type="primary">
              Tegevused
      </Button>
    </Dropdown>;
  };

  return <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Row gutter={[ 12, 12 ]}>
      <Col span={24}>
        <Spin spinning={isFetching || isLoading} indicator={<VolleyballIcon spin/>}>
          <Card
            title={'Info'}
            extra={!(isFetching || isLoading) && renderExtra()}
          >
            {renderContent()}
          </Card>
        </Spin>
      </Col>
    </Row>
    <Space/>
    <Row gutter={[ 12, 12 ]}>
      <PlayerTable/>
    </Row>
  </Space>;
};

export default MyTeam;