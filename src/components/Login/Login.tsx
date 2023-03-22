import { Modal, Form } from 'antd';
import { actions, selectors, useLoginMutation } from 'app/services/session';
import { removeSessionKey } from 'app/utils/session';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import './styles.less';
import CustomButton from 'components/Button/CustomButton';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';

const Login = () => {
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  const { isMedium } = useScreenBreakpoint();
  const dispatch = useDispatch();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ login, meta ] = useLoginMutation();
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  const logOut = () => {
    removeSessionKey();
    dispatch(actions.logOut());
    navigate(Paths.HOME);
  };

  const onSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        await login(values);
        if (meta.isSuccess) {
          form.resetFields();
          setIsOpen(false);
          navigate(Paths.HOME);
        }
      })
      .catch((e: any) => {
        console.warn('failed', e);
      });


  };

  return(
    <div className='loginButton'>
      {isAuthenticated ?
        <CustomButton
          title='Logi välja'
          breakPoint={!isMedium}
          buttonProps={
            {
              icon:<LogoutOutlined/>,
              onClick: () => logOut()
            }}
        /> :
        <>
          <CustomButton
            title='Logi sisse'
            buttonProps={
              {
                icon:<LoginOutlined/>,
                onClick: () => setIsOpen(true)
              }}
          />
          <Modal
            open={isOpen}
            okText='Sisene'
            cancelText='Loobu'
            onCancel={() => setIsOpen(false)}
            onOk={onSubmit}
          >
            <LoginForm form={form}/>
          </Modal>
        </>
      }
    </div>
  );
};

export default Login;