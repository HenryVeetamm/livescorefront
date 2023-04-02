import { Modal, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import { showSuccess } from 'utils/messages';
import { useUpdatePasswordMutation } from 'app/services/admin';
import { RetweetOutlined } from '@ant-design/icons';


const UpdatePassword = () => {
  const navigate = useNavigate();

  const [ isOpen, setIsOpen ] = useState(false);
  const [ updatePassword, meta ] = useUpdatePasswordMutation();
  const [ form ] = Form.useForm();

  const onSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        await updatePassword(values).unwrap();
        form.resetFields();
        setIsOpen(false);
        navigate(Paths.MY_TEAM);
      }).then(() => {
        showSuccess('Salvestatud');
      })
      .catch();
  };

  return(
    <>
      <Button
        type={'link'}
        icon={<RetweetOutlined />}
        onClick={() => setIsOpen(true)}
      >Muuda parooli</Button>
      <Modal
        open={isOpen}
        okText='Salvesta'
        cancelText='Loobu'
        onCancel={() => setIsOpen(false)}
        onOk={onSubmit}
        confirmLoading={meta.isLoading}
        cancelButtonProps={{ disabled: meta.isLoading }}
      >
        <Form
          layout='vertical'
          form={form}
        >
          <Form.Item
            label="Uus parool"

            name="password"
            rules={[ { required: true, message: 'Palun sisesta e-mail' } ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>


  );
};

export default UpdatePassword;