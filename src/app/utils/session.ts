import { DecodedData } from 'app/types/DecodedToken';
import jwtDecode from 'jwt-decode';
import { Global } from '../../constants/global';

const getSession = () => {
  const data = localStorage.getItem(Global.AUTH_KEY);
  if (data) return data;

  return null;
};

const getDecodedSessionData = () => {
  const data = getSession();
  if (data) {
    const decoded : any = jwtDecode(data);

    const tokenData : DecodedData = {
      firstName : decoded['given_name'],
      lastName : decoded['family_name'],
      role : decoded['role'],
      teamId: decoded['team_id'],
    };
    const date = new Date(decoded['exp'] * 1000);
    if (date < new Date()) {
      // alert('SESSION ON AEGUNUD');
      return { tokenData, isValid : false };
    }
    return { tokenData, isValid : true };

  }
  return { isValid : false };
};

const removeSessionKey = () => localStorage.removeItem(Global.AUTH_KEY);

export { getSession, getDecodedSessionData, removeSessionKey };