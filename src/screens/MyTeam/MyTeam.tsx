import { Card, Col, Descriptions, Row, Skeleton, Space, Image } from 'antd';
import { useGetMyTeamQuery } from 'app/services/team';
import TeamForm from './components/TeamForm';
import PlayerTable from './components/PlayerTable';
import PlayerForm from './components/PlayerForm';
import UploadTeamLogo from './components/Actions/UploadTeamLogo';
import { useNavigate } from 'react-router-dom';

const MyTeam = () => {
  const { data, isFetching } = useGetMyTeamQuery();
  const navigate = useNavigate();

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
            src={data.teamLogoUri ? data.teamLogoUri : 'https://joesch.moe/api/v1/random'}
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
    return (
      <Space wrap>
        {renderActions()}
        {data && <UploadTeamLogo id={data.id}/>}
        {data && <PlayerForm/>}
      </Space>
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