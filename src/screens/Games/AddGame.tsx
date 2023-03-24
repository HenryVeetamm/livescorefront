import { Modal, Divider, Input, Form, Select, DatePicker } from 'antd';
import CustomButton from 'components/Button/CustomButton';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { gameType, gameTypeSelectList } from 'constants/gameTypes';
import { useAddGameMutation } from 'app/services/game';
import { useGetTeamsQuery, useGetUserTeamIdQuery } from 'app/services/team';
import { formats } from 'utils/date';


const AddGame = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ currentGameType, setCurrentGameType ] = useState<number>(gameType.NOT_REGISTERED_TEAM);
  const { data, isLoading } = useGetTeamsQuery();
  const [ addGame ] = useAddGameMutation();
  const [ form ] = Form.useForm();
  const { data : teamId } = useGetUserTeamIdQuery();

  if (!teamId) return null;

  const onSubmit = () => {

    form.validateFields()
      .then(async values => {
        await addGame(values);
        setIsOpen(false);
        form.resetFields();
      });
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
    <CustomButton title={'Loo mäng'}
      buttonProps={{
        icon: <PlusOutlined />,
        onClick: () => setIsOpen(true),
        type: 'link'
      }}
    />
    <Modal
      title={'Loo mäng'}
      open={isOpen}
      okText='Loo'
      cancelText='Katkesta'
      onCancel={() => setIsOpen(false)}
      onOk={onSubmit}
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
          <DatePicker showTime style={{ width: '100%' }} showSecond={false} showNow={false} format={formats.DD_MM_YYYY_HH_MM}/>
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

export default AddGame;