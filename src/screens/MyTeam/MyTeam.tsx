import { Card, Col, Descriptions, Row, Skeleton, Space, Image, MenuProps, Button, Dropdown } from 'antd';
import { useGetMyTeamQuery } from 'app/services/team';
import TeamForm from './components/TeamForm';
import PlayerTable from './components/PlayerTable';
import PlayerForm from './components/PlayerForm';
import UploadTeamLogo from './components/Actions/UploadTeamLogo';
import { useNavigate } from 'react-router-dom';
import AddGame from 'screens/Games/AddGame';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { DownOutlined } from '@ant-design/icons';

const MyTeam = () => {
  const { data, isFetching } = useGetMyTeamQuery();
  const navigate = useNavigate();
  const { isLarge } = useScreenBreakpoint();

  if (isFetching) return <Skeleton active />;

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
          <Image
            width={200}
            src={data.teamLogoUri ? data.teamLogoUri : ''}
            placeholder={'teslk'}
            preview={false}
          />
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
      { label:<AddGame />, key: '4' } ];

    return (isLarge ?
      <Space wrap>
        {renderActions()}
        {data && <UploadTeamLogo id={data.id}/>}
        {data && <PlayerForm/>}
        { <AddGame />}
      </Space>:
      <Dropdown menu={{ items }} trigger={[ 'click' ]}>
        <Button icon={<DownOutlined />} type="primary">
              Tegevused
        </Button>
      </Dropdown>
    );
  };

  return <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Row gutter={[ 12, 12 ]}>
      <Col span={24}>
        <Card
          title="Info"
          extra={renderExtra()}
        >
          {renderContent()}
        </Card>
      </Col>
    </Row>
    <Space/>
    <Row gutter={[ 12, 12 ]}>
      <PlayerTable/>
    </Row>
  </Space>;
};

export default MyTeam;