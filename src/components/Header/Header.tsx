import { Header } from 'antd/es/layout/layout';
import Login from 'components/Login/Login';
import './styles.less';
import Menu from 'components/Menu/Menu';

const LayoutHeader = () => {

  return <Header className="layout-header " style={{ backgroundColor: '#ffffff' }}>
    <Menu/>
    <Login/>
  </Header>;
};

export default LayoutHeader;