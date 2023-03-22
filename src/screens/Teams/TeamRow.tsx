import { TeamDto } from 'app/services/team/types';
import { CarOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';

const TeamRow = ({ team } : { team: TeamDto }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(Paths.TEAM.replace(':id', team.id));

  return <Card onClick={onClick}>
    <Row >
      <Col>
        <Avatar
          src={team.teamLogoUri}
          size={'large'}
          icon={<CarOutlined/>}/>

      </Col>
      <Col>
        {team.name}
      </Col>
    </Row>
  </Card>;
};

export default TeamRow;