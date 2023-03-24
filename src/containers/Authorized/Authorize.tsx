import { actions } from 'app/services/session/slice';
import { getDecodedSessionData } from 'app/utils/session';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

type AuthorizedProps = {
  children: ReactNode
}

const Authorize = ({ children } : AuthorizedProps) => {
  const dispatch = useDispatch();
  const data = getDecodedSessionData();

  useEffect(() => {
    if (data.isValid && data.tokenData) dispatch(actions.setAuthData(data.tokenData));

  }, []);

  return <>{children}</>;
};

export default Authorize;