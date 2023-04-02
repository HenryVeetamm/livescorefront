import { Card, Col, Descriptions, Row, Space, Image, Avatar, Spin } from 'antd';
import { useGetTeamByIdQuery } from 'app/services/team';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import PlayerTable from './components/Players';
import { TeamsIcon, VolleyballIcon } from 'icons';

const Team = () => {
  const params = useParams();

  const { data, isFetching } = useGetTeamByIdQuery(params.id ?? skipToken);

  if (!params.id) return <></>;

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


  return <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Row gutter={[ 12, 12 ]}>
      <Col span={24}>
        <Spin spinning={isFetching} indicator={<VolleyballIcon spin/>}>
          <Card
            title="Info"
          >
            {renderContent()}
          </Card>
        </Spin>
      </Col>
    </Row>
    <Space/>
    <Row gutter={[ 12, 12 ]}>
      <PlayerTable teamId={params.id}/>
    </Row>
  </Space>;
};

export default Team;