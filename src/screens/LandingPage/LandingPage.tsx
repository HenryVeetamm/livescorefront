import { selectors } from 'app/services/session/slice';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const auth = useSelector(selectors.getAuthData);
  const getContent = () => {
    return auth.firstName ? <h1 style={{ textAlign: 'center', color: 'white' }}>Tere tulemast, {auth.firstName}! </h1> : <>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Tere tulemast </h1>
      <h2 style={{ textAlign: 'center', color: 'white' }}>võrkpalli punktiseisu ja statistika veebirakendusse!</h2>
    </>;
  };

  return getContent();
};

export default LandingPage;