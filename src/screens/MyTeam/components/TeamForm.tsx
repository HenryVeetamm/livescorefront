import { Button, Divider, Form, Input, Modal } from 'antd';
import { useCreateMyTeamMutation, useUpdateMyTeamMutation } from 'app/services/team';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { showSuccess } from 'utils/messages';


const TeamForm = ({ initialValues, onClose, forceOpen } : { initialValues?: any, onClose?: () => void, forceOpen?: boolean }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ form ] = Form.useForm();
  const [ createTeam, createMeta ] = useCreateMyTeamMutation();
  const [ updateTeam, updateMeta ] = useUpdateMyTeamMutation();

  useEffect(() => {
    if (createMeta.isSuccess || updateMeta.isSuccess) setIsOpen(false);
  }
  , [ createMeta.isSuccess, createMeta.isSuccess ]);

  const onSubmit = () => {
    form.validateFields().then(async values => {
      if (initialValues) await updateTeam({ id: initialValues.id,...values });
      else await createTeam(values).unwrap();
      form.resetFields();
    }).then(() => {
      showSuccess('Salvestatud');
    }).catch();
  };

  const getTitle = () => {
    return initialValues ? 'Muuda võistkonda' : 'Loo võistkond';
  };

  const getButtonIcon = () => {
    return initialValues? <EditOutlined/> : <PlusOutlined/>;
  };

  const getOpenButton = () => {
    if (!forceOpen) return <Button

      icon={getButtonIcon()}
      onClick={() => setIsOpen(true)}
      type={'link'}

    >{getTitle()}</Button>;
  };



  return <>
    {getOpenButton()}
    <Modal
      title={getTitle()}
      open={forceOpen ? forceOpen : isOpen}
      okText='Salvesta'
      cancelText='Loobu'
      onCancel={() => forceOpen && onClose ? onClose() : setIsOpen(false)}
      onOk={onSubmit}
      confirmLoading={updateMeta.isLoading || createMeta.isLoading}
      cancelButtonProps={{ disabled: updateMeta.isLoading || createMeta.isLoading }}
    >
      <Divider/>
      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          label="Võistkonna nimi"
          name="name"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Võistkonna kodusaal"
          name="homeStadium"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

export default TeamForm;