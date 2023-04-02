import { Modal, Divider, Input, Form, Select, DatePicker, Button } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { gameType, gameTypeSelectList } from 'constants/gameTypes';
import { useAddGameMutation } from 'app/services/game';
import { useGetTeamsQuery, useGetUserTeamIdQuery } from 'app/services/team';
import { formats } from 'utils/date';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import { showSuccess } from 'utils/messages';
import MobileDatePicker from 'components/Mobile/MobileDatePicker';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';


const AddGame = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ currentGameType, setCurrentGameType ] = useState<number>(gameType.NOT_REGISTERED_TEAM);
  const { data, isLoading } = useGetTeamsQuery();
  const [ addGame, meta ] = useAddGameMutation();
  const [ form ] = Form.useForm();
  const { data : teamId } = useGetUserTeamIdQuery();
  const navigate = useNavigate();
  const { isMobile } = useScreenBreakpoint();

  if (!teamId) return null;

  const onSubmit = () => {

    form.validateFields()
      .then(async values => {
        const res = await addGame(values).unwrap();
        setIsOpen(false);
        form.resetFields();
        navigate(Paths.GAME.replace(':id', res.id));
      }).then(() => {
        showSuccess('Mäng lisatud');
      }).catch();
  };

  const handleTypeChange = (value : any) => {
    setCurrentGameType(value);
  };

  const getRequiredTeamField = () => {
    if (currentGameType === gameType.NOT_REGISTERED_TEAM) {
      return <Form.Item
        label="Sisesta võistkonna nimi"
        name="AwayTeamName"
        rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
      >
        <Input />
      </Form.Item>;
    }
    return <Form.Item
      label="Vali võistkond"
      name="AwayTeamId"
      rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
    >
      <Select options={data} loading={isLoading} notFoundContent={'Võistkondi ei leitud'}/>
    </Form.Item>;
  };



  return <>
    <Button
      icon={<PlusOutlined />}
      onClick={ () => setIsOpen(true)}
      type= 'link'
    >
    Loo mäng
    </Button>
    <Modal
      title={'Loo mäng'}
      open={isOpen}
      okText='Loo'
      cancelText='Katkesta'
      onCancel={() => setIsOpen(false)}
      onOk={onSubmit}
      confirmLoading={meta.isLoading}
      cancelButtonProps={{ disabled: meta.isLoading }}
    >
      <Divider/>
      <Form
        layout='vertical'
        form={form}
      >
        <Form.Item
          label="Mängu tüüp"
          name="gameType"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
          initialValue={currentGameType}
        >
          <Select options={gameTypeSelectList} onChange={handleTypeChange}/>
        </Form.Item>

        {getRequiredTeamField()}

        <Form.Item
          label="Mängu toimumiskoht"
          name="location"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mängu toimumisaeg"
          name="scheduledTime"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          {
            isMobile? <MobileDatePicker precision='minute' format={formats.DD_MM_YYYY_HH_MM} showFuture/> :
              <DatePicker showTime style={{ width: '100%' }} showSecond={false} showNow={false} format={formats.DD_MM_YYYY_HH_MM}/>
          }
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

export default AddGame;