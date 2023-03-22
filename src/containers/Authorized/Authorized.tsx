import { actions } from 'app/services/session/slice';
import { getDecodedSessionData } from 'app/utils/session';
import { Paths } from 'constants/paths';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type AuthorizedProps = {
  children: ReactNode
}

const Authorized = ({ children } : AuthorizedProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = getDecodedSessionData();

  useEffect(() => {
    if (data.isValid && data.tokenData) dispatch(actions.setAuthData(data.tokenData));
    else navigate(Paths.HOME);
  }, []);

  return <>{children}</>;
};

export default Authorized;