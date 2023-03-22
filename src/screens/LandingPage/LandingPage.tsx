import { Card } from 'antd';
import { selectors } from 'app/services/session/slice';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const auht = useSelector(selectors.getAuthData);

  return <Card>Landing page, {auht.firstName ? auht.firstName : 'noName'}</Card>;
};

export default LandingPage;