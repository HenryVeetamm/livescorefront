import { Button, Form, Input, Modal } from 'antd';
import { PlayerFormType } from 'app/services/player/types';
import React, { ReactElement, useEffect, useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { showSuccess } from 'utils/messages';
import { useAddUserMutation } from 'app/services/admin';

type PlayerFormProps = {
  button? : ReactElement | undefined
  initialValues? : PlayerFormType
}

const UserForm = ({ button, initialValues } : PlayerFormProps) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ form ] = Form.useForm();

  const [ addUser, addMeta ] = useAddUserMutation();

  useEffect(() => {
    if(addMeta.isSuccess) setIsOpen(false);
  }, [ addMeta.isSuccess ]);

  const onSubmit = () => {
    form.validateFields().then(async values => {
      addUser({ ...values });
      form.resetFields();
    }).then(() => {
      showSuccess('Lisatud!');
    }).catch();
  };

  const getButton = () => {
    if (button) return React.cloneElement(button, { onClick: () => setIsOpen(true) });

    return <Button
      title='Lisa kasutaja'

      icon={<UserAddOutlined />}
      onClick={() => setIsOpen(true)}
      type={'link'}

    >Lisa kasutaja</Button>
    ;
  };

  return <>
    {getButton()}
    <Modal
      open={isOpen}
      okText='Salvesta'
      cancelText='Loobu'
      onCancel={() => {
        form.resetFields();
        setIsOpen(false);
      }}
      onOk={onSubmit}
      confirmLoading={addMeta.isLoading}
      cancelButtonProps={{ disabled: addMeta.isLoading }}
    >
      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          label="Eesnimi"
          name="firstName"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Perekonnanimi"
          name="lastName"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[ { required: true, message: 'Väli on kohustuslik' } ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Parool"
          name="password"
          rules={[ { required: true, message: 'Palun sisesta parool' } ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  </>;
};

export default UserForm;