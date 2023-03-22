import { Card, Col, Descriptions, Row, Space, Image } from 'antd';
import { useGetTeamByIdQuery } from 'app/services/team';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import PlayerTable from './components/Players';

const Team = () => {
  const params = useParams();

  const { data, isFetching } = useGetTeamByIdQuery(params.id ?? skipToken);

  if (!params.id) return <Card>NOT FOUND</Card>;

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


  return <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Row gutter={[ 12, 12 ]}>
      <Col span={24}>
        <Card
          title="Info"
        >
          {renderContent()}
        </Card>
      </Col>
    </Row>
    <Space/>
    <Row gutter={[ 12, 12 ]}>
      <PlayerTable teamId={params.id}/>
    </Row>
  </Space>;
};

export default Team;