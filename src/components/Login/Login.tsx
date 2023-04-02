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
import { tags as teamTags, teamApi } from 'app/services/team';
import { playerApi, tags } from 'app/services/player';
import { showSuccess } from 'utils/messages';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMedium } = useScreenBreakpoint();
  const isAuthenticated = useSelector(selectors.isAuthenticated);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ login, meta ] = useLoginMutation();
  const [ form ] = Form.useForm();

  const logOut = () => {
    dispatch(teamApi.util.invalidateTags([ teamTags.MY_TEAM ]));
    dispatch(playerApi.util.invalidateTags([ tags.MY_PLAYERS ]));

    removeSessionKey();
    dispatch(sessionActions.logOut());
    navigate(Paths.HOME);
  };

  const onSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        await login(values).unwrap();
        form.resetFields();
        setIsOpen(false);
        navigate(Paths.MY_TEAM);
      }).then(() => {
        showSuccess('Tere tulemast!');
      })
      .catch();
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
              onClick: logOut
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
            confirmLoading={meta.isLoading}
            cancelButtonProps={{ disabled: meta.isLoading }}
          >
            <LoginForm form={form}/>
          </Modal>
        </>
      }
    </div>
  );
};

export default Login;