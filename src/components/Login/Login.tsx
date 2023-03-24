import { Modal, Form } from 'antd';
import { actions as sessionActions, selectors, useLoginMutation } from 'app/services/session';
import { removeSessionKey } from 'app/utils/session';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'constants/paths';
import './styles.less';
import CustomButton from 'components/Button/CustomButton';
import useScreenBreakpoint from 'hooks/useScreenBreakpoint';
import { LoginIcon, LogOutIcon } from 'icons';
import { actions as teamActions } from 'app/services/team';

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
    dispatch(sessionActions.logOut());
    dispatch(teamActions.clearTeam());
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
              type: 'link',
              icon:<LogOutIcon/>,
              onClick: () => logOut()
            }}
        /> :
        <>
          <CustomButton
            title='Logi sisse'
            buttonProps={
              {
                type: 'link',
                icon:<LoginIcon/>,
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