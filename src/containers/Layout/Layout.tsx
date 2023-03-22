import { Col, Row, Space } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
import Authorized from 'containers/Authorized/Authorized';
import Header from 'containers/Header/Header';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { Outlet } from 'react-router-dom';
import './styles.less';

const BaseLayout = () => {
  //Kui on sisse loginud siis suunata kohe dashboardile
  //Anon kasutaja jääb landing pagel'e
  const { isBig } = useScreenBreakpoint();

  return (
    <Layout className={'layout'} style={{ padding: '0' }}>
      <Authorized>
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
      </Authorized>
    </Layout>
  );
};

export default BaseLayout;