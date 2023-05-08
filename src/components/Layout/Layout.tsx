import { Col, Row, Space } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Header from 'components/Header/Header';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { Outlet } from 'react-router-dom';
import './styles.less';

const BaseLayout = () => {

  const { isBig } = useScreenBreakpoint();

  return (
    <Layout className={'layout'} style={{ padding: '0' }}>
      <Header/>
      <Content className={`layout-content${!isBig ? '-small' : ''}`}>
        <Space direction='vertical' size='middle' style={{ display : 'flex' }}>
          <Row>
            <Col span={20} offset={2}>
              <Outlet/>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
};

export default BaseLayout;