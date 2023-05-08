import { Button, Result } from 'antd';
import { Paths } from 'constants/paths';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return <Result
    status="404"
    title="404"
    subTitle="Lehte ei leitud"
    extra={<Button onClick = {() => navigate(Paths.HOME)}type="primary">Tagasi koju</Button>}
  />;
};

export default NotFound;