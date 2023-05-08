import { actions } from 'app/services/session/slice';
import { useLazyGetUserTeamIdQuery } from 'app/services/team';
import { getDecodedSessionData } from 'app/utils/session';
import { Paths } from 'constants/paths';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type AuthorizedProps = {
  children: ReactNode
}

const AuthorizedStrict = ({ children } : AuthorizedProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = getDecodedSessionData();
  const [ loadData ] = useLazyGetUserTeamIdQuery();

  useEffect(() => {
    if (data.isValid && data.tokenData) {
      loadData();
      dispatch(actions.setAuthData(data.tokenData));
    }
    else navigate(Paths.HOME);
  }, []);

  return <>{children}</>;
};

export default AuthorizedStrict;