import { PlayerDto, PlayerStatistics } from 'app/services/player/types';
import { TooltipButton } from 'components/TooltipButton/TooltipButton';
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Image, Col, Divider, Modal, Row, Typography, Avatar, Skeleton } from 'antd';
import { calculateAge } from 'utils/date';
import { positionValues } from 'constants/playerPosition';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;
import './styles.less';
import { useLazyGetPlayerStatisticsQuery } from 'app/services/player';

const PlayerDetails = ({ player } : { player: PlayerDto }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ loadData, meta ] = useLazyGetPlayerStatisticsQuery();
  const [ data, setData ] = useState<PlayerStatistics | undefined>();


  useEffect(() => {
    if (isOpen) {
      const loadStats = async () => {
        const res = await loadData(player.id).unwrap();
        setData(res);
      };
      loadStats();
    }
  }, [ isOpen ]);

  const getAvatar = () => {
    if (player.profileAbsoulteUri) {
      return <div className="avatar-custom">
        <Image
          className="image-radius"
          src={player.profileAbsoulteUri}
          preview={false}/>
      </div>;
    }
    return <Avatar icon={<UserOutlined/>} size="large" />;
  };
  return <>
    <TooltipButton
      title={'Vaata'}
      buttonProps={{
        icon: <EyeOutlined />,
        onClick: () => { setIsOpen(true);},
        type: 'link'
      }}
    />
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      style={{ top: 10 }}
    >
      {!data || meta.isLoading ? <Skeleton active/> :
        <>
          <Divider>
            {getAvatar()}
          </Divider>
          <Row>
            <Col span={12}>
              <Text>Nimi</Text>
            </Col>
            <Col span={12}>
              <Text strong>{player.firstName} {player.lastName}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>Positsioon</Col>
            <Col span={12}>
              <Text strong>#{player.shirtNumber} {positionValues[player.position]}
              </Text></Col>
          </Row>
          <Row>
            <Col span={12}>Vanus</Col>
            <Col span={12}>
              <Text strong>{calculateAge(player.dateOfBirth)}</Text></Col>
          </Row>
          <div className='container'>
            <Divider >Rünnakud</Divider>
            <Row>
              <Col span={12}>Kõik rünnakud</Col>
              <Col span={12}><Text strong>{data.totalAttacks}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Rünnakud punktiks</Col>
              <Col span={12}><Text strong>{data.attackPoints}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Rünnnakuvead</Col>
              <Col span={12}><Text strong>{data.attackFaults}</Text></Col>
            </Row>

            <Divider>Servid</Divider>
            <Row>
              <Col span={12}>Servipunktid</Col>
              <Col span={12}><Text strong>{data.aces}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Servivead </Col>
              <Col span={12}><Text strong>{data.serveFaults}</Text></Col>
            </Row>

            <Divider>Blokid</Divider>
            <Row>
              <Col span={12}>Blokipunktid</Col>
              <Col span={12}><Text strong>{data.blockPoints}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Blokivead </Col>
              <Col span={12}><Text strong>{data.blockFaults}</Text></Col>
            </Row>

            <Divider>Vastuvõtt</Divider>
            <Row>
              <Col span={12}>Kõik vastuvõtud</Col>
              <Col span={12}><Text strong>{data.totalReception}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Suurepärased vastuvõtud </Col>
              <Col span={12}><Text strong>{data.perfectReception}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Head vastuvõtud </Col>
              <Col span={12}><Text strong>{data.goodReception}</Text></Col>
            </Row>
            <Row>
              <Col span={12}>Vastuvõtu vead</Col>
              <Col span={12}><Text strong>{data.receptionFaults}</Text></Col>
            </Row>
          </div>
        </>
      }
    </Modal>
  </>;
};

export default PlayerDetails;