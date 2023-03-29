import { Form, Input } from 'antd';

const LoginForm = ({ form } : any) => {

  return(
    <Form
      layout='vertical'
      form={form}
    >
      <Form.Item
        label="Email"
        name="Email"
        rules={[ { required: true, message: 'Palun sisesta e-mail' } ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Parool"
        name="password"
        rules={[ { required: true, message: 'Palun sisesta parool' } ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;