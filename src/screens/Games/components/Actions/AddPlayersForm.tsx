import { Button, Col, Divider, Modal, Row, Skeleton, Space, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAddPlayerToGameMutation } from 'app/services/game';
import { playerApi, tags, useGetForAddingToGameQuery } from 'app/services/player';
import { useDispatch } from 'react-redux';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import isEmpty from 'lodash/isEmpty';


const AddPlayerForm = ({ gameId } : { gameId: string }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { data, isFetching } = useGetForAddingToGameQuery({ gameId });
  const [ addPlayer, meta ] = useAddPlayerToGameMutation();
  const { isMedium } = useScreenBreakpoint();
  const dispatch = useDispatch();

  const onToggleChange = async (checked: boolean, playerId: string) => {
    await addPlayer({ playerId, gameId, active: checked });
    dispatch(playerApi.util.invalidateTags([ tags.GAME_PLAYERS ]));
  };

  if (!data || isFetching) return <Skeleton active/>;

  return <>
    <Button

      icon={<PlusOutlined/>}
      onClick={() => setIsOpen(true)}
      type={'primary'}
      style={!isMedium ? { width: '100%' } : undefined}
    >Lisa mängijad</Button>
    <Modal
      title={'Mängijad'}
      open={isOpen}
      cancelText='Loobu'
      onCancel={() => setIsOpen(false)}
      onOk={undefined}
      footer={null}
    >
      <Divider/>
      {!isEmpty(data) ? <Space direction='vertical' style={{ width: '100%' }}>{data.map(data =>
        <>
          <Row key={data.id}><Col span={19}>#{data.shirtNumber} {data.firstName} {data.lastName}</Col>
            <Col><Switch defaultChecked={data.alreadyAdded} disabled={meta.isLoading} onChange={(checked) => onToggleChange(checked, data.id)}/></Col>
          </Row>
        </>
      )}</Space>: 'Mängijaid ei leitud'}

    </Modal>
  </>;
};

export default AddPlayerForm;